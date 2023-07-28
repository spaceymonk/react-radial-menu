import React from "react";
import { MenuContext, MenuContextType } from "../MenuContext";
import { SubMenuProps } from "../types";
import { SubMenuClosed } from "./SubMenuClosed";
import { SubMenuOpened } from "./SubMenuOpened";

const SubMenu = (props: SubMenuProps) => {
  const { data } = React.useContext(MenuContext) as MenuContextType;
  const { activeMenuId } = data;
  const myMenuId = `${props.__parentMenuId}-${props.__index}`;

  if (activeMenuId === props.__parentMenuId) {
    return <SubMenuClosed {...props} myMenuId={myMenuId} />;
  }
  return <SubMenuOpened {...props} myMenuId={myMenuId} />;
};

export default SubMenu;
