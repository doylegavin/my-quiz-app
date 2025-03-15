import React, { useMemo } from 'react';

interface CoordinateCircleProps {
  // Core circle properties
  centerX: number;
  centerY: number;
  radius: number;
  
  // Display options
  width?: number;
  height?: number;
  showCenter?: boolean;
  showCenterCoordinates?: boolean;
  circleColor?: string;
  
  // Advanced options
  padding?: number; // padding percentage around the circle
  
  // Solution mode (if false, only shows empty grid for students to draw on)
  showSolution?: boolean;
}

const CoordinateCircle: React.FC<CoordinateCircleProps> = ({
  centerX,
  centerY,
  radius,
  width = 600,
  height = 500,
  showCenter = true,
  showCenterCoordinates = true,
  circleColor = "blue",
  padding = 20, // 20% padding around the circle
  showSolution = true,
}) => {
  // Calculate the viewport dimensions based on circle properties
  const viewportDimensions = useMemo(() => {
    // Calculate the bounding box of the circle
    const minX = centerX - radius;
    const maxX = centerX + radius;
    const minY = centerY - radius;
    const maxY = centerY + radius;
    
    // Add padding (percentage of the diameter)
    const paddingAmount = (padding / 100) * (2 * radius);
    
    // Round to nearest integers for clean grid lines
    return {
      minX: Math.floor(minX - paddingAmount),
      maxX: Math.ceil(maxX + paddingAmount),
      minY: Math.floor(minY - paddingAmount),
      maxY: Math.ceil(maxY + paddingAmount),
    };
  }, [centerX, centerY, radius, padding]);
  
  const { minX, maxX, minY, maxY } = viewportDimensions;
  
  // Calculate scale factors
  const xRange = maxX - minX;
  const yRange = maxY - minY;
  const xScale = width / xRange;
  const yScale = height / yRange;
  
  // Transform functions to convert from math coordinates to SVG coordinates
  const transformX = (x: number) => (x - minX) * xScale;
  const transformY = (y: number) => height - (y - minY) * yScale; // Invert Y-axis
  
  // Generate grid lines
  const gridLines = useMemo(() => {
    const xLines = [];
    const yLines = [];
    
    // X grid lines (vertical lines)
    for (let x = Math.ceil(minX); x <= Math.floor(maxX); x++) {
      xLines.push(
        <line 
          key={`x-${x}`}
          x1={transformX(x)} 
          y1={0} 
          x2={transformX(x)} 
          y2={height}
          stroke="#ccc"
          strokeWidth="1"
        />
      );
    }
    
    // Y grid lines (horizontal lines)
    for (let y = Math.ceil(minY); y <= Math.floor(maxY); y++) {
      yLines.push(
        <line 
          key={`y-${y}`}
          x1={0} 
          y1={transformY(y)} 
          x2={width} 
          y2={transformY(y)}
          stroke="#ccc"
          strokeWidth="1"
        />
      );
    }
    
    return [...xLines, ...yLines];
  }, [minX, maxX, minY, maxY, width, height]);
  
  // Generate axes
  const axes = useMemo(() => {
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
            stroke="#000" 
            strokeWidth="2"
          />
        )}
        {showYAxis && (
          <line 
            x1={transformX(0)} 
            y1={0} 
            x2={transformX(0)} 
            y2={height}
            stroke="#000" 
            strokeWidth="2"
          />
        )}
        
        {/* X-axis arrow */}
        {showXAxis && (
          <polygon 
            points={`${width},${transformY(0)} ${width-10},${transformY(0)-5} ${width-10},${transformY(0)+5}`}
            fill="#000"
          />
        )}
        
        {/* Y-axis arrow */}
        {showYAxis && (
          <polygon 
            points={`${transformX(0)},0 ${transformX(0)-5},10 ${transformX(0)+5},10`}
            fill="#000"
          />
        )}
        
        {/* Axis labels */}
        {showXAxis && (
          <text 
            x={width - 15} 
            y={transformY(0) + 20}
            fontFamily="sans-serif"
            fontSize="16"
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
          >
            y
          </text>
        )}
      </>
    );
  }, [minX, maxX, minY, maxY, width, height]);
  
  // Generate tick marks and labels
  const ticksAndLabels = useMemo(() => {
    const elements = [];
    
    // X-axis ticks and labels
    for (let x = Math.ceil(minX); x <= Math.floor(maxX); x++) {
      if (x === 0) continue; // Skip origin
      
      elements.push(
        <g key={`tick-x-${x}`}>
          <line 
            x1={transformX(x)} 
            y1={transformY(0) - 5} 
            x2={transformX(x)} 
            y2={transformY(0) + 5}
            stroke="#000"
            strokeWidth="1"
            opacity={minY <= 0 && maxY >= 0 ? 1 : 0} // Only show if x-axis is visible
          />
          <text 
            x={transformX(x)} 
            y={transformY(0) + (minY <= 0 && maxY >= 0 ? 20 : 0)} 
            fontFamily="sans-serif"
            fontSize="12"
            textAnchor="middle"
            opacity={1} // Always show x labels
          >
            {x}
          </text>
        </g>
      );
    }
    
    // Y-axis ticks and labels
    for (let y = Math.ceil(minY); y <= Math.floor(maxY); y++) {
      if (y === 0) continue; // Skip origin
      
      elements.push(
        <g key={`tick-y-${y}`}>
          <line 
            x1={transformX(0) - 5} 
            y1={transformY(y)} 
            x2={transformX(0) + 5} 
            y2={transformY(y)}
            stroke="#000"
            strokeWidth="1"
            opacity={minX <= 0 && maxX >= 0 ? 1 : 0} // Only show if y-axis is visible
          />
          <text 
            x={transformX(0) - (minX <= 0 && maxX >= 0 ? 15 : 0)} 
            y={transformY(y) + 5} 
            fontFamily="sans-serif"
            fontSize="12"
            textAnchor={minX <= 0 && maxX >= 0 ? "end" : "middle"}
            opacity={1} // Always show y labels
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
        >
          0
        </text>
      );
    }
    
    return elements;
  }, [minX, maxX, minY, maxY, width, height]);
  
  // Generate circle and center point
  const circleElements = useMemo(() => {
    if (!showSolution) return null;
    
    return (
      <>
        <circle 
          cx={transformX(centerX)} 
          cy={transformY(centerY)} 
          r={radius * xScale} // Scale the radius properly
          fill="none" 
          stroke={circleColor} 
          strokeWidth="2"
        />
        
        {showCenter && (
          <circle 
            cx={transformX(centerX)} 
            cy={transformY(centerY)} 
            r="4" 
            fill="red" 
          />
        )}
        
        {showCenter && showCenterCoordinates && (
          <text 
            x={transformX(centerX) + 10} 
            y={transformY(centerY) - 10} 
            fontFamily="sans-serif"
            fontSize="12"
          >
            ({centerX}, {centerY})
          </text>
        )}
      </>
    );
  }, [centerX, centerY, radius, xScale, circleColor, showCenter, showCenterCoordinates, showSolution]);
  
  return (
    <div className="coordinate-circle-container">
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${width} ${height}`}
        style={{ backgroundColor: "#fff", margin: '20px auto', display: 'block' }}
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
        
        {/* Circle and Center */}
        <g className="circle">
          {circleElements}
        </g>
      </svg>
    </div>
  );
};

export default CoordinateCircle;