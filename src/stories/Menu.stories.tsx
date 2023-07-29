import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Menu from "../components/Menu";
import MenuProvider from "../components/MenuContext";
import MenuItem from "../components/MenuItem";
import SubMenu from "../components/SubMenu/SubMenu";
import { DisplayPosition, MenuProps } from "../components/types";

export default {
  title: "Demos",
  component: Menu,
} as Meta<typeof Menu>;

interface SubMenuAndDisplaysArgs extends MenuProps {
  outerRadius: number;
  innerRadius: number;
  displayPosition: DisplayPosition;
  displayView: string;
}

export const SubMenuAndDisplays: StoryObj<SubMenuAndDisplaysArgs> = {
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

    const handleItemClick = (event: React.MouseEvent, index: number) => {
      setClickedIndex(`you have clicked item ${index}: <item>`);
      setIsOpen(false);
    };

    const handleSubMenuClick = (event: React.MouseEvent, index: number) => {
      setClickedIndex(`you have clicked item ${index}: <submenu>`);
    };

    return (
      <div
        onClick={handleCloseRequest}
        onContextMenu={handleClick}
        style={{ width: "100%", height: "600px", backgroundColor: "#efefef" }}
      >
        <MenuProvider>
          <Menu {...args} show={isOpen} centerX={position.x} centerY={position.y}>
            <MenuItem onItemClicked={handleItemClick}>0</MenuItem>
            <MenuItem onItemClicked={handleItemClick}>1</MenuItem>
            <SubMenu
              onItemClicked={handleSubMenuClick}
              displayPosition={args.displayPosition}
              displayView={args.displayView}
              sectionView={"2"}
            >
              <MenuItem onItemClicked={handleItemClick}>0</MenuItem>
              <MenuItem onItemClicked={handleItemClick}>1</MenuItem>
            </SubMenu>
            <MenuItem onItemClicked={handleItemClick}>3</MenuItem>
            <SubMenu
              onItemClicked={handleSubMenuClick}
              displayPosition={args.displayPosition}
              displayView={args.displayView}
              sectionView={"4"}
            >
              <MenuItem onItemClicked={handleItemClick}>0</MenuItem>
              <MenuItem onItemClicked={handleItemClick}>1</MenuItem>
              <SubMenu
                onItemClicked={handleSubMenuClick}
                displayPosition={args.displayPosition}
                displayView={args.displayView}
                sectionView={"2"}
              >
                <MenuItem onItemClicked={handleItemClick}>0</MenuItem>
                <MenuItem onItemClicked={handleItemClick}>1</MenuItem>
              </SubMenu>
            </SubMenu>
            <MenuItem onItemClicked={handleItemClick}>5</MenuItem>
            <SubMenu
              onItemClicked={handleSubMenuClick}
              displayPosition={args.displayPosition}
              displayView={args.displayView}
              sectionView={"6"}
            >
              <MenuItem onItemClicked={handleItemClick}>0</MenuItem>
              <MenuItem onItemClicked={handleItemClick}>1</MenuItem>
            </SubMenu>
          </Menu>
          <div style={{ fontFamily: "var(--font-family)" }}>
            <p>Right click to open menu...</p>
            <p>Update "displayView" prop to change return button (it can be any React Component).</p>
            <p>Update "displayPosition" prop to change return button position.</p>
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
  },
  args: {
    outerRadius: 150,
    innerRadius: 75,
    displayPosition: "bottom",
    displayView: "",
  },
};

interface ChildrenExampleArgs extends MenuProps {
  childrenCount: number;
}

export const ChildrenExample: StoryObj<ChildrenExampleArgs> = {
  render: (args) => {
    return (
      <div style={{ backgroundColor: "#efefef", width: "100%", height: "600px", position: "relative" }}>
        <MenuProvider>
          <Menu
            show={true}
            centerX={args.outerRadius}
            centerY={args.outerRadius}
            innerRadius={args.innerRadius}
            outerRadius={args.outerRadius}
          >
            {Array.from({ length: args.childrenCount }, (_, i) => (
              <MenuItem key={i}>{i}</MenuItem>
            ))}
          </Menu>
        </MenuProvider>
      </div>
    );
  },
  argTypes: {
    centerX: { table: { disable: true } },
    centerY: { table: { disable: true } },
    show: { table: { disable: true } },
  },
  args: {
    outerRadius: 150,
    innerRadius: 75,
    childrenCount: 10,
  },
};
