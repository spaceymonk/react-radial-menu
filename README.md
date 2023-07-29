# React Radial Menu

Simple radial menu with nested sub menu support for React. You can use it for context
menu or as a menu for your mobile app.

## Features

- Nested sub menu support with back button
- Customizable with CSS variables
- Dark mode support (thanks to CSS variables)
- Written in TypeScript

## Demo

Click [here](https://spaceymonk.github.io/react-radial-menu/).

[![Demo](https://raw.githubusercontent.com/spaceymonk/react-radial-menu/master/demo.gif)](https://spaceymonk.github.io/react-radial-menu/)

## Installation

```bash
npm install @spaceymonk/react-radial-menu
```

## Quick start

Just wrap your menu items with `<Menu>` component and pass it to `<MenuProvider>`.

```jsx
import React from "react";
import { Menu, MenuItem, MenuProvider, SubMenu } from "@spaceymonk/react-radial-menu";

function App() {
  const [show, setShow] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  // You can also use separate handler for each item
  const handleItemClick = (event, index, data) => {
    console.log(`${data} clicked`);
    setShow(false); // you should handle your menu visibility yourself
  };
  const handleSubMenuClick = (event, index, data) => {
    console.log(`${data} clicked`);
  };
  const handleDisplayClick = (event, position) => {
    console.log(`${position} clicked`);
  };

  return (
    <div
      onContextMenu={(e) => {
        e.preventDefault();
        setShow(true);
        setPosition({ x: e.clientX, y: e.clientY });
      }}
      onClick={() => setShow(false)}
      style={{ width: "100vw", height: "100vh" }}
    >
      <MenuProvider>
        <Menu centerX={position.x} centerY={position.y} innerRadius={75} outerRadius={150} show={show}>
          {/* Populate your menu here */}
          <MenuItem onItemClicked={handleItemClick} data="1. Item">1. Item</MenuItem>
          <SubMenu
            onDisplayClick={handleDisplayClick}
            onItemClicked={handleSubMenuClick}
            sectionView="2. Sub Menu"
            data="2. Sub Menu"
            displayPosition="bottom"
          >
            <MenuItem onItemClicked={handleItemClick} data="2.1. Item">2.1. Item</MenuItem>
            <MenuItem onItemClicked={handleItemClick} data="2.2. Item">2.2. Item</MenuItem>
            <MenuItem onItemClicked={handleItemClick} data="2.3. Item">2.3. Item</MenuItem>
            <SubMenu
              onDisplayClick={handleDisplayClick}
              onItemClicked={handleSubMenuClick}
              sectionView="2.4. Sub Menu"
              data="2.4. Sub Menu"
              displayPosition="bottom"
            >
              <MenuItem onItemClicked={handleItemClick} data="2.4.1. Item">2.4.1. Item</MenuItem>
              <MenuItem onItemClicked={handleItemClick} data="2.4.2. Item">2.4.2. Item</MenuItem>
            </SubMenu>
          </SubMenu>
        </Menu>
      </MenuProvider>
    </div>
  );
}

export default App;
```

## Contribute

Any idea and suggestions are welcome. Please have a look at the contributing guide.

## License

React Radial Menu is licensed under MIT.
