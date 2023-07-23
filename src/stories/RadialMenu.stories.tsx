import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import RadialMenu from "../components/RadialMenu";

import "./RadialMenu.stories.css";

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

const ChildrenTemplate: StoryObj<any> = {
  render: ({ itemCount, outerRadius, innerRadius }: any) => {
    return (
      <RadialMenu outerRadius={outerRadius} innerRadius={innerRadius}>
        {generateChildren(itemCount)}
      </RadialMenu>
    );
  },
};

function generateChildren(limit: number) {
  limit = Math.max(limit, 2);
  const result = [];
  for (let i = 0; i < limit; i++) {
    result.push(
      <div
        key={i}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <img src="https://www.svgrepo.com/show/530257/figure.svg" width={25} height={25} alt="figure" />
        <div style={{ fontSize: "0.5rem" }}>Child {i}</div>
      </div>
    );
  }
  return result;
}

export const ChildrenExample: StoryObj<any> = {
  ...ChildrenTemplate,
  decorators,
  args: {
    itemCount: 4,
    outerRadius: 100,
    innerRadius: 50,
    bottomDisplay: <div>Bottom Content</div>,
    leftDisplay: <div>Left Content</div>,
    rightDisplay: <div>Right Content</div>,
    topDisplay: <div>Top Content</div>,
  },
};

const DisplayTemplate: StoryObj<any> = {
  render: ({ drawBottomDisplay, drawLeftDisplay, drawRightDisplay, drawTopDisplay, outerRadius, innerRadius }: any) => {
    return (
      <RadialMenu
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
};

export const DisplayExample: StoryObj<any> = {
  ...DisplayTemplate,
  decorators,
  args: {
    drawBottomDisplay: false,
    drawLeftDisplay: false,
    drawRightDisplay: false,
    drawTopDisplay: false,
    outerRadius: 100,
    innerRadius: 50,
  },
};
