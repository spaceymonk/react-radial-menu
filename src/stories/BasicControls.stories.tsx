import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MenuItem } from "../components";
import Menu from "../components/Menu";
import { MenuProps } from "../components/types";

import "./Demo.stories.css";

export default {
  title: "Tutorials",
  component: Menu,
} as Meta<typeof Menu>;

interface RadialMenuArgs extends MenuProps {
  childrenCount: number;
}

export const BasicControls: StoryObj<RadialMenuArgs> = {
  render: (args) => {
    const [position, setPosition] = React.useState({ x: args.outerRadius, y: args.outerRadius });
    const targetDiv = React.useRef<HTMLDivElement>(null);
    const [show, setShow] = React.useState(false);
    return (
      <div className="demo-wrapper">
        <h1>Basic Controls</h1>
        <div>
          <h2>Menu Size and Children</h2>
          <div>
            <p>You can customize the menu by passing your own components as children.</p>
            <p>Use this story to see how the menu looks like with different number of children.</p>
            <p className="warning">The menu requires minimum of 2 children to render.</p>
            <p>
              Also try to change the <code>outerRadius</code> and <code>innerRadius</code> to see how the menu looks
              like.
            </p>
            <p className="warning">
              The <code>outerRadius</code> must be greater than <code>innerRadius</code>.
            </p>
          </div>
          <div>
            <p>Below code fragment is used to render the menu:</p>
            <pre>
              {`<div className="menu-wrapper" style={{ width: ${2 * args.outerRadius}, height: ${
                2 * args.outerRadius
              } }}>
  <Menu centerX={${args.outerRadius}} centerY={${args.outerRadius}} outerRadius={${args.outerRadius}} innerRadius={${
                args.innerRadius
              }} drawBackground={${args.drawBackground}}>
    ${Array.from({ length: args.childrenCount }, (_, i) => `<MenuItem>${i}</MenuItem>`).join("\n    ")}
  </Menu>
</div>`}
            </pre>
            <p className="info">
              The wrapper div is used to position the menu in the center of the screen. The CSS class{" "}
              <code>menu-wrapper</code> just draws a border around the menu and sets the position to relative.
            </p>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="menu-wrapper" style={{ width: 2 * args.outerRadius, height: 2 * args.outerRadius }}>
            <Menu
              show
              innerRadius={args.innerRadius}
              outerRadius={args.outerRadius}
              centerX={args.outerRadius}
              centerY={args.outerRadius}
              drawBackground={args.drawBackground}
            >
              {Array.from({ length: args.childrenCount }, (_, i) => (
                <MenuItem key={i}>{i}</MenuItem>
              ))}
            </Menu>
          </div>
        </div>
        <div>
          <h2>Positioning the Menu</h2>
          <p>
            The menu is positioned using the <code>centerX</code> and <code>centerY</code> props.
          </p>
          <p>
            The menu is positioned relative to the top left corner of the parent element. Usually you want to set the{" "}
            <code>centerX</code> and <code>centerY</code> to mouse position.
          </p>
          <p>
            In this example the menu is positioned relative to the top left corner of the menu wrapper. To get correct
            mouse position you have to subtract the offset of the wrapper from the mouse position. This can be done via{" "}
            <code>getBoundingClientRect</code> method of the wrapper element. If you use the whole screen as the wrapper
            you can just use the mouse position.
          </p>
          <pre>
            {`const [position, setPosition] = React.useState({ x: ${args.outerRadius}, y: ${args.outerRadius} });
const targetDiv = React.useRef<HTMLDivElement>(null);
return (
  <div
    onClick={(e: React.MouseEvent<HTMLDivElement>) => {
      const offset = targetDiv.current?.getBoundingClientRect();
      if (!offset) return;
      setPosition({ x: e.clientX - offset.left, y: e.clientY - offset.top });
    }}
    className="menu-wrapper"
    style={{ width: "100%", height: "700px" }}
    ref={targetDiv}
  >
    <Menu show innerRadius={${args.innerRadius}} outerRadius={${
              args.outerRadius
            }} centerX={position.x} centerY={position.y}>
      ${Array.from({ length: args.childrenCount }, (_, i) => `<MenuItem>${i}</MenuItem>`).join("\n      ")}
    </Menu>
  </div>
);`}
          </pre>
        </div>
        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            const offset = targetDiv.current?.getBoundingClientRect();
            if (!offset) return;
            setPosition({ x: e.clientX - offset.left, y: e.clientY - offset.top });
          }}
          className="menu-wrapper"
          style={{ width: "100%", height: "700px" }}
          ref={targetDiv}
        >
          <Menu
            show
            innerRadius={args.innerRadius}
            outerRadius={args.outerRadius}
            centerX={position.x}
            centerY={position.y}
          >
            {Array.from({ length: args.childrenCount }, (_, i) => (
              <MenuItem key={i}>{i}</MenuItem>
            ))}
          </Menu>
        </div>
        <div>
          <h2>Show and Hide</h2>
          <p>
            The menu is shown and hidden by setting the <code>show</code> prop. The menu is hidden by default.
          </p>
          <p>
            Menu visibility shall be controlled by the user. For example, clicking on menu items or clicking outside of
            the menu will not hide the menu. This is left to the user to implement.
          </p>
          <p className="info">
            The idea behind this is that the menu is just a component that renders the menu items. The user should
            implement the logic for showing and hiding the menu. Perhaps your item click event handler will make an API
            call and you want to show a loading indicator. In this case you don't want the menu to hide.
          </p>
          <p>
            In the below example,<code>show</code> is set to <code>true</code> when the button is clicked and{" "}
            <code>false</code> when the menu wrapper is clicked or when the specific menu item is clicked.
          </p>
          <pre>
            {`const [show, setShow] = React.useState(false);
return (
  <button onClick={() => setShow(true)}>Show Menu</button>
  <div
    onClick={() => setShow(false)}
    className="menu-wrapper"
    style={{ width: "100%", height: ${2 * args.outerRadius}}}
  >
    <Menu
      show={show}
      innerRadius={${args.innerRadius}}
      outerRadius={${args.outerRadius}}
      centerX={${args.outerRadius}}
      centerY={${args.outerRadius}}
      drawBackground={${args.drawBackground}}
    >
      <MenuItem onItemClick={() => setShow(false)}>Click to close menu</MenuItem>
      <MenuItem onItemClick={() => {}}>but not here</MenuItem>
    </Menu>
  </div>
);`}
          </pre>
          <button onClick={() => setShow(true)}>Show Menu</button>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              onClick={() => setShow(false)}
              className="menu-wrapper"
              style={{ width: "100%", height: 2 * args.outerRadius }}
            >
              <Menu
                show={show}
                innerRadius={args.innerRadius}
                outerRadius={args.outerRadius}
                centerX={args.outerRadius}
                centerY={args.outerRadius}
                drawBackground={args.drawBackground}
              >
                <MenuItem onItemClick={() => setShow(false)}>Click to close menu</MenuItem>
                <MenuItem onItemClick={() => {}}>but not here</MenuItem>
              </Menu>
            </div>
          </div>
          <p>With this you have the control over the menu visibility.</p>
        </div>
      </div>
    );
  },
  argTypes: {
    childrenCount: {
      control: { type: "range", min: 2, max: 20, step: 1 },
    },
    outerRadius: {
      control: { type: "range", min: 0, max: 400, step: 10 },
    },
    innerRadius: {
      control: { type: "range", min: 0, max: 400, step: 10 },
    },
    centerX: { table: { disable: true } },
    centerY: { table: { disable: true } },
    show: { table: { disable: true } },
    animateSubMenuChange: { table: { disable: true } },
    animation: { table: { disable: true } },
    animationTimeout: { table: { disable: true } },
    theme: { table: { disable: true } },
  },
  args: {
    outerRadius: 150,
    innerRadius: 75,
    childrenCount: 5,
    drawBackground: true,
  },
};
