import React, { Children } from "react";
import { MenuContext, MenuContextType } from "./MenuContext";
import { MenuItemProps } from "./MenuItem";
import { SubMenuProps } from "./SubMenu";

import "./Menu.css";

export const MAIN_MENU_ID = "0";

export interface MenuProps {
  innerRadius: number;
  outerRadius: number;
  centerX: number;
  centerY: number;
  children: React.ReactNode;
  show?: boolean;
}

const Menu = ({ centerX, centerY, innerRadius, outerRadius, ...rest }: MenuProps) => {
  const { setData } = React.useContext(MenuContext) as MenuContextType;

  const numOfChildren = React.Children.count(rest.children);
  if (numOfChildren < 2) {
    throw new Error("RadialMenu must have at least 2 children");
  }
  const angleStep = (2 * Math.PI) / numOfChildren;

  const middleRadius = (innerRadius + outerRadius) / 2;
  const deltaRadius = outerRadius - innerRadius;
  const menuWidth = outerRadius * 2;
  const menuHeight = menuWidth;

  const myMenuId = MAIN_MENU_ID;

  React.useEffect(() => {
    setData({
      innerRadius,
      outerRadius,
      middleRadius,
      deltaRadius,
      menuWidth,
      menuHeight,
      activeMenuId: myMenuId,
    });
  }, [innerRadius, outerRadius, rest.show]);

  return rest.show ? (
    <svg
      width={menuWidth}
      height={menuHeight}
      viewBox={`-5 -5 ${menuWidth + 5} ${menuHeight + 5}`}
      style={{
        width: `${menuWidth}px`,
        height: `${menuHeight}px`,
        left: `${centerX - outerRadius}px`,
        top: `${centerY - outerRadius}px`,
        position: "absolute",
        zIndex: "var(--zIndex)",
      }}
    >
      {React.Children.map(rest.children, (child, index) => {
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
    </svg>
  ) : (
    <></>
  );
};

export default Menu;
