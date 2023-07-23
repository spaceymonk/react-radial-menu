import React from "react";
import RadialMenu, { RadialMenuProps } from "../RadialMenu/RadialMenu";

import "./RadialMenuProvider.css";

export interface RadialMenuProviderProps extends RadialMenuProps {
  centerX: number; // x coordinate of the center of the menu
  centerY: number; // y coordinate of the center of the menu
  show?: boolean; // show or hide the menu
  onCloseRequest?: () => void; // callback when the menu is closed
}

const RadialMenuProvider = (props: RadialMenuProviderProps) => {
  if (!props.show) {
    return <></>;
  }
  return (
    <div
      className="react-radial-menu__provider"
      style={{
        width: `${props.outerRadius * 2}px`,
        height: `${props.outerRadius * 2}px`,
        left: `${props.centerX - props.outerRadius}px`,
        top: `${props.centerY - props.outerRadius}px`,
      }}
    >
      <RadialMenu {...props} />
    </div>
  );
};

export default RadialMenuProvider;
