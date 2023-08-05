import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SubMenu } from "../components";
import Menu from "../components/Menu";
import MenuItem from "../components/MenuItem";
import { DisplayPosition, MenuProps } from "../components/types";

import "./Menu.stories.css";

export default {
  title: "Demos",
  component: Menu,
} as Meta<typeof Menu>;

interface RadialMenuCustomizationsArgs extends MenuProps {
  animation: string[];
  menuBgColor: string;
  separatorColor: string;
  itemColor: string;
  activeItemColor: string;
  activeItemBgColor: string;
  arrowColor: string;
  activeArrowColor: string;
  fontFamily: string;
  displayPosition: DisplayPosition;
  displayView: string;
}

export const RadialMenuCustomizations: StoryObj<RadialMenuCustomizationsArgs> = {
  render: (args) => {
    React.useEffect(() => {
      document.documentElement.style.setProperty("--menu-bgColor", args.menuBgColor);
      document.documentElement.style.setProperty("--separator-color", args.separatorColor);
      document.documentElement.style.setProperty("--item-color", args.itemColor);
      document.documentElement.style.setProperty("--activeItem-color", args.activeItemColor);
      document.documentElement.style.setProperty("--activeItem-bgColor", args.activeItemBgColor);
      document.documentElement.style.setProperty("--arrow-color", args.arrowColor);
      document.documentElement.style.setProperty("--activeArrow-color", args.activeArrowColor);
      document.documentElement.style.setProperty("--font-family", args.fontFamily);
    }, [
      args.menuBgColor,
      args.separatorColor,
      args.itemColor,
      args.activeItemColor,
      args.activeItemBgColor,
      args.arrowColor,
      args.activeArrowColor,
      args.fontFamily,
    ]);

    return (
      <div style={{ width: "400px", height: "400px", backgroundColor: "#efefef" }}>
        <Menu
          className={args.animation.join(" ")}
          animationTimeout={args.animationTimeout}
          animateSubMenuChange={args.animateSubMenuChange}
          show={args.show}
          outerRadius={150}
          innerRadius={75}
          centerX={200}
          centerY={200}
        >
          <SubMenu
            data={"More"}
            sectionView={"More"}
            displayView={args.displayView}
            displayPosition={args.displayPosition}
          >
            <SubMenu
              data={"More2"}
              sectionView={"More2"}
              displayView={args.displayView}
              displayPosition={args.displayPosition}
            >
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
      </div>
    );
  },
  argTypes: {
    outerRadius: { table: { disable: true } },
    innerRadius: { table: { disable: true } },
    centerX: { table: { disable: true } },
    centerY: { table: { disable: true } },
    animationTimeout: { control: { type: "number" } },
    animation: { control: { type: "inline-check" }, options: ["fade", "scale", "rotate"] },
    className: { table: { disable: true } },
    displayPosition: {
      options: ["top", "bottom", "left", "right", "center"],
      control: { type: "select" },
    },
  },
  args: {
    show: true,
    displayPosition: "bottom",
    displayView: "",
    animationTimeout: 300,
    animateSubMenuChange: true,
    animation: [],
    menuBgColor: "#fff",
    separatorColor: "rgba(0, 0, 0, 0.2)",
    itemColor: "#333",
    activeItemColor: "#fff",
    activeItemBgColor: "#3498db",
    arrowColor: "#6f6e77",
    activeArrowColor: "#fff",
    fontFamily: '"Roboto", sans-serif',
  },
};
