import React from "react";
import { MenuContextData } from "./types";

export interface MenuContextType {
  data: MenuContextData;
  setData: React.Dispatch<React.SetStateAction<MenuContextData>>;
}

export const MenuContext = React.createContext<MenuContextType | null>(null);

const MenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = React.useState<MenuContextData>({} as MenuContextData);
  return <MenuContext.Provider value={{ data, setData }}>{children}</MenuContext.Provider>;
};

export default MenuProvider;
