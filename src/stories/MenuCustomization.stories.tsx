import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Menu from "../components/Menu";
import MenuProvider from "../components/MenuContext";
import MenuItem from "../components/MenuItem";

import { SubMenu } from "../components";
import "./Menu.stories.css";
import { MenuProps } from "../components/types";

export default {
  title: "Demos",
  component: Menu,
} as Meta<typeof Menu>;

interface RadialMenuCustomizationsArgs extends MenuProps {
}

export const RadialMenuCustomizations: StoryObj<RadialMenuCustomizationsArgs> = {
  render: (args) => {

    return (
      <div style={{ width: "400px", height: "400px", backgroundColor: "#efefef" }}>
        <MenuProvider>
          <Menu
            show={args.show}
            outerRadius={150}
            innerRadius={75}
            centerX={200}
            centerY={200}
          >
            <SubMenu data={"More"} sectionView={"More"} displayPosition="bottom">
              <SubMenu data={"More2"} sectionView={"More2"} displayPosition="bottom">
                <MenuItem data={"subsub 1"}>subsub 1</MenuItem>
                <MenuItem data={"subsub 2"}>subsub 2</MenuItem>
                <MenuItem data={"subsub 3"}>subsub 3</MenuItem>
              </SubMenu>
              <MenuItem data={"sub 1"}>sub 1</MenuItem>
              <MenuItem data={"sub 2"}>sub 2</MenuItem>
              <MenuItem data={"sub 3"}>sub 3</MenuItem>
            </SubMenu>
            <MenuItem data={"item 1"}>item 1</MenuItem>
            <MenuItem data={"item 2"}>item 2</MenuItem>
            <MenuItem data={"item 3"}>item 3</MenuItem>
            <MenuItem data={"item 4"}>item 4</MenuItem>
            <MenuItem data={"item 5"}>item 5</MenuItem>
            <MenuItem data={"item 6"}>item 6</MenuItem>
          </Menu>
        </MenuProvider>
      </div>
    );
  },
  argTypes: {
    outerRadius: { table: { disable: true } },
    innerRadius: { table: { disable: true } },
    centerX: { table: { disable: true } },
    centerY: { table: { disable: true } },
  },
  args: {
    show: true,
  },
};
