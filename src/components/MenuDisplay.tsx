import React from "react";
import { MenuContext, MenuContextType } from "./MenuContext";
import clsx from "clsx";

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

  let { startAngle, endAngle, objectX, objectY, objectWidth, objectHeight } = calculatePositions(
    position,
    innerRadius,
    outerRadius
  );

  const [active, setActive] = React.useState(false);

  return props.__parentMenuId === activeMenuId ? (
    <>
      {position !== "center" ? (
        <path
          d={`
              M 
                ${Math.cos(startAngle) * innerRadius + outerRadius}
                ${Math.sin(startAngle) * innerRadius + outerRadius}
              
              A ${innerRadius} ${innerRadius} 0 0 1 
                ${Math.cos(endAngle) * innerRadius + outerRadius}
                ${Math.sin(endAngle) * innerRadius + outerRadius}
                
              Z
            `}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            props.onClick(event, position);
          }}
          className="container-bg"
        />
      ) : (
        <circle
          cx={outerRadius}
          cy={outerRadius}
          r={innerRadius}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            props.onClick(event, position);
          }}
          className="container-bg"
        />
      )}
      <foreignObject x={objectX} y={objectY} width={objectWidth} height={objectHeight} className="container">
        <div className={clsx("display", { active })}>
          {props.children ? (
            props.children
          ) : (
            <svg width={`${objectWidth*.5}px`} height={`${objectHeight*.5}px`} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path strokeWidth={4} d="M12.9998 8L6 14L12.9998 21" className={clsx("arrow", { active })} />
              <path
                strokeWidth={4}
                d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984"
                className={clsx("arrow", { active })}
              />
            </svg>
          )}
        </div>
      </foreignObject>
    </>
  ) : (
    <></>
  );
};

export default MenuDisplay;
function calculatePositions(position: string, innerRadius: number, outerRadius: number) {
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
  return { startAngle, endAngle, objectX, objectY, objectWidth, objectHeight };
}
