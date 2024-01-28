import { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { SubMenu } from "../components";
import Menu from "../components/Menu";
import MenuItem from "../components/MenuItem";
import { DisplayPosition, MenuProps } from "../components/types";

export default {
  title: "Demos",
  component: Menu,
} as Meta<typeof Menu>;

interface RadialMenuCustomizationsArgs extends MenuProps {
  menuBgColor: string;
  separatorColor: string;
  itemColor: string;
  activeItemColor: string;
  activeItemBgColor: string;
  arrowColor: string;
  activeArrowColor: string;
  displayPosition: DisplayPosition;
  displayView: string;
  themeSelect: "light" | "dark" | "none";
}

export const RadialMenuCustomizations: StoryObj<RadialMenuCustomizationsArgs> = {
  render: (args) => {
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    React.useEffect(() => {
      if (!wrapperRef.current) return;
      wrapperRef.current.style.setProperty("--__reactRadialMenu__menu-bgColor", args.menuBgColor);
      wrapperRef.current.style.setProperty("--__reactRadialMenu__separator-color", args.separatorColor);
      wrapperRef.current.style.setProperty("--__reactRadialMenu__item-color", args.itemColor);
      wrapperRef.current.style.setProperty("--__reactRadialMenu__activeItem-color", args.activeItemColor);
      wrapperRef.current.style.setProperty("--__reactRadialMenu__activeItem-bgColor", args.activeItemBgColor);
      wrapperRef.current.style.setProperty("--__reactRadialMenu__arrow-color", args.arrowColor);
      wrapperRef.current.style.setProperty("--__reactRadialMenu__activeArrow-color", args.activeArrowColor);
    }, [
      args.menuBgColor,
      args.separatorColor,
      args.itemColor,
      args.activeItemColor,
      args.activeItemBgColor,
      args.arrowColor,
      args.activeArrowColor,
    ]);

    return (
      <div className="demo-wrapper">
        <h1>Radial Menu Customizations</h1>
        <p>Use Storybook controls to test all customization options.</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            ref={wrapperRef}
            className="menu-wrapper"
            style={{ width: 2 * args.outerRadius + 100, height: 2 * args.outerRadius + 100 }}
          >
            <Menu
              animation={args.animation}
              animationTimeout={args.animationTimeout}
              animateSubMenuChange={args.animateSubMenuChange}
              show={args.show}
              outerRadius={args.outerRadius}
              innerRadius={args.innerRadius}
              centerX={args.outerRadius + 50}
              centerY={args.outerRadius + 50}
              theme={args.themeSelect === "none" ? undefined : args.themeSelect}
            >
              <SubMenu
                data={"More"}
                itemView={"More"}
                displayView={args.displayView}
                displayPosition={args.displayPosition}
              >
                <SubMenu
                  data={"More2"}
                  itemView={"More2"}
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
        </div>
        <pre>
          {`.menu-wrapper {
  --__reactRadialMenu__menu-bgColor: ${args.menuBgColor};
  --__reactRadialMenu__separator-color: ${args.separatorColor};
  --__reactRadialMenu__item-color: ${args.itemColor};
  --__reactRadialMenu__activeItem-color: ${args.activeItemColor};
  --__reactRadialMenu__activeItem-bgColor: ${args.activeItemBgColor};
  --__reactRadialMenu__arrow-color: ${args.arrowColor};
  --__reactRadialMenu__activeArrow-color: ${args.activeArrowColor};
}`}
        </pre>
        <p>
          <strong>Note:</strong> The above CSS variables are used to customize the menu. You can use different colors
          for each menu item, separator, and arrow. You can also use the <code>theme</code> prop to set a predefined
          theme.
        </p>
        <pre>
          {`
<Menu
  animation={${JSON.stringify(args.animation)}}
  animationTimeout={${args.animationTimeout}}
  animateSubMenuChange={${args.animateSubMenuChange}}
  show={${args.show}}
  outerRadius={${args.outerRadius}}
  innerRadius={${args.innerRadius}}
  centerX={${args.outerRadius + 50}}
  centerY={${args.outerRadius + 50}}${args.themeSelect === "none" ? "" : `\n  theme={"${args.themeSelect}"}`}
>
  <SubMenu data={"More"} itemView={"More"} displayView={"${args.displayView}"} displayPosition="${args.displayPosition}">
    <SubMenu data={"More2"} itemView={"More2"} displayView={"${args.displayView}"} displayPosition="${args.displayPosition}">
      // ... more menu items
    </SubMenu>
    // ... more menu items
  </SubMenu>
  // ... more menu items
</Menu>`}
        </pre>
      </div>
    );
  },
  argTypes: {
    centerX: { table: { disable: true } },
    centerY: { table: { disable: true } },
    animationTimeout: { control: { type: "number" } },
    animation: { control: { type: "inline-check" }, options: ["fade", "scale", "rotate"] },
    className: { table: { disable: true } },
    displayPosition: {
      options: ["top", "bottom", "left", "right", "center"],
      control: { type: "select" },
    },
    themeSelect: { control: { type: "inline-radio" }, options: ["light", "dark", "none"] },
    theme: { table: { disable: true } },
  },
  args: {
    show: true,
    animation: [],
    animationTimeout: 300,
    animateSubMenuChange: true,
    innerRadius: 75,
    outerRadius: 150,
    displayPosition: "bottom",
    displayView: "",
    themeSelect: "none",
    menuBgColor: "#fff",
    separatorColor: "rgba(0, 0, 0, 0.2)",
    itemColor: "#333",
    activeItemColor: "#fff",
    activeItemBgColor: "#3498db",
    arrowColor: "#6f6e77",
    activeArrowColor: "#fff",
  },
};
