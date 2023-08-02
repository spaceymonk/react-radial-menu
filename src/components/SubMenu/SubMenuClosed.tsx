import clsx from "clsx";
import React from "react";
import { MenuContext, MenuContextType } from "../MenuContext";
import { SubMenuProps } from "../types";
import { getArrowPoints, getRingSectionPath } from "../util";

export const SubMenuClosed = ({ myMenuId, ...props }: SubMenuProps & { myMenuId: string }) => {
  const { data, setData } = React.useContext(MenuContext) as MenuContextType;
  const { innerRadius, outerRadius, middleRadius, deltaRadius } = data;

  const [active, setActive] = React.useState(false);
  const angleStep = props.__angleStep as number;
  const index = props.__index as number;
  const objectWidth = Math.min(deltaRadius / Math.sqrt(2), angleStep * middleRadius);
  const objectHeight = objectWidth;
  const objectX = Math.cos(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectWidth / 2);
  const objectY = Math.sin(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectHeight / 2);

  return (
    <g
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        if (props.onItemClicked) {
          props.onItemClicked(event, index, props.data);
        }
        setData((prev) => ({ ...prev, activeMenuId: myMenuId }));
      }}
    >
      <path
        d={getRingSectionPath(index * angleStep, (index + 1) * angleStep, innerRadius, outerRadius)}
        className={clsx("base", { active })}
      />
      <foreignObject x={objectX} y={objectY} width={objectWidth} height={objectHeight} className="content-wrapper">
        <div className={clsx("content", { active })}>{props.sectionView}</div>
      </foreignObject>
      <polyline
        points={getArrowPoints(index * angleStep, (index + 1) * angleStep, outerRadius)}
        className={clsx("arrow", { active })}
      />
    </g>
  );
};
