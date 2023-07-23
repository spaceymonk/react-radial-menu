import React from "react";

import "./RadialMenuDisplay.css";

export type DisplayPosition = "top" | "right" | "bottom" | "left";

export interface RadilaMenuDisplayProps {
  position: DisplayPosition;
  innerRadius: number;
  outerRadius: number;
  children: React.ReactNode;
}

const RadilaMenuDisplay = ({ position, innerRadius, outerRadius, ...props }: RadilaMenuDisplayProps) => {
  let startAngle: number;
  let endAngle: number;
  let objectHeight: number = 0;
  let objectWidth: number = 0;
  let objectX: number = 0;
  let objectY: number = 0;

  switch (position) {
    case "top":
      startAngle = Math.PI / 6 + Math.PI;
      endAngle = (5 * Math.PI) / 6 + Math.PI;
      objectHeight = innerRadius / 2;
      objectY = Math.sin(startAngle) * innerRadius + outerRadius - objectHeight;
      objectX = Math.cos(startAngle) * innerRadius + outerRadius;
      objectWidth = Math.cos(endAngle) * innerRadius + outerRadius - objectX;
      break;
    case "bottom":
      startAngle = Math.PI / 6;
      endAngle = (5 * Math.PI) / 6;
      objectHeight = innerRadius / 2;
      objectY = Math.sin(endAngle) * innerRadius + outerRadius;
      objectX = Math.cos(endAngle) * innerRadius + outerRadius;
      objectWidth = Math.cos(startAngle) * innerRadius + outerRadius - objectX;
      break;
    case "left":
      startAngle = (4 * Math.PI) / 6;
      endAngle = (8 * Math.PI) / 6;
      objectWidth = innerRadius / 2;
      objectX = Math.cos(endAngle) * innerRadius + outerRadius - objectWidth;
      objectY = Math.sin(endAngle) * innerRadius + outerRadius;
      objectHeight = Math.sin(startAngle) * innerRadius + outerRadius - objectY;
      break;
    case "right":
      startAngle = (10 * Math.PI) / 6;
      endAngle = (2 * Math.PI) / 6;
      objectWidth = innerRadius / 2;
      objectX = Math.cos(startAngle) * innerRadius + outerRadius;
      objectY = Math.sin(startAngle) * innerRadius + outerRadius;
      objectHeight = Math.sin(endAngle) * innerRadius + outerRadius - objectY;
      break;
    default:
      throw new Error(`Invalid position: ${position}`);
  }

  return (
    <>
      <path
        fill="#e0e0e077"
        stroke="#a0a0a0"
        className="react-radial-menu__display-path"
        d={`
            M 
              ${Math.cos(startAngle) * innerRadius + outerRadius}
              ${Math.sin(startAngle) * innerRadius + outerRadius}
            
            A ${innerRadius} ${innerRadius} 0 0 1 
              ${Math.cos(endAngle) * innerRadius + outerRadius}
              ${Math.sin(endAngle) * innerRadius + outerRadius}
              
            Z
          `}
      />
      <foreignObject
        x={objectX}
        y={objectY}
        width={objectWidth}
        height={objectHeight}
        className="react-radial-menu__display"
      >
        {props.children}
      </foreignObject>
    </>
  );
};

export default RadilaMenuDisplay;
