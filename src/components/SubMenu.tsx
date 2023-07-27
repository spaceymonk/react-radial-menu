import React from "react";
import { MenuContext, MenuContextType } from "./MenuContext";
import MenuDisplay, { DisplayPosition } from "./MenuDisplay";
import { MenuItemProps } from "./MenuItem";
import { getArrowPoints, getRingSectionPath } from "./util";

export interface SubMenuProps extends MenuItemProps {
  sectionView: React.ReactNode;
  displayPosition: DisplayPosition;
}

const SubMenu = ({ __index, __angleStep, ...props }: SubMenuProps) => {
  const { data, setData } = React.useContext(MenuContext) as MenuContextType;
  const { innerRadius, outerRadius, middleRadius, deltaRadius, activeMenuId } = data;
  // set by Menu component
  const angleStep = __angleStep as number;
  const index = __index as number;

  const myMenuId = `${props.__parentMenuId}-${index}`;

  if (activeMenuId === props.__parentMenuId) {
    const objectWidth = Math.min(deltaRadius / Math.sqrt(2), angleStep * middleRadius);
    const objectHeight = objectWidth;
    const objectX = Math.cos(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectWidth / 2);
    const objectY = Math.sin(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectHeight / 2);
    return (
      <>
        <path
          fill="grey"
          stroke="grey"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            if (props.onItemClicked) {
              props.onItemClicked(event, index);
            }
            setData((prev) => ({ ...prev, activeMenuId: myMenuId }));
          }}
          d={getRingSectionPath(index * angleStep, (index + 1) * angleStep, innerRadius, outerRadius)}
          className="container-bg"
        />
        <foreignObject x={objectX} y={objectY} width={objectWidth} height={objectHeight} className="container">
          {props.sectionView}
        </foreignObject>
        {/*<polyline
          fill="none"
          stroke="black"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          points={getArrowPoints(angleStep * index, outerRadius)}
        />*/}
      </>
    );
  } else {
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
          GO BACK
        </MenuDisplay>
      </>
    );
  }
};

export default SubMenu;
