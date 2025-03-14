import React from 'react';

interface CircleProps {
  centerX: number;
  centerY: number;
  radius: number;
  width?: number;
  height?: number;
}

const CoordinateCircle: React.FC<CircleProps> = ({
  centerX,
  centerY,
  radius,
  width = 400,
  height = 300,
}) => {
  // Convert coordinate system to SVG coordinates
  // In SVG, (0,0) is top-left, but we want (0,0) to be center
  const svgCenterX = width / 2;
  const svgCenterY = height / 2;
  
  // Calculate the viewport extent based on radius and center
  const minX = -2;
  const maxX = 8;
  const minY = -5;
  const maxY = 3;
  
  // Calculate scale factors
  const xScale = width / (maxX - minX);
  const yScale = height / (maxY - minY);
  
  // Transform from math coordinates to SVG coordinates
  const transformX = (x: number) => svgCenterX + (x * xScale);
  const transformY = (y: number) => svgCenterY - (y * yScale); // Invert Y-axis
  
  // Create grid lines
  const xGridLines = [];
  const yGridLines = [];
  
  for (let x = Math.ceil(minX); x <= Math.floor(maxX); x++) {
    xGridLines.push(
      <line 
        key={`x-${x}`}
        x1={transformX(x)} 
        y1={transformY(minY)} 
        x2={transformX(x)} 
        y2={transformY(maxY)}
        stroke="#ccc"
        strokeWidth="1"
      />
    );
  }
  
  for (let y = Math.ceil(minY); y <= Math.floor(maxY); y++) {
    yGridLines.push(
      <line 
        key={`y-${y}`}
        x1={transformX(minX)} 
        y1={transformY(y)} 
        x2={transformX(maxX)} 
        y2={transformY(y)}
        stroke="#ccc"
        strokeWidth="1"
      />
    );
  }
  
  // Create axes
  const xAxis = (
    <line 
      x1={transformX(minX)} 
      y1={transformY(0)} 
      x2={transformX(maxX)} 
      y2={transformY(0)}
      stroke="#000" 
      strokeWidth="2"
    />
  );
  
  const yAxis = (
    <line 
      x1={transformX(0)} 
      y1={transformY(minY)} 
      x2={transformX(0)} 
      y2={transformY(maxY)}
      stroke="#000" 
      strokeWidth="2"
    />
  );
  
  // Create x-axis arrow
  const xArrow = (
    <polygon 
      points={`${transformX(maxX)},${transformY(0)} ${transformX(maxX-0.2)},${transformY(0.1)} ${transformX(maxX-0.2)},${transformY(-0.1)}`}
      fill="#000"
    />
  );
  
  // Create y-axis arrow
  const yArrow = (
    <polygon 
      points={`${transformX(0)},${transformY(maxY)} ${transformX(0.1)},${transformY(maxY-0.2)} ${transformX(-0.1)},${transformY(maxY-0.2)}`}
      fill="#000"
    />
  );
  
  // Create x and y labels
  const xLabel = (
    <text x={transformX(maxX) + 15} y={transformY(0) + 5} fontFamily="sans-serif">x</text>
  );
  
  const yLabel = (
    <text x={transformX(0) + 5} y={transformY(maxY) - 5} fontFamily="sans-serif">y</text>
  );
  
  // Create axis ticks and labels
  const xTicks = [];
  const yTicks = [];
  
  for (let x = Math.ceil(minX); x <= Math.floor(maxX); x++) {
    if (x !== 0) { // Skip origin
      xTicks.push(
        <React.Fragment key={`tick-${x}`}>
          <line 
            x1={transformX(x)} 
            y1={transformY(0) - 5} 
            x2={transformX(x)} 
            y2={transformY(0) + 5}
            stroke="#000"
            strokeWidth="1"
          />
          <text 
            x={transformX(x)} 
            y={transformY(0) + 20} 
            fontFamily="sans-serif"
            fontSize="12"
            textAnchor="middle"
          >
            {x}
          </text>
        </React.Fragment>
      );
    }
  }
  
  for (let y = Math.ceil(minY); y <= Math.floor(maxY); y++) {
    if (y !== 0) { // Skip origin
      yTicks.push(
        <React.Fragment key={`tick-${y}`}>
          <line 
            x1={transformX(0) - 5} 
            y1={transformY(y)} 
            x2={transformX(0) + 5} 
            y2={transformY(y)}
            stroke="#000"
            strokeWidth="1"
          />
          <text 
            x={transformX(0) - 15} 
            y={transformY(y) + 5} 
            fontFamily="sans-serif"
            fontSize="12"
            textAnchor="end"
          >
            {y}
          </text>
        </React.Fragment>
      );
    }
  }
  
  // Circle and center point
  const circleSVG = (
    <circle 
      cx={transformX(centerX)} 
      cy={transformY(centerY)} 
      r={radius * xScale} 
      fill="none" 
      stroke="blue" 
      strokeWidth="2"
    />
  );
  
  const centerPoint = (
    <circle 
      cx={transformX(centerX)} 
      cy={transformY(centerY)} 
      r="4" 
      fill="red" 
    />
  );
  
  // Center point label
  const centerLabel = (
    <text 
      x={transformX(centerX) + 10} 
      y={transformY(centerY) - 10} 
      fontFamily="sans-serif"
      fontSize="12"
    >
      ({centerX}, {centerY})
    </text>
  );
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      style={{ backgroundColor: "#fff", margin: '20px auto', display: 'block' }}
    >
      {/* Grid Lines */}
      <g className="grid-lines">
        {xGridLines}
        {yGridLines}
      </g>
      
      {/* Axes */}
      <g className="axes">
        {xAxis}
        {yAxis}
        {xArrow}
        {yArrow}
        {xLabel}
        {yLabel}
      </g>
      
      {/* Ticks and Labels */}
      <g className="ticks">
        {xTicks}
        {yTicks}
      </g>
      
      {/* Circle and Center */}
      <g className="circle">
        {circleSVG}
        {centerPoint}
        {centerLabel}
      </g>
    </svg>
  );
};

export default CoordinateCircle;