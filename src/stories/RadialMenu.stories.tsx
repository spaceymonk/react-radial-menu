import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import RadialMenu from "../components/RadialMenu";
import { generateChildren } from "./RadialMenu.util";

import "./RadialMenu.stories.css";
import { RadialMenuProps } from "../components/RadialMenu/RadialMenu";

export default {
  title: "ReactComponentLibrary/RadialMenu",
  component: RadialMenu,
} as Meta<typeof RadialMenu>;

const decorators = [
  (Story: any) => (
    <div style={{ width: "400px", height: "400px", backgroundColor: "lightcyan" }}>
      <Story />
    </div>
  ),
];

export const ChildrenExample: StoryObj<RadialMenuProps & { itemCount: number }> = {
  render: ({ itemCount, outerRadius, innerRadius, ...args }: RadialMenuProps & { itemCount: number }) => {
    return (
      <RadialMenu {...args} outerRadius={outerRadius} innerRadius={innerRadius}>
        {generateChildren(itemCount)}
      </RadialMenu>
    );
  },
  decorators,
  args: {
    itemCount: 4,
    outerRadius: 100,
    innerRadius: 50,
    menuItemProps: { interactive: true },
  },
};

export const DisplayExample: StoryObj<
  RadialMenuProps & {
    drawBottomDisplay: boolean;
    drawLeftDisplay: boolean;
    drawRightDisplay: boolean;
    drawTopDisplay: boolean;
  }
> = {
  render: ({
    drawBottomDisplay,
    drawLeftDisplay,
    drawRightDisplay,
    drawTopDisplay,
    outerRadius,
    innerRadius,
    ...args
  }: RadialMenuProps & {
    drawBottomDisplay: boolean;
    drawLeftDisplay: boolean;
    drawRightDisplay: boolean;
    drawTopDisplay: boolean;
  }) => {
    return (
      <RadialMenu
        {...args}
        outerRadius={outerRadius}
        innerRadius={innerRadius}
        bottomDisplay={drawBottomDisplay && <div className="display-items bottom">Bottom Content</div>}
        leftDisplay={drawLeftDisplay && <div className="display-items left">Left Content</div>}
        rightDisplay={drawRightDisplay && <div className="display-items right">Right Content</div>}
        topDisplay={drawTopDisplay && <div className="display-items top">Top Content</div>}
      >
        {generateChildren(2)}
      </RadialMenu>
    );
  },
  decorators,
  args: {
    drawBottomDisplay: false,
    drawLeftDisplay: false,
    drawRightDisplay: false,
    drawTopDisplay: false,
    outerRadius: 100,
    innerRadius: 50,
    menuItemProps: { interactive: true },
  },
};
