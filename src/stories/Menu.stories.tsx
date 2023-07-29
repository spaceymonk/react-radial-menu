import { Meta, StoryObj } from "@storybook/react";
import clsx from "clsx";
import React from "react";
import Menu from "../components/Menu";
import MenuProvider from "../components/MenuContext";
import MenuItem from "../components/MenuItem";
import { DisplayPosition, MenuProps } from "../components/types";

import { SubMenu } from "../components";
import "./Menu.stories.css";

export default {
  title: "Demos",
  component: Menu,
} as Meta<typeof Menu>;

interface RadialMenuArgs extends MenuProps {
  outerRadius: number;
  innerRadius: number;
  displayPosition: DisplayPosition;
  displayView: string;
  childrenCount: number;
  darkMode: boolean;
}

export const RadialMenu: StoryObj<RadialMenuArgs> = {
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [clickedIndex, setClickedIndex] = React.useState("");

    const handleClick = (event: React.MouseEvent) => {
      event.preventDefault();
      if (isOpen) {
        setIsOpen(false);
      } else {
        setPosition({ x: event.clientX, y: event.clientY });
        setIsOpen(true);
      }
    };
    const handleCloseRequest = () => {
      if (isOpen) {
        setClickedIndex("you have closed the menu without clicking any item");
        setIsOpen(false);
      }
    };
    const handleItemClick = (event: React.MouseEvent, index: number, data: any) => {
      setClickedIndex(`clicked on MenuItem = { index: ${index}, data: ${data} }`);
      setIsOpen(false);
    };
    const handleSubMenuClick = (event: React.MouseEvent, index: number, data: any) => {
      setClickedIndex(`clicked on SubMenu = { index: ${index}, data: ${data} }`);
    };
    const handleDisplayClick = (event: React.MouseEvent, position: DisplayPosition) => {
      setClickedIndex(`you have clicked display (return button) at ${position}`);
    };

    return (
      <div
        className={clsx({ dark: args.darkMode })}
        onClick={handleCloseRequest}
        onContextMenu={handleClick}
        style={{ width: "100%", height: "600px", backgroundColor: "#efefef" }}
      >
        <MenuProvider>
          <Menu {...args} show={isOpen} centerX={position.x} centerY={position.y}>
            {Array.from({ length: args.childrenCount }, (_, i) => (
              <MenuItem key={i} data={"item " + i} onItemClicked={handleItemClick}>
                item {i}
              </MenuItem>
            ))}
            <SubMenu
              onDisplayClick={handleDisplayClick}
              onItemClicked={handleSubMenuClick}
              data={"More"}
              sectionView={"More"}
              displayView={args.displayView}
              displayPosition={args.displayPosition}
            >
              <SubMenu
                onDisplayClick={handleDisplayClick}
                onItemClicked={handleSubMenuClick}
                data={"More2"}
                sectionView={"More2"}
                displayView={args.displayView}
                displayPosition={args.displayPosition}
              >
                <MenuItem onItemClicked={handleItemClick} data={"subsub 1"}>
                  subsub 1
                </MenuItem>
                <MenuItem onItemClicked={handleItemClick} data={"subsub 2"}>
                  subsub 2
                </MenuItem>
                <MenuItem onItemClicked={handleItemClick} data={"subsub 3"}>
                  subsub 3
                </MenuItem>
              </SubMenu>
              <MenuItem onItemClicked={handleItemClick} data={"sub 1"}>
                sub 1
              </MenuItem>
              <MenuItem onItemClicked={handleItemClick} data={"sub 2"}>
                sub 2
              </MenuItem>
              <MenuItem onItemClicked={handleItemClick} data={"sub 3"}>
                sub 3
              </MenuItem>
            </SubMenu>
          </Menu>
          <div style={{ fontFamily: '"Roboto", sans-serif' }}>
            <p>Right click to open menu...</p>
            <ul>
              <li>
                Update <code>displayView</code> prop to change return button content (it can be any React Component).
              </li>
              <li>
                Update <code>displayPosition</code> prop to change return button position.
              </li>
              <li>
                You can toggle dark or light themes by setting <code>:root</code> variables.
              </li>
              <li>You can listen every click event on the menu (items, submenus, displays).</li>
            </ul>
          </div>
          <div>{clickedIndex && <p>{clickedIndex}</p>}</div>
        </MenuProvider>
      </div>
    );
  },
  argTypes: {
    centerX: { table: { disable: true } },
    centerY: { table: { disable: true } },
    show: { table: { disable: true } },
    displayPosition: {
      options: ["top", "bottom", "left", "right", "center"],
      control: { type: "select" },
    },
    childrenCount: {
      control: { type: "range", min: 1, max: 10, step: 1 },
    },
  },
  args: {
    outerRadius: 150,
    innerRadius: 75,
    displayPosition: "bottom",
    displayView: "",
    childrenCount: 1,
    darkMode: false,
  },
};
