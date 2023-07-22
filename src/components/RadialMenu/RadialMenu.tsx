import React from "react";

import './RadialMenu.css';

export interface RadialMenuProps {
  label: string;
}

const RadialMenu = (props: RadialMenuProps) => {
  return <button>{props.label}</button>;
};

export default RadialMenu;