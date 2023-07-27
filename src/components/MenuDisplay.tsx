import React from "react";
import { MenuContext, MenuContextType } from "./MenuContext";

export type DisplayPosition = "top" | "right" | "bottom" | "left" | "center";

export interface MenuDisplayProps {
  position: DisplayPosition;
  children: React.ReactNode;
  __parentMenuId: string;
  onClick: (event: React.MouseEvent<SVGPathElement, MouseEvent>, position: DisplayPosition) => void;
}

const MenuDisplay = ({ position, ...props }: MenuDisplayProps) => {
  const { data } = React.useContext(MenuContext) as MenuContextType;
  const { innerRadius, outerRadius, activeMenuId } = data;

  let startAngle: number = 0;
  let endAngle: number = 0;
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
    case "center":
      objectX = outerRadius - innerRadius;
      objectY = objectX;
      objectWidth = objectX + innerRadius;
      objectHeight = objectY + innerRadius;
      break;
    default:
      throw new Error(`Invalid position: ${position}`);
  }

  return props.__parentMenuId === activeMenuId ? (
    <>
      {position !== "center" ? (
        <path
          fill="lightgrey"
          stroke="grey"
          d={`
              M 
                ${Math.cos(startAngle) * innerRadius + outerRadius}
                ${Math.sin(startAngle) * innerRadius + outerRadius}
              
              A ${innerRadius} ${innerRadius} 0 0 1 
                ${Math.cos(endAngle) * innerRadius + outerRadius}
                ${Math.sin(endAngle) * innerRadius + outerRadius}
                
              Z
            `}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            props.onClick(event, position);
          }}
          className="container-bg"
        />
      ) : (
        <circle
          fill="lightgrey"
          stroke="grey"
          cx={outerRadius}
          cy={outerRadius}
          r={innerRadius}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            props.onClick(event, position);
          }}
          className="container-bg"
        />
      )}
      <foreignObject x={objectX} y={objectY} width={objectWidth} height={objectHeight} className="container">
        {props.children}
      </foreignObject>
    </>
  ) : (
    <></>
  );
};

export default MenuDisplay;
