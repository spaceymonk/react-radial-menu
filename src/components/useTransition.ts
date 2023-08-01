import React from "react";
import { MenuContext, MenuContextType } from "./MenuContext";

export const ANIMATION_TIMEOUT = 150; // in ms

export const useTransition = (predicate: (activeMenuId: string) => boolean) => {
  const { data } = React.useContext(MenuContext) as MenuContextType;
  const [transition, setTransition] = React.useState<"closed" | "closing" | "opened" | "opening">("closed");
  const timeout = React.useRef<ReturnType<typeof setTimeout>>();
  React.useEffect(() => {
    if (predicate(data.activeMenuId)) {
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
  }, [data.activeMenuId]);
  return transition;
};
