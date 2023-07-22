import { StoryObj, Meta } from "@storybook/react";
import RadialMenu, { RadialMenuProps } from "./RadialMenu";

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
export const HelloWorld: StoryObj<RadialMenuProps> = {
  args: {
    label: "Hello world!",
  },
};

export const ClickMe: StoryObj<RadialMenuProps> = {
  args: {
    label: "Click me!",
  },
};
