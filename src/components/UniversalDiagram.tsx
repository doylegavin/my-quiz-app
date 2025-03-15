"use client";

import React, { useMemo } from 'react';

// Type definitions for diagram elements
export interface Point {
  id: string;
  x: number;
  y: number;
  label?: string;
  visible?: boolean;
  style?: ElementStyle;
}

export interface Line {
  id: string;
  type: 'line';
  point1Id: string;
  point2Id: string;
  label?: string;
  measurement?: string;
  visible?: boolean;
  style?: ElementStyle;
}

export interface Circle {
  id: string;
  type: 'circle';
  centerPointId: string;
  radius: number;
  label?: string;
  visible?: boolean;
  style?: ElementStyle;
}

export interface Text {
  id: string;
  type: 'text';
  x: number;
  y: number;
  content: string;
  visible?: boolean;
  style?: ElementStyle & {
    fontSize?: number;
    textAnchor?: 'start' | 'middle' | 'end';
  };
}

export interface Angle {
  id: string;
  type: 'angle';
  vertex: string; // Point ID for the vertex
  point1: string; // Point ID for first ray
  point2: string; // Point ID for second ray
  radius?: number; // Size of the angle arc
  label?: string;
  measurement?: string;
  visible?: boolean;
  style?: ElementStyle;
}

export interface Polygon {
  id: string;
  type: 'polygon';
  pointIds: string[]; // Ordered list of point IDs forming the polygon
  label?: string;
  visible?: boolean;
  style?: ElementStyle;
}

export type DiagramElement = Line | Circle | Text | Angle | Polygon;

export interface ElementStyle {
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  fillOpacity?: number;
  strokeDasharray?: string;
}

// Main props interface
export interface UniversalDiagramProps {
  // Canvas dimensions
  width?: number;
  height?: number;
  
  // Coordinate system
  showGrid?: boolean;
  showAxes?: boolean;
  xRange?: [number, number]; // [min, max]
  yRange?: [number, number]; // [min, max]
  gridStep?: number;
  padding?: number; // Percentage padding around elements
  
  // Elements to render
  points: Record<string, Point>;
  elements: DiagramElement[];
  
  // Display options
  showSolution?: boolean;
  showLabels?: boolean;
  showMeasurements?: boolean;
}

const defaultStyles = {
  grid: { stroke: '#ddd', strokeWidth: 1 },
  axes: { stroke: '#000', strokeWidth: 2 },
  point: { stroke: '#000', strokeWidth: 1, fill: '#000', fillOpacity: 1 },
  line: { stroke: '#000', strokeWidth: 1.5 },
  circle: { stroke: '#000', strokeWidth: 1.5, fill: 'none' },
  text: { stroke: 'none', fill: '#000' },
  angle: { stroke: '#000', strokeWidth: 1.5, fill: 'none' },
  polygon: { stroke: '#000', strokeWidth: 1.5, fill: 'none' },
  solution: { stroke: 'blue', strokeWidth: 2, fill: 'none' },
  hidden: { strokeOpacity: 0, fillOpacity: 0 }
};

