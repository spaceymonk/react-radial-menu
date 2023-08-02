import clsx from "clsx";
import React from "react";
import { MenuContext, MenuContextType } from "./MenuContext";
import { MenuItemProps, MenuProps } from "./types";

import "./Menu.css";

export const MAIN_MENU_ID = "0";
const ANIMATION_TIMEOUT = 300; // ms

const Menu = ({ centerX, centerY, innerRadius, outerRadius, ...props }: MenuProps) => {
  const { setData } = React.useContext(MenuContext) as MenuContextType;

  const numOfChildren = React.Children.count(props.children);
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
    setData((prev) => ({
      innerRadius,
      outerRadius,
      middleRadius,
      deltaRadius,
      menuWidth,
      menuHeight,
      activeMenuId: props.show ? myMenuId : prev.activeMenuId,
    }));
  }, [innerRadius, outerRadius, props.show]);

  const [transition, setTransition] = React.useState<"closed" | "closing" | "opened" | "opening">("closed");
  const timeout = React.useRef<ReturnType<typeof setTimeout>>();
  React.useEffect(() => {
    if (props.show) {
      setTransition("opening");
      timeout.current = setTimeout(() => {
        setTransition("opened");
        clearTimeout(timeout.current);
      }, ANIMATION_TIMEOUT);
    } else {
      setTransition("closing");
      timeout.current = setTimeout(() => {
        setTransition("closed");
        clearTimeout(timeout.current);
      }, ANIMATION_TIMEOUT);
    }
  }, [props.show]);

  if (transition === "closed") {
    return <></>;
  }

  return (
    <svg
      width={menuWidth}
      height={menuHeight}
      viewBox={`-3 -3 ${menuWidth + 6} ${menuHeight + 6}`}
      style={{
        width: `${menuWidth}px`,
        height: `${menuHeight}px`,
        left: `${centerX - outerRadius}px`,
        top: `${centerY - outerRadius}px`,
      }}
      className={clsx("menu", transition)}
    >
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
    </svg>
  );
};

export default Menu;
