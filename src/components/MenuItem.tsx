import clsx from "clsx";
import React from "react";
import { MAIN_MENU_ID } from "./Menu";
import { MenuContext, MenuContextType } from "./MenuContext";
import { MenuItemProps } from "./types";
import { getObjectDimensions, getRingSectionPath } from "./util";

const MenuItem = ({ __angleStep, __index, __parentMenuId, data: propsData, onItemClick, ...props }: MenuItemProps) => {
  const { data, setData } = React.useContext(MenuContext) as MenuContextType;
  const { innerRadius, outerRadius, middleRadius, deltaRadius, activeMenuId } = data;
  const [active, setActive] = React.useState(false);
  const angleStep = __angleStep as number;
  const index = __index as number;
  const parentMenuId = __parentMenuId as string;

  const { objectX, objectY, objectWidth, objectHeight } = React.useMemo(
    () => getObjectDimensions(deltaRadius, angleStep, middleRadius, index, outerRadius),
    [deltaRadius, angleStep, middleRadius, index, outerRadius]
  );

  if (parentMenuId !== activeMenuId) {
    return <></>;
  }
  return (
    <g
      {...props}
      onMouseEnter={(e) => {
        props.onMouseEnter?.(e);
        setActive(true);
      }}
      onMouseLeave={(e) => {
        props.onMouseLeave?.(e);
        setActive(false);
      }}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onItemClick?.(event, index, propsData);
        setData((prev) => ({ ...prev, activeMenuId: MAIN_MENU_ID }));
      }}
    >
      <path
        d={getRingSectionPath(index * angleStep, (index + 1) * angleStep, innerRadius, outerRadius)}
        className={clsx("base", { active })}
      />
      <foreignObject x={objectX} y={objectY} width={objectWidth} height={objectHeight} className="content-wrapper">
        <div className={clsx("content", { active })}>{props.children}</div>
      </foreignObject>
    </g>
  );
};

export default MenuItem;
