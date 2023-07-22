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
    children: [
      <div>
        <img src="https://www.svgrepo.com/show/530257/figure.svg" width={50} height={50} alt="figure" />
      </div>,
      <div>
        <img src="https://www.svgrepo.com/show/530257/figure.svg" width={50} height={50} alt="figure" />
      </div>,
    ],
  },
};

export const ThreeChildren: StoryObj<RadialMenuProps> = {
  decorators,
  args: {
    innerRadius: 50,
    outerRadius: 100,
    children: [
      <div style={{ padding: "5px 10px", background: "rgba(255, 255, 255, 0.8)" }}>item01</div>,
      <div style={{ padding: "5px 10px", background: "rgba(255, 255, 255, 0.8)" }}>item02</div>,
      <div style={{ padding: "5px 10px", background: "rgba(255, 255, 255, 0.8)" }}>item03</div>,
    ],
  },
};

export const MultipleChildren: StoryObj<RadialMenuProps> = {
  decorators,
  args: {
    innerRadius: 50,
    outerRadius: 100,
    children: (function () {
      const result = [];
      for (let i = 0; i < 10; i++) {
        result.push(
          <div>
            <img src="https://www.svgrepo.com/show/530257/figure.svg" width={25} height={25} alt="figure" />
          </div>
        );
      }
      return result;
    })(),
  },
};
