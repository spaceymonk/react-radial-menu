import React from "react";
import { MenuContext, MenuContextData, MenuContextType } from "./MenuContext";
import MenuDisplay, { DisplayPosition } from "./MenuDisplay";
import { MenuItemProps } from "./MenuItem";
import { getArrowPoints, getRingSectionPath } from "./util";
import clsx from "clsx";

export interface SubMenuProps extends MenuItemProps {
  sectionView: React.ReactNode;
  displayPosition: DisplayPosition;
  displayView?: React.ReactNode;
}

const SubMenu = ({ __index, __angleStep, ...props }: SubMenuProps) => {
  const { data, setData } = React.useContext(MenuContext) as MenuContextType;
  const { innerRadius, outerRadius, middleRadius, deltaRadius, activeMenuId } = data;
  // set by Menu component
  const angleStep = __angleStep as number;
  const index = __index as number;

  const myMenuId = `${props.__parentMenuId}-${index}`;

  if (activeMenuId === props.__parentMenuId) {
    return showYourself(
      deltaRadius,
      angleStep,
      middleRadius,
      index,
      outerRadius,
      props,
      setData,
      myMenuId,
      innerRadius
    );
  } else {
    return hideYourself(props, myMenuId, setData);
  }
};

export default SubMenu;

function showYourself(
  deltaRadius: number,
  angleStep: number,
  middleRadius: number,
  index: number,
  outerRadius: number,
  props: SubMenuProps,
  setData: React.Dispatch<React.SetStateAction<MenuContextData>>,
  myMenuId: string,
  innerRadius: number
) {
  const objectWidth = Math.min(deltaRadius / Math.sqrt(2), angleStep * middleRadius);
  const objectHeight = objectWidth;
  const objectX = Math.cos(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectWidth / 2);
  const objectY = Math.sin(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectHeight / 2);

  const [active, setActive] = React.useState(false);

  return (
    <>
      <path
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          if (props.onItemClicked) {
            props.onItemClicked(event, index);
          }
          setData((prev) => ({ ...prev, activeMenuId: myMenuId }));
        }}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        d={getRingSectionPath(index * angleStep, (index + 1) * angleStep, innerRadius, outerRadius)}
        className="container-bg"
      />
      <foreignObject x={objectX} y={objectY} width={objectWidth} height={objectHeight} className="container">
        <div className={clsx("item", { active })}>{props.sectionView}</div>
      </foreignObject>
      <polyline
      strokeWidth={2}
        points={getArrowPoints(index * angleStep, (index + 1) * angleStep, outerRadius)}
        className={clsx("arrow", { active })}
      />
    </>
  );
}

function hideYourself(
  props: SubMenuProps,
  myMenuId: string,
  setData: React.Dispatch<React.SetStateAction<MenuContextData>>
) {
  const numOfChildren = React.Children.count(props.children);
  if (numOfChildren < 2) {
    throw new Error("RadialMenu must have at least 2 children");
  }
  const angleStep = (2 * Math.PI) / numOfChildren;

  return (
    <>
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement(child)) {
          let prop: Partial<MenuItemProps | SubMenuProps> = {
            __index: index,
            __angleStep: angleStep,
            __parentMenuId: myMenuId,
          };
          return React.cloneElement(child, prop);
        }
        return child;
      })}
      <MenuDisplay
        __parentMenuId={myMenuId}
        position={props.displayPosition}
        onClick={() => setData((prev) => ({ ...prev, activeMenuId: props.__parentMenuId as string }))}
      >
        {props.displayView}
      </MenuDisplay>
    </>
  );
}
