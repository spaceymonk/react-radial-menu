import React from "react";
import RadialMenuDisplay from "../RadialMenuDisplay/RadialMenuDisplay";
import RadialMenuItem from "../RadialMenuItem";

import { RadialMenuItemProps } from "../RadialMenuItem/RadialMenuItem";
import "./RadialMenu.css";

export interface RadialMenuProps {
  outerRadius: number;
  innerRadius: number;

  drawBaseRing?: boolean;
  baseRingStyle?: React.SVGAttributes<SVGPathElement>;

  menuItemProps?: RadialMenuItemProps;

  topDisplay?: React.ReactNode;
  bottomDisplay?: React.ReactNode;
  leftDisplay?: React.ReactNode;
  rightDisplay?: React.ReactNode;

  children: React.ReactNode;
}

const RadialMenu = ({ innerRadius, outerRadius, ...props }: RadialMenuProps) => {
  const numChildren = React.Children.count(props.children);
  if (numChildren < 2) {
    throw new Error("RadialMenu must have at least 2 children");
  }
  const angleStep = (2 * Math.PI) / numChildren;
  const middleRadius = (innerRadius + outerRadius) / 2;
  const deltaRadius = outerRadius - innerRadius;
  const objectWidth = Math.min(deltaRadius / Math.sqrt(2), angleStep * middleRadius);
  const objectHeight = objectWidth;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${outerRadius * 2} ${outerRadius * 2}`}>
      {props.drawBaseRing && (
        <path
          {...props.baseRingStyle}
          className="react-radial-menu__base-ring"
          d={`
          M ${outerRadius + innerRadius} ${outerRadius}
          m ${deltaRadius} 0
          A ${outerRadius} ${outerRadius} 0 0 0 0 ${outerRadius}
          m ${deltaRadius} 0
          A ${innerRadius} ${innerRadius} 0 0 1 ${outerRadius + innerRadius} ${outerRadius}

          M ${outerRadius + innerRadius} ${outerRadius}
          m ${deltaRadius} 0
          A ${outerRadius} ${outerRadius} 0 0 1 0 ${outerRadius}
          m ${deltaRadius} 0
          A ${innerRadius} ${innerRadius} 0 0 0 ${outerRadius + innerRadius} ${outerRadius}
        `}
        />
      )}

      {React.Children.map(props.children, (child, index) => {
        const objectX = Math.cos(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectWidth / 2);
        const objectY = Math.sin(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectHeight / 2);
        return (
          <RadialMenuItem
            {...props.menuItemProps}
            index={index}
            angleStep={angleStep}
            objectX={objectX}
            objectY={objectY}
            objectWidth={objectWidth}
            objectHeight={objectHeight}
            innerRadius={innerRadius}
            outerRadius={outerRadius}
          >
            {child}
          </RadialMenuItem>
        );
      })}

      {props.bottomDisplay && (
        <RadialMenuDisplay position="bottom" innerRadius={innerRadius} outerRadius={outerRadius}>
          {props.bottomDisplay}
        </RadialMenuDisplay>
      )}

      {props.topDisplay && (
        <RadialMenuDisplay position="top" innerRadius={innerRadius} outerRadius={outerRadius}>
          {props.topDisplay}
        </RadialMenuDisplay>
      )}

      {props.leftDisplay && (
        <RadialMenuDisplay position="left" innerRadius={innerRadius} outerRadius={outerRadius}>
          {props.leftDisplay}
        </RadialMenuDisplay>
      )}

      {props.rightDisplay && (
        <RadialMenuDisplay position="right" innerRadius={innerRadius} outerRadius={outerRadius}>
          {props.rightDisplay}
        </RadialMenuDisplay>
      )}
    </svg>
  );
};

export default RadialMenu;
