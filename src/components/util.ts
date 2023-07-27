export function getRingSectionPath(
  startAngle: number,
  endAngle: number,
  innerRadius: number,
  outerRadius: number
): string {
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

export function getArrowPoints(angle: number, outerRadius: number): string {
  //FIXME:
  const transformX = outerRadius + Math.cos(angle + angle / 4) * outerRadius;
  const transformY = outerRadius + Math.sin(angle + angle / 4) * outerRadius;
  return `${transformX} ${transformY}, ${transformX + 6} ${transformY + 6}, ${transformX} ${transformY + 12}`;
}
