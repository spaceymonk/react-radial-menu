import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MenuItem, SubMenu } from "../components";
import Menu from "../components/Menu";
import { DisplayPosition, MenuProps } from "../components/types";

import "./Demo.stories.css";

export default {
  title: "Tutorials",
  component: Menu,
} as Meta<typeof Menu>;

interface RadialMenuArgs extends MenuProps {
  displayPosition: DisplayPosition;
  displayView: string;
}

export const MenuItemAndSubMenu: StoryObj<RadialMenuArgs> = {
  render: (args) => {
    const [position, setPosition] = React.useState({ x: args.outerRadius, y: args.outerRadius });
    const targetDiv = React.useRef<HTMLDivElement>(null);
    const [show, setShow] = React.useState(false);
    const [text, setText] = React.useState("Click to show menu");
    const hideMenu = () => setShow(false);
    const handleItemClick = (event: React.MouseEvent, index: number, data: any) => {
      setText(`clicked on MenuItem = { index: ${index}, data: ${data} }`);
      hideMenu();
    };
    const handleSubMenuClick = (event: React.MouseEvent, index: number, data: any) => {
      setText(`clicked on SubMenu = { index: ${index}, data: ${data} }`);
    };
    const handleDisplayClick = (event: React.MouseEvent, position: DisplayPosition) => {
      setText(`you have clicked display (return button) at ${position}`);
    };
    return (
      <div className="demo-wrapper">
        <h1>MenuItem and SubMenu</h1>
        <p>
          This story describes how to use <code>MenuItem</code> and <code>SubMenu</code> components and gives an
          interactive example in the end.
        </p>
        <div>
          <h2>MenuItem</h2>
          <p>
            The <code>MenuItem</code> component is used to render the menu items. It has 2 required props:
          </p>
          <ul>
            <li>
              <code>onItemClick</code> - callback that is called when the item is clicked.
            </li>
            <li>
              <code>data</code> - data that is passed to the callback.
            </li>
          </ul>
          <p>
            The <code>MenuItem</code> component can render any content. It can be a simple text or a React component.
          </p>
          <p>
            <code>onItemClick</code> takes 3 arguments:
          </p>
          <ul>
            <li>
              <code>event</code> - the click event with type <code>{`React.MouseEvent<SVGGElement, MouseEvent>`}</code>
            </li>
            <li>
              <code>index</code> - index of the menu item
            </li>
            <li>
              <code>data</code> - data passed to the callback, if any
            </li>
          </ul>
          <p>
            Utilizing <code>data</code>property you can pass any data to the callback. So, you can use one callback for
            all menu items and distinguish them by the data passed to the callback.
          </p>
        </div>
        <div>
          <h2>Sub Menu</h2>
          <p>
            SubMenu is a special kind of menu item that can be used to display another menu. It is useful when you want
            to display a menu inside a menu.
          </p>
          <p className="warning">Just like menu, sub menu requires minimum of 2 children to render.</p>
          <p>You can nest sub menus inside sub menus.</p>
          <p>
            To create a sub menu, use the <code>SubMenu</code> component. It accepts the same props as{" "}
            <code>MenuItem</code> and additionally it accepts the following props:
          </p>
          <ul>
            <li>
              <code>itemView</code> - the content of the sub menu item. This can be a string or a React element. It is
              displayed in the parent menu as MenuItem.
            </li>
            <li>
              <code>displayPosition</code> - the position of the "return button" when sub menu opens. It's size depends
              on the <code>innerRadius</code> prop of the parent menu. It can take following values:
              <ul>
                <li>
                  <code>top</code> - the return button is displayed at the top of the inner hole.
                </li>
                <li>
                  <code>bottom</code> - the return button is displayed at the bottom of the inner hole.
                </li>
                <li>
                  <code>left</code> - the return button is displayed at the left of the inner hole.
                </li>
                <li>
                  <code>right</code> - the return button is displayed at the right of the inner hole.
                </li>
                <li>
                  <code>center</code> - the return button is displayed as a circle at the center of the inner hole.
                </li>
              </ul>
              Once clicked the sub menu is closed and the parent menu is displayed.
            </li>
            <li>
              <code>displayView</code> - the content of the "return button". This can be a string or a React element. If
              it is not set then a return image is displayed. This component rendered when the sub menu is open.
            </li>
            <li>
              <code>onDisplayClick</code> - callback that is called when the "return button" is clicked. It is called
              with the following arguments:
              <ul>
                <li>
                  <code>event</code> - the click event with type{" "}
                  <code>{`React.MouseEvent<SVGGElement, MouseEvent>`}</code>
                </li>
                <li>
                  <code>position</code> - position of the "return button", passed by the <code>displayPosition</code>{" "}
                  prop.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div>
          <h2>Example</h2>
          <p>
            In this example we will create a menu with 3 items. Two of them will be simple menu items and the third one
            will be a sub menu. The sub menu will have 2 items. You can experiment with the Storybook controls to change
            the menu properties.
          </p>
          <div
            onClick={hideMenu}
            onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
              e.preventDefault();
              setShow(!show);
              const offset = targetDiv.current?.getBoundingClientRect();
              if (!offset) return;
              setPosition({ x: e.clientX - offset.left, y: e.clientY - offset.top });
            }}
            className="menu-wrapper"
            style={{ width: "100%", height: "400px" }}
            ref={targetDiv}
          >
            <p>{text}</p>
            <Menu
              show={show}
              innerRadius={75}
              outerRadius={150}
              centerX={position.x}
              centerY={position.y}
              animation={["fade", "scale"]}
              animationTimeout={150}
            >
              <MenuItem data={"item-1"} onItemClick={handleItemClick}>
                1
              </MenuItem>
              <MenuItem data={"item-2"} onItemClick={handleItemClick}>
                2
              </MenuItem>
              <MenuItem data={"item-3"} onItemClick={handleItemClick}>
                3
              </MenuItem>
              <SubMenu
                onItemClick={handleSubMenuClick}
                onDisplayClick={handleDisplayClick}
                data={"submenu-data"}
                displayPosition={args.displayPosition}
                itemView="More"
                displayView={args.displayView}
              >
                <MenuItem data={"subItem-4"} onItemClick={handleItemClick}>
                  4
                </MenuItem>
                <MenuItem data={"subItem-5"} onItemClick={handleItemClick}>
                  5
                </MenuItem>
                <MenuItem data={"subItem-6"} onItemClick={handleItemClick}>
                  6
                </MenuItem>
                <MenuItem data={"subItem-7"} onItemClick={handleItemClick}>
                  7
                </MenuItem>
              </SubMenu>
            </Menu>
          </div>
          <pre>{`const [position, setPosition] = React.useState({ x: args.outerRadius, y: args.outerRadius });
const targetDiv = React.useRef<HTMLDivElement>(null);
const [show, setShow] = React.useState(false);
const [text, setText] = React.useState("Click to show menu");

const hideMenu = () => setShow(false);
const handleItemClick = (event: React.MouseEvent, index: number, data: any) => {
  setText(\`clicked on MenuItem = { index: \${index}, data: \${data} }\`);
  hideMenu();
};
const handleSubMenuClick = (event: React.MouseEvent, index: number, data: any) => {
  setText(\`clicked on SubMenu = { index: \${index}, data: \${data} }\`);
};
const handleDisplayClick = (event: React.MouseEvent, position: DisplayPosition) => {
  setText(\`you have clicked display (return button) at \${position}\`);
};

return (
  <div
    onClick={hideMenu}
    onContextMenu={(e: React.MouseEvent<HTMLDivElement>) => {
      e.preventDefault();
      setShow(!show);
      const offset = targetDiv.current?.getBoundingClientRect();
      if (!offset) return;
      setPosition({ x: e.clientX - offset.left, y: e.clientY - offset.top });
    }}
    className="menu-wrapper"
    style={{ width: "100%", height: "400px" }}
    ref={targetDiv}
  >
    <p>{text}</p>
    <Menu
      show={show}
      innerRadius={75}
      outerRadius={150}
      centerX={position.x}
      centerY={position.y}
      animation={["fade", "scale"]}
      animationTimeout={150}
    >
      <MenuItem data={"item-1"} onItemClick={handleItemClick}>1<MenuItem>
      <MenuItem data={"item-2"} onItemClick={handleItemClick}>2</MenuItem>
      <MenuItem data={"item-3"} onItemClick={handleItemClick}>3<MenuItem>
      <SubMenu
        onItemClick={handleSubMenuClick}
        onDisplayClick={handleDisplayClick}
        data={"submenu-data"}
        displayPosition={"${args.displayPosition}"}
        itemView={"More"}
        displayView={"${args.displayView}"}
      >
        <MenuItem data={"subItem-4"} onItemClick={handleItemClick}>4<MenuItem>
        <MenuItem data={"subItem-5"} onItemClick={handleItemClick}>5<MenuItem>
        <MenuItem data={"subItem-6"} onItemClick={handleItemClick}>6<MenuItem>
        <MenuItem data={"subItem-7"} onItemClick={handleItemClick}>7<MenuItem>
      </SubMenu>
    </Menu>
  </div>
);`}</pre>
        </div>
      </div>
    );
  },
  argTypes: {
    animation: { table: { disable: true } },
    animationTimeout: { table: { disable: true } },
    animateSubMenuChange: { table: { disable: true } },
    centerX: { table: { disable: true } },
    centerY: { table: { disable: true } },
    innerRadius: { table: { disable: true } },
    outerRadius: { table: { disable: true } },
    show: { table: { disable: true } },
    theme: { table: { disable: true } },
    displayPosition: { control: { type: "select"}, options: ["top", "bottom", "left", "right", "center"]  },
    drawBackground: { table: { disable: true } },
  },
  args: {
    displayPosition: "bottom",
    displayView: "",
  },
};
