import React from "react";
import { MenuContextData } from "./types";

export interface MenuContextType {
  data: MenuContextData;
  setData: React.Dispatch<React.SetStateAction<MenuContextData>>;
}

export const MenuContext = React.createContext<MenuContextType | null>(null);

const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = React.useState<MenuContextData>({
    activeMenuId: "",
    deltaRadius: 0,
    innerRadius: 0,
    menuHeight: 0,
    menuWidth: 0,
    middleRadius: 0,
    outerRadius: 0,
  });
  return <MenuContext.Provider value={{ data, setData }}>{children}</MenuContext.Provider>;
};

export default MenuProvider;
