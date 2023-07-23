import React from "react";

export function generateChildren(limit: number, size: number = 25, fontSize: number = 0.5) {
    const result = [];
    for (let i = 0; i < limit; i++) {
      result.push(
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
          }}
        >
          <img src="https://www.svgrepo.com/show/530257/figure.svg" width={size} height={size} alt="figure" />
          <div style={{ fontSize: `${fontSize}rem` }}>Item {i}</div>
        </div>
      );
    }
    return result;
  }
  