const UniversalDiagram: React.FC<UniversalDiagramProps> = ({
  width = 600,
  height = 500,
  showGrid = true,
  showAxes = true,
  xRange,
  yRange,
  gridStep = 1,
  padding = 10, // 10% padding
  points = {},
  elements = [],
  showSolution = true,
  showLabels = true,
  showMeasurements = true,
}) => {
  // Calculate the viewport dimensions based on elements and points
  const viewportDimensions = useMemo(() => {
    // Start with provided ranges or default
    let minX = xRange ? xRange[0] : -10;
    let maxX = xRange ? xRange[1] : 10;
    let minY = yRange ? yRange[0] : -10;
    let maxY = yRange ? yRange[1] : 10;
    
    // If no ranges were provided, determine from elements
    if (!xRange || !yRange) {
      // Collect all x,y coordinates
      const coords: { x: number; y: number }[] = [];
      
      // Add all point coordinates
      Object.values(points).forEach(point => {
        coords.push({ x: point.x, y: point.y });
      });
      
      // Add circle bounds
      elements.forEach(element => {
        if (element.type === 'circle' && points[element.centerPointId]) {
          const center = points[element.centerPointId];
          const radius = element.radius;
          coords.push({ x: center.x - radius, y: center.y });
          coords.push({ x: center.x + radius, y: center.y });
          coords.push({ x: center.x, y: center.y - radius });
          coords.push({ x: center.x, y: center.y + radius });
        }
      });
      
      // Find min/max if we have coordinates
      if (coords.length > 0) {
        minX = Math.floor(Math.min(...coords.map(c => c.x)));
        maxX = Math.ceil(Math.max(...coords.map(c => c.x)));
        minY = Math.floor(Math.min(...coords.map(c => c.y)));
        maxY = Math.ceil(Math.max(...coords.map(c => c.y)));
        
        // Ensure we have some width/height
        if (minX === maxX) {
          minX -= 5;
          maxX += 5;
        }
        if (minY === maxY) {
          minY -= 5;
          maxY += 5;
        }
      }
    }
    
    // Add padding
    const xPadding = ((maxX - minX) * padding) / 100;
    const yPadding = ((maxY - minY) * padding) / 100;
    
    return {
      minX: minX - xPadding,
      maxX: maxX + xPadding,
      minY: minY - yPadding,
      maxY: maxY + yPadding,
    };
  }, [xRange, yRange, points, elements, padding]);
  
  const { minX, maxX, minY, maxY } = viewportDimensions;
  
  // Calculate scale factors
  const xRange_actual = maxX - minX;
  const yRange_actual = maxY - minY;
  const xScale = width / xRange_actual;
  const yScale = height / yRange_actual;
  
  // Transform functions to convert from math coordinates to SVG coordinates
  const transformX = (x: number) => (x - minX) * xScale;
  const transformY = (y: number) => height - (y - minY) * yScale; // Invert Y-axis
  
  // Generate grid lines
  const gridLines = useMemo(() => {
    if (!showGrid) return null;
    
    const xLines = [];
    const yLines = [];
    
    // X grid lines (vertical lines)
    for (let x = Math.ceil(minX / gridStep) * gridStep; x <= maxX; x += gridStep) {
      xLines.push(
        <line 
          key={`grid-x-${x}`}
          x1={transformX(x)} 
          y1={0} 
          x2={transformX(x)} 
          y2={height}
          stroke={defaultStyles.grid.stroke}
          strokeWidth={defaultStyles.grid.strokeWidth}
        />
      );
    }
    
    // Y grid lines (horizontal lines)
    for (let y = Math.ceil(minY / gridStep) * gridStep; y <= maxY; y += gridStep) {
      yLines.push(
        <line 
          key={`grid-y-${y}`}
          x1={0} 
          y1={transformY(y)} 
          x2={width} 
          y2={transformY(y)}
          stroke={defaultStyles.grid.stroke}
          strokeWidth={defaultStyles.grid.strokeWidth}
        />
      );
    }
    
    return [...xLines, ...yLines];
  }, [minX, maxX, minY, maxY, showGrid, gridStep, width, height]);
  
  // Generate axes
  const axes = useMemo(() => {
    if (!showAxes) return null;
    
    // Only show axes if they're within our viewport
    const showXAxis = minY <= 0 && maxY >= 0;
    const showYAxis = minX <= 0 && maxX >= 0;
    
    return (
      <>
        {showXAxis && (
          <line 
            x1={0} 
            y1={transformY(0)} 
            x2={width} 
            y2={transformY(0)}
            stroke={defaultStyles.axes.stroke}
            strokeWidth={defaultStyles.axes.strokeWidth}
          />
        )}
        {showYAxis && (
          <line 
            x1={transformX(0)} 
            y1={0} 
            x2={transformX(0)} 
            y2={height}
            stroke={defaultStyles.axes.stroke}
            strokeWidth={defaultStyles.axes.strokeWidth}
          />
        )}
        
        {/* X-axis arrow */}
        {showXAxis && (
          <polygon 
            points={`${width},${transformY(0)} ${width-10},${transformY(0)-5} ${width-10},${transformY(0)+5}`}
            fill={defaultStyles.axes.stroke}
          />
        )}
        
        {/* Y-axis arrow */}
        {showYAxis && (
          <polygon 
            points={`${transformX(0)},0 ${transformX(0)-5},10 ${transformX(0)+5},10`}
            fill={defaultStyles.axes.stroke}
          />
        )}
        
        {/* Axis labels */}
        {showXAxis && (
          <text 
            x={width - 15} 
            y={transformY(0) + 20}
            fontFamily="sans-serif"
            fontSize="16"
            fill={defaultStyles.text.fill}
          >
            x
          </text>
        )}
        {showYAxis && (
          <text 
            x={transformX(0) + 15} 
            y={15}
            fontFamily="sans-serif"
            fontSize="16"
            fill={defaultStyles.text.fill}
          >
            y
          </text>
        )}
      </>
    );
  }, [minX, maxX, minY, maxY, showAxes, width, height]);
  
  // Generate tick marks and labels
  const ticksAndLabels = useMemo(() => {
    if (!showAxes) return null;
    
    const elements = [];
    const tickStep = gridStep;
    
    // X-axis ticks and labels
    for (let x = Math.ceil(minX / tickStep) * tickStep; x <= maxX; x += tickStep) {
      if (Math.abs(x) < 0.001) continue; // Skip origin
      
      elements.push(
        <g key={`tick-x-${x}`}>
          <line 
            x1={transformX(x)} 
            y1={transformY(0) - 5} 
            x2={transformX(x)} 
            y2={transformY(0) + 5}
            stroke={defaultStyles.axes.stroke}
            strokeWidth={1}
            opacity={minY <= 0 && maxY >= 0 ? 1 : 0} // Only show if x-axis is visible
          />
          <text 
            x={transformX(x)} 
            y={transformY(0) + (minY <= 0 && maxY >= 0 ? 20 : 15)} 
            fontFamily="sans-serif"
            fontSize="12"
            textAnchor="middle"
            fill={defaultStyles.text.fill}
          >
            {x}
          </text>
        </g>
      );
    }
    
    // Y-axis ticks and labels
    for (let y = Math.ceil(minY / tickStep) * tickStep; y <= maxY; y += tickStep) {
      if (Math.abs(y) < 0.001) continue; // Skip origin
      
      elements.push(
        <g key={`tick-y-${y}`}>
          <line 
            x1={transformX(0) - 5} 
            y1={transformY(y)} 
            x2={transformX(0) + 5} 
            y2={transformY(y)}
            stroke={defaultStyles.axes.stroke}
            strokeWidth={1}
            opacity={minX <= 0 && maxX >= 0 ? 1 : 0} // Only show if y-axis is visible
          />
          <text 
            x={transformX(0) - 10} 
            y={transformY(y) + 5} 
            fontFamily="sans-serif"
            fontSize="12"
            textAnchor="end"
            fill={defaultStyles.text.fill}
          >
            {y}
          </text>
        </g>
      );
    }
    
    // Add origin label if axes are visible
    if (minX <= 0 && maxX >= 0 && minY <= 0 && maxY >= 0) {
      elements.push(
        <text 
          key="origin" 
          x={transformX(0) - 10} 
          y={transformY(0) + 20}
          fontFamily="sans-serif"
          fontSize="12"
          textAnchor="middle"
          fill={defaultStyles.text.fill}
        >
          0
        </text>
      );
    }
    
    return elements;
  }, [minX, maxX, minY, maxY, showAxes, gridStep, width, height]);
  
  // Render diagram elements
  const renderElements = useMemo(() => {
    if (!showSolution) return null;
    
    return elements.map(element => {
      // Check if element should be visible
      if (element.visible === false) return null;
      
      // Apply styles based on element type and custom style
      const baseStyle = defaultStyles[element.type as keyof typeof defaultStyles];
      const style = { ...baseStyle, ...element.style };
      
      switch (element.type) {
        case 'line': {
          const p1 = points[element.point1Id];
          const p2 = points[element.point2Id];
          
          if (!p1 || !p2) return null;
          
          return (
            <g key={element.id}>
              <line
                x1={transformX(p1.x)}
                y1={transformY(p1.y)}
                x2={transformX(p2.x)}
                y2={transformY(p2.y)}
                stroke={style.stroke}
                strokeWidth={style.strokeWidth}
                strokeDasharray={style.strokeDasharray}
              />
              
              {/* Add measurement if provided */}
              {showMeasurements && element.measurement && (
                <text
                  x={(transformX(p1.x) + transformX(p2.x)) / 2}
                  y={(transformY(p1.y) + transformY(p2.y)) / 2 - 10}
                  fontFamily="sans-serif"
                  fontSize="12"
                  textAnchor="middle"
                  fill={defaultStyles.text.fill}
                >
                  {element.measurement}
                </text>
              )}
            </g>
          );
        }
        
        case 'circle': {
          const center = points[element.centerPointId];
          
          if (!center) return null;
          
          return (
            <g key={element.id}>
              <circle
                cx={transformX(center.x)}
                cy={transformY(center.y)}
                r={element.radius * xScale} // Scale radius
                stroke={style.stroke}
                strokeWidth={style.strokeWidth}
                fill={style.fill}
                fillOpacity={style.fillOpacity}
                strokeDasharray={style.strokeDasharray}
              />
              
              {/* Add label if provided */}
              {showLabels && element.label && (
                <text
                  x={transformX(center.x)}
                  y={transformY(center.y) - element.radius * xScale - 10}
                  fontFamily="sans-serif"
                  fontSize="12"
                  textAnchor="middle"
                  fill={defaultStyles.text.fill}
                >
                  {element.label}
                </text>
              )}
            </g>
          );
        }
        
        case 'text': {
          const text = element as Text;
          const textStyle = { ...style, ...text.style };
          
          return (
            <text
              key={element.id}
              x={transformX(text.x)}
              y={transformY(text.y)}
              fontFamily="sans-serif"
              fontSize={textStyle.fontSize || 12}
              textAnchor={textStyle.textAnchor || 'middle'}
              fill={textStyle.fill || defaultStyles.text.fill}
            >
              {text.content}
            </text>
          );
        }
        
        case 'angle': {
          const angle = element as Angle;
          const vertex = points[angle.vertex];
          const p1 = points[angle.point1];
          const p2 = points[angle.point2];
          
          if (!vertex || !p1 || !p2) return null;
          
          // Calculate angle
          const angle1 = Math.atan2(p1.y - vertex.y, p1.x - vertex.x);
          const angle2 = Math.atan2(p2.y - vertex.y, p2.x - vertex.x);
          
          // Create SVG arc
          const radius = angle.radius || 20 / xScale; // Default or specified radius
          const arcRadius = radius * xScale;
          
          // Ensure angles are in correct order
          let startAngle = angle1;
          let endAngle = angle2;
          if (startAngle > endAngle) {
            [startAngle, endAngle] = [endAngle, startAngle];
          }
          
          // Arc flags
          const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
          
          // Calculate arc points
          const x1 = transformX(vertex.x) + arcRadius * Math.cos(startAngle);
          const y1 = transformY(vertex.y) - arcRadius * Math.sin(startAngle);
          const x2 = transformX(vertex.x) + arcRadius * Math.cos(endAngle);
          const y2 = transformY(vertex.y) - arcRadius * Math.sin(endAngle);
          
          return (
            <g key={element.id}>
              <path
                d={`M ${x1} ${y1} A ${arcRadius} ${arcRadius} 0 ${largeArcFlag} 0 ${x2} ${y2}`}
                stroke={style.stroke}
                strokeWidth={style.strokeWidth}
                fill="none"
              />
              
              {/* Add measurement if provided */}
              {showMeasurements && angle.measurement && (
                <text
                  x={transformX(vertex.x) + arcRadius * Math.cos((startAngle + endAngle) / 2) * 1.2}
                  y={transformY(vertex.y) - arcRadius * Math.sin((startAngle + endAngle) / 2) * 1.2}
                  fontFamily="sans-serif"
                  fontSize="12"
                  textAnchor="middle"
                  fill={defaultStyles.text.fill}
                >
                  {angle.measurement}
                </text>
              )}
            </g>
          );
        }
        
        case 'polygon': {
          const polygon = element as Polygon;
          const polyPoints = polygon.pointIds
            .map(id => points[id])
            .filter(p => p !== undefined);
          
          if (polyPoints.length < 3) return null;
          
          const pointsString = polyPoints
            .map(p => `${transformX(p.x)},${transformY(p.y)}`)
            .join(' ');
          
          return (
            <g key={element.id}>
              <polygon
                points={pointsString}
                stroke={style.stroke}
                strokeWidth={style.strokeWidth}
                fill={style.fill}
                fillOpacity={style.fillOpacity}
                strokeDasharray={style.strokeDasharray}
              />
              
              {/* Add label if provided */}
              {showLabels && polygon.label && (
                <text
                  x={transformX(polyPoints.reduce((sum, p) => sum + p.x, 0) / polyPoints.length)}
                  y={transformY(polyPoints.reduce((sum, p) => sum + p.y, 0) / polyPoints.length)}
                  fontFamily="sans-serif"
                  fontSize="12"
                  textAnchor="middle"
                  fill={defaultStyles.text.fill}
                >
                  {polygon.label}
                </text>
              )}
            </g>
          );
        }
        
        default:
          return null;
      }
    });
  }, [elements, points, showSolution, showLabels, showMeasurements, xScale, width, height]);
  
  // Render points
  const renderPoints = useMemo(() => {
    if (!showSolution) return null;
    
    return Object.values(points).map(point => {
      // Skip if point should be invisible
      if (point.visible === false) return null;
      
      // Apply styles
      const baseStyle = defaultStyles.point;
      const style = { ...baseStyle, ...point.style };
      
      return (
        <g key={point.id}>
          <circle
            cx={transformX(point.x)}
            cy={transformY(point.y)}
            r={5}
            stroke={style.stroke}
            strokeWidth={style.strokeWidth}
            fill={style.fill}
          />
          
          {/* Add label if provided */}
          {showLabels && point.label && (
            <text
              x={transformX(point.x) + 10}
              y={transformY(point.y) - 10}
              fontFamily="sans-serif"
              fontSize="14"
              fontWeight="bold"
              fill={defaultStyles.text.fill}
            >
              {point.label}
            </text>
          )}
        </g>
      );
    });
  }, [points, showSolution, showLabels, width, height]);
  
  return (
    <div className="universal-diagram">
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
        style={{ backgroundColor: "#fff", margin: '0 auto', display: 'block' }}
      >
        {/* Grid Lines */}
        <g className="grid-lines">
          {gridLines}
        </g>
        
        {/* Axes */}
        <g className="axes">
          {axes}
        </g>
        
        {/* Ticks and Labels */}
        <g className="ticks-labels">
          {ticksAndLabels}
        </g>
        
        {/* Diagram Elements */}
        <g className="elements">
          {renderElements}
        </g>
        
        {/* Points */}
        <g className="points">
          {renderPoints}
        </g>
      </svg>
    </div>
  );
};

export default UniversalDiagram;