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

export interface MenuProps {
  innerRadius: number;
  outerRadius: number;
  centerX: number;
  centerY: number;
  children: React.ReactNode;
  show?: boolean;
}

export interface MenuItemProps {
  __index?: number;
  __angleStep?: number;
  __parentMenuId?: string;
  children: React.ReactNode;
  onItemClicked?: (event: React.MouseEvent<SVGPathElement, MouseEvent>, index: number) => void;
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
  onClick: (event: React.MouseEvent<SVGPathElement | SVGCircleElement, MouseEvent>, position: DisplayPosition) => void;
}
