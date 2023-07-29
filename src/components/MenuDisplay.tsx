import clsx from "clsx";
import React from "react";
import { MenuContext, MenuContextType } from "./MenuContext";
import { MenuDisplayProps } from "./types";
import { calculatePositions } from "./util";

const MenuDisplay = ({ position, ...props }: MenuDisplayProps) => {
  const { data } = React.useContext(MenuContext) as MenuContextType;
  const { innerRadius, outerRadius, activeMenuId } = data;
  const [active, setActive] = React.useState(false);

  let { startAngle, endAngle, objectX, objectY, objectWidth, objectHeight } = React.useMemo(
    () => calculatePositions(position, innerRadius, outerRadius),
    [position, innerRadius, outerRadius]
  );

  if (props.__parentMenuId !== activeMenuId) {
    return <></>;
  }
  return (
    <>
      {position !== "center" ? (
        <path
          d={`M 
                ${Math.cos(startAngle) * innerRadius + outerRadius}
                ${Math.sin(startAngle) * innerRadius + outerRadius}
              A ${innerRadius} ${innerRadius} 0 0 1 
                ${Math.cos(endAngle) * innerRadius + outerRadius}
                ${Math.sin(endAngle) * innerRadius + outerRadius}
              Z`}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            props.onClick(event, position);
          }}
          className={clsx("base", { active })}
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
          className={clsx("base", { active })}
        />
      )}
      <foreignObject x={objectX} y={objectY} width={objectWidth} height={objectHeight} className="content-wrapper">
        <div className={clsx("content", { active })}>
          {props.children ? (
            props.children
          ) : (
            <svg width={`${objectWidth * 0.5}px`} height={`${objectHeight * 0.5}px`} viewBox="0 0 48 48">
              <path d="M12.9998 8L6 14L12.9998 21" className={clsx("return", { active })} />
              <path
                d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984"
                className={clsx("return", { active })}
              />
            </svg>
          )}
        </div>
      </foreignObject>
    </>
  );
};

export default MenuDisplay;
