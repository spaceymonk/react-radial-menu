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
          <MenuItem onItemClicked={handleItemClick}>0</MenuItem>
          <MenuItem onItemClicked={handleItemClick}>1</MenuItem>
          <SubMenu displayPosition="bottom" sectionView={"S1"} displayView={"Back"}>
            <MenuItem onItemClicked={handleItemClick}>2</MenuItem>
            <MenuItem onItemClicked={handleItemClick}>3</MenuItem>
          </SubMenu>
          <MenuItem onItemClicked={handleItemClick}>4</MenuItem>
          <SubMenu displayPosition="top" sectionView={"S2"}>
            <MenuItem onItemClicked={handleItemClick}>5</MenuItem>
            <MenuItem onItemClicked={handleItemClick}>6</MenuItem>
            <SubMenu displayPosition="center" sectionView={"S3"}>
              <MenuItem onItemClicked={handleItemClick}>7</MenuItem>
              <MenuItem onItemClicked={handleItemClick}>8</MenuItem>
            </SubMenu>
          </SubMenu>
          <MenuItem onItemClicked={handleItemClick}>11</MenuItem>
          <SubMenu displayPosition="left" sectionView={"S4"}>
            <MenuItem onItemClicked={handleItemClick}>9</MenuItem>
            <MenuItem onItemClicked={handleItemClick}>10</MenuItem>
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
