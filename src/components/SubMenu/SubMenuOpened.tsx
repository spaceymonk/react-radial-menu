import React from "react";
import { MenuContext, MenuContextType } from "../MenuContext";
import MenuDisplay from "../MenuDisplay";
import { MenuItemProps, SubMenuProps } from "../types";

export const SubMenuOpened = ({ myMenuId, ...props }: SubMenuProps & { myMenuId: string }) => {
  const { setData } = React.useContext(MenuContext) as MenuContextType;

  const numOfChildren = React.Children.count(props.children);
  if (numOfChildren < 2) {
    throw new Error("RadialMenu must have at least 2 children");
  }
  const angleStep = (2 * Math.PI) / numOfChildren;
  return (
    <>
      {React.Children.map(props.children, (child, index) => {
        if (React.isValidElement(child)) {
          let prop: Partial<MenuItemProps> = {
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
        onClick={(event, position) => {
          if (props.onDisplayClick) {
            props.onDisplayClick(event, position);
          }
          setData((prev) => ({ ...prev, activeMenuId: props.__parentMenuId as string }));
        }}
      >
        {props.displayView}
      </MenuDisplay>
    </>
  );
};
