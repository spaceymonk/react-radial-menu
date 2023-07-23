import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import RadialMenuProvider from "../components/RadialMenuProvider";
import { generateChildren } from "./RadialMenu.util";

import "./RadialMenu.stories.css";
import { RadialMenuProviderProps } from "../components/RadialMenuProvider/RadialMenuProvider";

export default {
  title: "ReactComponentLibrary/RadialMenuProvider",
  component: RadialMenuProvider,
} as Meta<typeof RadialMenuProvider>;

const Renderer = (args: RadialMenuProviderProps & { childrenCount: number; size: number; fontSize: number }) => {
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

  return (
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
      <RadialMenuProvider
        {...args}
        show={isOpen}
        centerX={position.x}
        centerY={position.y}
        onCloseRequest={handleCloseRequest}
        children={generateChildren(args.childrenCount, args.size, args.fontSize)}
        menuItemProps={{...args.menuItemProps, interactive: true }}
        onItemClicked={(event, index) => {
          event.preventDefault();
          event.stopPropagation();
          setClickedIndex(`you have clicked on the item with index: ${index}`);
          setIsOpen(false);
        }}
      />
      <div>
        <p>Right click to open menu</p>
        {clickedIndex && <p>{clickedIndex}</p>}
      </div>
    </div>
  );
};

export const ProviderExample: StoryObj<RadialMenuProviderProps & { childrenCount: number; size: number; fontSize: number }> = {
  render: Renderer,
  args: {
    size: 50,
    fontSize: 1,
    outerRadius: 150,
    innerRadius: 50,
    childrenCount: 4,
  },
};
