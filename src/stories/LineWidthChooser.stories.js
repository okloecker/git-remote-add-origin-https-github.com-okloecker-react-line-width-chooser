import React from "react";
import { action } from "@storybook/addon-actions";
import LineWidthChooser from "../LineWidthChooser";

export default {
  title: "LineWidthChooser",
  component: LineWidthChooser
};

export const LineWidthChooserDefault = () => (
  <LineWidthChooser onChange={action("change")} onClick={action("click")} />
);
export const LineWidthChooserPink = () => (
  <div style={{ background:"grey", display: "flex", justifyContent: "center", padding: "2ex" }}>
    <div />
    <LineWidthChooser colour="hotpink" onClick={action("click")} />
  </div>
);
export const LineWidthChooserDarkBackground = () => (
  <LineWidthChooser background={"#909090"} onClick={action("click")} />
);
export const LineWidthChooserCustomWidthWhiteOnBlackWithAlpha = () => (
  <div
    style={{
      background: "black",
      display: "flex",
      justifyContent: "center",
      padding: "2ex"
    }}
  >
    <div />
    <LineWidthChooser
      width={50}
      background={"#ffffff90"}
      onClick={action("click")}
    />
  </div>
);
