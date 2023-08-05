import clsx from "clsx";
import React from "react";
import { MenuContext } from "./MenuContext";
import { MenuContextData, MenuProps } from "./types";

import "./Menu.css";

export const MAIN_MENU_ID = "0";

const initialData = {
  activeMenuId: "",
  deltaRadius: 0,
  innerRadius: 0,
  menuHeight: 0,
  menuWidth: 0,
  middleRadius: 0,
  outerRadius: 0,
};

const Menu = ({
  centerX,
  centerY,
  innerRadius,
  outerRadius,
  animationTimeout,
  show,
  animateSubMenuChange,
  animation,
  theme,
  ...props
}: MenuProps) => {
  const [data, setData] = React.useState<MenuContextData>(initialData);

  const numOfChildren = React.Children.count(props.children);
  if (numOfChildren < 2) {
    throw new Error("RadialMenu must have at least 2 children");
  }

  const angleStep = (2 * Math.PI) / numOfChildren;
  const middleRadius = (innerRadius + outerRadius) / 2;
  const deltaRadius = outerRadius - innerRadius;
  const menuWidth = outerRadius * 2;
  const menuHeight = menuWidth;

  animationTimeout = React.useMemo(() => animationTimeout || 0, [animationTimeout]);
  const myMenuId = MAIN_MENU_ID;

  React.useEffect(() => {
    setData((prev) => ({
      innerRadius,
      outerRadius,
      middleRadius,
      deltaRadius,
      menuWidth,
      menuHeight,
      activeMenuId: show ? myMenuId : prev.activeMenuId,
    }));
  }, [innerRadius, outerRadius, show]);

  const [transition, setTransition] = React.useState<"closed" | "closing" | "opened" | "opening">("closed");
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout>>();
  const handleTransition = React.useCallback(() => {
    document.documentElement.style.setProperty("--animation-delay", `${animationTimeout}ms`);
    if (show) {
      setTransition("opening");
      timeoutRef.current = setTimeout(() => {
        setTransition("opened");
        clearTimeout(timeoutRef.current);
      }, animationTimeout);
    } else {
      setTransition("closing");
      timeoutRef.current = setTimeout(() => {
        setTransition("closed");
        clearTimeout(timeoutRef.current);
      }, animationTimeout);
    }
  }, [show, animationTimeout]);
  React.useEffect(() => {
    handleTransition();
  }, [show]);
  React.useEffect(() => {
    if (animateSubMenuChange) handleTransition();
  }, [data.activeMenuId, animateSubMenuChange]);

  if (transition === "closed") {
    return <></>;
  }
  return (
    <MenuContext.Provider value={{ data, setData }}>
      <svg
        {...props}
        width={menuWidth}
        height={menuHeight}
        viewBox={`-3 -3 ${menuWidth + 6} ${menuHeight + 6}`}
        style={{
          ...props.style,
          width: `${menuWidth}px`,
          height: `${menuHeight}px`,
          left: `${centerX - outerRadius}px`,
          top: `${centerY - outerRadius}px`,
        }}
        className={clsx("menu", transition, props.className, animation, theme)}
      >
        {React.Children.map(props.children, (child, index) => {
          if (React.isValidElement(child)) {
            let prop = {
              __index: index,
              __angleStep: angleStep,
              __parentMenuId: myMenuId,
            };
            return React.cloneElement(child, prop);
          }
          return child;
        })}
      </svg>
    </MenuContext.Provider>
  );
};

export default Menu;
