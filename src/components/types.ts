export type DisplayPosition = "top" | "right" | "bottom" | "left" | "center";

export interface MenuContextData {
  innerRadius: number;
  outerRadius: number;
  middleRadius: number;
  deltaRadius: number;
  menuWidth: number;
  menuHeight: number;
  activeMenuId: string;
}

type AnimationType = "fade" | "rotate" | "scale";

export interface MenuProps extends React.SVGProps<SVGSVGElement> {
  innerRadius: number;
  outerRadius: number;
  centerX: number;
  centerY: number;
  children: React.ReactNode;
  show?: boolean;
  animationTimeout?: number;
  animateSubMenuChange?: boolean;
  animation?: AnimationType[];
  theme?: "light" | "dark";
}

export interface MenuItemProps {
  __index?: number;
  __angleStep?: number;
  __parentMenuId?: string;
  children: React.ReactNode;
  data?: any;
  onItemClicked?: (event: React.MouseEvent<SVGGElement, MouseEvent>, index: number, data?: any) => void;
}

export interface SubMenuProps extends MenuItemProps {
  sectionView: React.ReactNode;
  displayPosition: DisplayPosition;
  displayView?: React.ReactNode;
  onDisplayClick?: MenuDisplayProps["onClick"];
}

export interface MenuDisplayProps {
  position: DisplayPosition;
  children: React.ReactNode;
  __parentMenuId: string;
  onClick: (event: React.MouseEvent<SVGGElement, MouseEvent>, position: DisplayPosition) => void;
}
