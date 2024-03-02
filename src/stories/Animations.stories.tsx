import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MenuItem, SubMenu } from "../components";
import Menu from "../components/Menu";
import { MenuProps } from "../components/types";

import "./Demo.stories.css";

export default {
  title: "Tutorials",
  component: Menu,
} as Meta<typeof Menu>;

interface RadialMenuArgs extends MenuProps {}

export const Animations: StoryObj<RadialMenuArgs> = {
  render: (args) => {
    const [position, setPosition] = React.useState({ x: args.outerRadius, y: args.outerRadius });
    const targetDiv = React.useRef<HTMLDivElement>(null);
    const [show, setShow] = React.useState(false);
    const hideMenu = () => setShow(false);
    return (
      <div className="demo-wrapper">
        <h1>Animations</h1>
        <div>
          <h2>Animations</h2>
          <p>
            The menu supports animations. You can use the <code>animation</code> prop to specify the animation type.
          </p>
          <p>There are 3 built-in animations available:</p>
          <ul>
            <li>
              <code>fade</code> - fade in/out
            </li>
            <li>
              <code>scale</code> - zoom in/out
            </li>
            <li>
              <code>rotate</code> - rotate
            </li>
          </ul>
          <p>
            This animations are just CSS classes that are applied to the menu. You can create your own animations by
            passing your own CSS class to the <code>className</code> prop or overwriting the built-in animation classes.
          </p>
          <p className="warning">
            You have to specify the duration of the animations if you set the <code>animation</code> prop. The duration
            is specified in milliseconds and it is the same for all animations.
            <br /> <br />
            Use <code>animationTimeout</code> prop to specify the duration.
          </p>
          <p>
            These animation types can be used in any combination. For example, you can use <code>fade</code> and{" "}
            <code>scale</code> together or all 3 animations together.
          </p>
          <p>
            There is also a <code>animateSubMenuChange</code> prop that can be used to animate the sub menu when it
            appears/disappears (menu contents change). It uses the animation defined for the menu. More about sub menu
            in the next section.
          </p>
          <p>Use the Storybook controls to change the animation type and duration to test.</p>
          <pre>
            {`const [position, setPosition] = React.useState({ x: args.outerRadius, y: args.outerRadius });
const targetDiv = React.useRef<HTMLDivElement>(null);
const [show, setShow] = React.useState(false);
const hideMenu = () => setShow(false);

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
    <Menu
      show={show}
      innerRadius={${args.innerRadius}}
      outerRadius={${args.outerRadius}}
      centerX={position.x}
      centerY={position.y}
      animation={${JSON.stringify(args.animation)}}
      animationTimeout={${args.animationTimeout}}
      animateSubMenuChange={${args.animateSubMenuChange}}
    >
      <MenuItem onItemClick={hideMenu}>1</MenuItem>
      <MenuItem onItemClick={hideMenu}>2</MenuItem>
      <MenuItem onItemClick={hideMenu}>3</MenuItem>
      <SubMenu displayPosition="bottom" itemView="More">
        <MenuItem onItemClick={hideMenu}>4</MenuItem>
        <MenuItem onItemClick={hideMenu}>5</MenuItem>
        <MenuItem onItemClick={hideMenu}>6</MenuItem>
        <MenuItem onItemClick={hideMenu}>7</MenuItem>
      </SubMenu>
    </Menu>
  </div>
);`}
          </pre>
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
            <Menu
              show={show}
              innerRadius={args.innerRadius}
              outerRadius={args.outerRadius}
              centerX={position.x}
              centerY={position.y}
              animation={args.animation}
              animationTimeout={args.animationTimeout}
              animateSubMenuChange={args.animateSubMenuChange}
            >
              <MenuItem onItemClick={hideMenu}>1</MenuItem>
              <MenuItem onItemClick={hideMenu}>2</MenuItem>
              <MenuItem onItemClick={hideMenu}>3</MenuItem>
              <SubMenu displayPosition="bottom" itemView="More">
                <MenuItem onItemClick={hideMenu}>4</MenuItem>
                <MenuItem onItemClick={hideMenu}>5</MenuItem>
                <MenuItem onItemClick={hideMenu}>6</MenuItem>
                <MenuItem onItemClick={hideMenu}>7</MenuItem>
              </SubMenu>
            </Menu>
          </div>
        </div>
      </div>
    );
  },
  argTypes: {
    animation: { control: { type: "inline-check" }, options: ["fade", "scale", "rotate"] },
    animationTimeout: { control: { type: "range", min: 0, max: 600, step: 50 } },
    centerX: { table: { disable: true } },
    centerY: { table: { disable: true } },
    innerRadius: { table: { disable: true } },
    outerRadius: { table: { disable: true } },
    show: { table: { disable: true } },
    theme: { table: { disable: true } },
    drawBackground: { table: { disable: true } },
  },
  args: {
    innerRadius: 50,
    outerRadius: 100,
    animation: "fade",
    animationTimeout: 150,
    animateSubMenuChange: true,
  },
};
