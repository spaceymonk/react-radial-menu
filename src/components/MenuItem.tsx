import clsx from "clsx";
import React from "react";
import { MAIN_MENU_ID } from "./Menu";
import { MenuContext, MenuContextType } from "./MenuContext";
import { MenuItemProps } from "./types";
import { getRingSectionPath } from "./util";

const MenuItem = (props: MenuItemProps) => {
  const { data, setData } = React.useContext(MenuContext) as MenuContextType;
  const { innerRadius, outerRadius, middleRadius, deltaRadius, activeMenuId } = data;
  const [active, setActive] = React.useState(false);
  const angleStep = props.__angleStep as number;
  const index = props.__index as number;

  const objectWidth = Math.min(deltaRadius / Math.sqrt(2), angleStep * middleRadius);
  const objectHeight = objectWidth;
  const objectX = Math.cos(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectWidth / 2);
  const objectY = Math.sin(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectHeight / 2);

  if (props.__parentMenuId !== activeMenuId) {
    return <></>;
  }
  return (
    <>
      <path
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (props.onItemClicked) {
            props.onItemClicked(event, index);
          }
          setData((prev) => ({ ...prev, activeMenuId: MAIN_MENU_ID }));
        }}
        d={getRingSectionPath(index * angleStep, (index + 1) * angleStep, innerRadius, outerRadius)}
        className={clsx("base", { active })}
      />
      <foreignObject x={objectX} y={objectY} width={objectWidth} height={objectHeight} className="content-wrapper">
        <div className={clsx("content", { active })}>{props.children}</div>
      </foreignObject>
    </>
  );
};

export default MenuItem;
