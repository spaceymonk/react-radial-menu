import React from "react";
import { MenuContextData } from "./types";

export interface MenuContextType {
  data: MenuContextData;
  setData: React.Dispatch<React.SetStateAction<MenuContextData>>;
}

export const MenuContext = React.createContext<MenuContextType | null>(null);
