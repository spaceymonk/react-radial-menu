import { StoryObj, Meta, ReactRenderer } from "@storybook/react";
import RadialMenu, { RadialMenuProps } from "./RadialMenu";
import React from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ReactComponentLibrary/RadialMenu",
  component: RadialMenu,
} as Meta<typeof RadialMenu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: StoryObj<typeof RadialMenu> = (args: any) => (
//   <RadialMenu {...args} />
// );

// More on args: https://storybook.js.org/docs/react/writing-stories/args

const decorators = [
  (Story: any) => (
    <div style={{ width: "400px", height: "400px", backgroundColor: "lightcyan" }}>
      <Story />
    </div>
  ),
];

export const TwoChildren: StoryObj<RadialMenuProps> = {
  decorators,
  args: {
    innerRadius: 50,
    outerRadius: 200,
    children: generateChildren(2),
  },
};

export const ThreeChildren: StoryObj<RadialMenuProps> = {
  decorators,
  args: {
    innerRadius: 50,
    outerRadius: 100,
    children: generateChildren(3),
  },
};

export const FourChildren: StoryObj<RadialMenuProps> = {
  decorators,
  args: {
    innerRadius: 50,
    outerRadius: 100,
    children: generateChildren(4),
  },
};

export const TenChildren: StoryObj<RadialMenuProps> = {
  decorators,
  args: {
    innerRadius: 50,
    outerRadius: 100,
    children: generateChildren(10),
  },
};

export const TwentyChildren: StoryObj<RadialMenuProps> = {
  decorators,
  args: {
    innerRadius: 75,
    outerRadius: 150,
    children: generateChildren(20),
  },
};

function generateChildren(limit: number) {
  const result = [];
  for (let i = 0; i < limit; i++) {
    result.push(
      <div
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
