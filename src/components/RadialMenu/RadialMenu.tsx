import React from "react";

import "./RadialMenu.css";

export interface RadialMenuProps extends React.PropsWithChildren {
  outerRadius: number;
  innerRadius: number;
}

function getRingSectionPath(startAngle: number, endAngle: number, innerRadius: number, outerRadius: number): string {
  // get the x and y coordinates on the outer ring
  const outerX1 = outerRadius * Math.cos(startAngle);
  const outerY1 = outerRadius * Math.sin(startAngle);
  const outerX2 = outerRadius * Math.cos(endAngle);
  const outerY2 = outerRadius * Math.sin(endAngle);

  // get the x and y coordinates on the inner ring
  const innerX1 = innerRadius * Math.cos(startAngle);
  const innerY1 = innerRadius * Math.sin(startAngle);
  const innerX2 = innerRadius * Math.cos(endAngle);
  const innerY2 = innerRadius * Math.sin(endAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `
    M ${outerRadius} ${outerRadius}
    m ${innerX1} ${innerY1}
    l ${outerX1 - innerX1} ${outerY1 - innerY1}
    A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerX2 + outerRadius} ${outerY2 + outerRadius}
    l ${innerX2 - outerX2} ${innerY2 - outerY2}
    A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${outerRadius + innerX1} ${outerRadius + innerY1}
  `;
}

const RadialMenu = ({ innerRadius, outerRadius, children, ...props }: RadialMenuProps) => {
  const numChildren = React.Children.count(children);

  if (numChildren < 2) throw new Error("RadialMenu must have at least 2 children");

  const angleStep = (2 * Math.PI) / numChildren;

  const middleRadius = (innerRadius + outerRadius) / 2;
  const deltaRadius = outerRadius - innerRadius;

  const objectWidth = Math.min(deltaRadius / Math.sqrt(2), angleStep * middleRadius);
  const objectHeight = objectWidth;

  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${outerRadius * 2} ${outerRadius * 2}`}>
      <path
        fill="#fefefe77"
        stroke="none"
        d={`
          M ${outerRadius + innerRadius} ${outerRadius}
          m ${outerRadius - innerRadius} 0
          A ${outerRadius} ${outerRadius} 0 0 0 0 ${outerRadius}
          m ${outerRadius - innerRadius} 0
          A ${innerRadius} ${innerRadius} 0 0 1 ${outerRadius + innerRadius} ${outerRadius}

          M ${outerRadius + innerRadius} ${outerRadius}
          m ${outerRadius - innerRadius} 0
          A ${outerRadius} ${outerRadius} 0 0 1 0 ${outerRadius}
          m ${outerRadius - innerRadius} 0
          A ${innerRadius} ${innerRadius} 0 0 0 ${outerRadius + innerRadius} ${outerRadius}
        `}
      />
      {React.Children.map(children, (child, index) => {
        let objectX = Math.cos(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectWidth / 2);
        let objectY = Math.sin(angleStep * index + angleStep / 2) * middleRadius + (outerRadius - objectHeight / 2);

        return (
          <>
            <path
              className="section"
              fill="#fefefe77"
              stroke="lightgray"
              d={getRingSectionPath(index * angleStep, (index + 1) * angleStep, innerRadius, outerRadius)}
            />
            <foreignObject x={objectX} y={objectY} width={objectWidth} height={objectHeight} className="section-item">
              {child}
            </foreignObject>
          </>
        );
      })}
    </svg>
  );
};

export default RadialMenu;
