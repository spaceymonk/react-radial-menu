import React from "react";
import { MAIN_MENU_ID } from "./Menu";
import { MenuContext, MenuContextType } from "./MenuContext";
import { getRingSectionPath } from "./util";

export interface MenuItemProps {
  __index?: number;
  __angleStep?: number;
  __parentMenuId?: string;
  children: React.ReactNode;
  onItemClicked?: (event: React.MouseEvent<SVGPathElement, MouseEvent>, index: number) => void;
}

const MenuItem = ({ __index, __angleStep, ...props }: MenuItemProps) => {
  const { data, setData } = React.useContext(MenuContext) as MenuContextType;
  const { innerRadius, outerRadius, middleRadius, deltaRadius, activeMenuId } = data;
  // set by Menu component
  const angleStep = __angleStep as number;
  const index = __index as number;

  const objectWidth = Math.min(deltaRadius / Math.sqrt(2), angleStep * middleRadius);
  const objectHeight = objectWidth;
  const objectX = Math.cos(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectWidth / 2);
  const objectY = Math.sin(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectHeight / 2);

  return props.__parentMenuId === activeMenuId ? (
    <>
      <path
        fill="lightgrey"
        stroke="grey"
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (props.onItemClicked) {
            props.onItemClicked(event, index);
          }
          setData((prev) => ({ ...prev, activeMenuId: MAIN_MENU_ID }));
        }}
        d={getRingSectionPath(index * angleStep, (index + 1) * angleStep, innerRadius, outerRadius)}
        className="container-bg"
      />
      <foreignObject x={objectX} y={objectY} width={objectWidth} height={objectHeight} className="container">
        {props.children}
      </foreignObject>
    </>
  ) : (
    <></>
  );
};

export default MenuItem;
