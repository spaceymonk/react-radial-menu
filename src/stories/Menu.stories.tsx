import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import Menu, { MenuProps } from "../components/Menu";
import MenuProvider from "../components/MenuContext";
import MenuItem from "../components/MenuItem";
import SubMenu from "../components/SubMenu";

export default {
  title: "ReactComponentLibrary/Menu",
  component: Menu,
} as Meta<typeof Menu>;

const Renderer = (args: MenuProps & { childrenCount: number; size: number; fontSize: number }) => {
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

  const handleItemClick = (event: any, index: number) => {
    setClickedIndex("CLICKED ON " + index);
    setIsOpen(false);
  };

  return (
    <MenuProvider>
      <div
        onClick={handleCloseRequest}
        onContextMenu={handleClick}
        style={{
          width: "100%",
          height: "600px",
          backgroundColor: "lightcyan",
          border: "1px solid cyan",
        }}
      >
        <Menu {...args} show={isOpen} centerX={position.x} centerY={position.y}>
          <MenuItem onItemClicked={handleItemClick}>Item 0-0</MenuItem>
          <MenuItem onItemClicked={handleItemClick}>Item 0-1</MenuItem>
          <SubMenu displayPosition="bottom" sectionView={"Submenu 2"}>
            <MenuItem onItemClicked={handleItemClick}>Item 0-2-0</MenuItem>
            <MenuItem onItemClicked={handleItemClick}>Item 0-2-1</MenuItem>
          </SubMenu>
          <MenuItem onItemClicked={handleItemClick}>Item 0-3</MenuItem>
          <SubMenu displayPosition="top" sectionView={"Submenu 4"}>
            <MenuItem onItemClicked={handleItemClick}>Item 0-4-0</MenuItem>
            <MenuItem onItemClicked={handleItemClick}>Item 0-4-1</MenuItem>
            <SubMenu displayPosition="center" sectionView={"Submenu 4-2"}>
              <MenuItem onItemClicked={handleItemClick}>Hello 0</MenuItem>
              <MenuItem onItemClicked={handleItemClick}>Hello 1</MenuItem>
            </SubMenu>
          </SubMenu>
          <MenuItem onItemClicked={handleItemClick}>Item 0-5</MenuItem>
          <SubMenu displayPosition="left" sectionView={"Submenu 2"}>
            <MenuItem onItemClicked={handleItemClick}>Item 0-2-0</MenuItem>
            <MenuItem onItemClicked={handleItemClick}>Item 0-2-1</MenuItem>
          </SubMenu>
        </Menu>
        <div>
          <p>Right click to open menu</p>
          {clickedIndex && <p>{clickedIndex}</p>}
        </div>
      </div>
    </MenuProvider>
  );
};

export const ProviderExample: StoryObj<MenuProps & { childrenCount: number; size: number; fontSize: number }> = {
  render: Renderer,
  args: {
    size: 50,
    fontSize: 1,
    outerRadius: 150,
    innerRadius: 75,
    childrenCount: 4,
  },
};
