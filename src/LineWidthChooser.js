import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./LineWidthChooser.module.scss";

const DEFAULT_ELEMENTS = [1, 2, 3, 4, 5, 7, 9];
const DEFAULT_WIDTH = 100;
const DEFAULT_COLOUR = "#00ff00";
const DEFAULT_BACKGROUND = "#ffffff";
const DEFAULT_FONT = "sans-serif";

/**
 * Turns hex colour into its negative.
 * "rgb" MUST BE of the form "#000000" with optional alpha: "#00000000"
 */
function invertRgb(rgb) {
  if (!rgb) throw new Error("not a colour, expected #000000 or #00000000");
  const rgbArr = rgb.match(
    /#([0-9a-z]{2})([0-9a-z]{2})([0-9a-z]{2})([0-9a-z]{0,2})/i
  );
  if (!(rgbArr || []).length)
    throw new Error("not a colour, expected #000000 or #00000000");
  const alpha = (rgbArr || []).slice(4);
  const rvArr = (rgbArr || [])
    .slice(1, 4)
    .map(a => +("0x" + a) ^ 0xff)
    .map(a => a.toString(16).padStart(2, 0));
  const rv = "#" + rvArr.join("") + (alpha[0] || "");
  return rv;
}

/**
 * Line Width Chooser/Picker.
 * Shows 2 columns: numerical width and graphical line in the respective width.
 * On hovering over an element, it will change its opacity and be surrounded by
 * a border in the colour negative to the background.
 *
 * Configurable props:
 * @param lineWidths array of widths to display (default: DEFAULT_WIDTH)
 * @param width component width
 * @param background component's background colour
 * @param colour the texts' and lines' colour
 * @param font the text's font-family
 * @param opacity the component's opacity (not the hovering opacity)
 * @param onClick fires when user clicks a hovered line
 * @param onChange fires when user hovers over a line (enters it)
 *
 */
const LineWidthChooser = ({
  lineWidths,
  width,
  background,
  colour,
  font,
  opacity,
  onClick,
  onChange
}) => {
  const [hoverId, setHoverId] = useState(false);
  const finalColour = colour || DEFAULT_COLOUR;
  const finalBackground = background || DEFAULT_BACKGROUND;
  const finalBorder = el => {
    const rv =
      +hoverId === +el ? `2px solid ${invertRgb(finalBackground)}` : ``;
    return rv;
  };

  return (
    <div
      className={styles.root}
      style={{
        width: width || DEFAULT_WIDTH,
        background: finalBackground,
        opacity: opacity || 1
      }}
    >
      {((Array.isArray(lineWidths) && lineWidths) || DEFAULT_ELEMENTS).map(
        el => (
          <div
            key={el + Math.random()}
            id={el}
            className={styles.element}
            style={{
              outline: finalBorder(el)
            }}
            onClick={e => (onClick ? onClick(e.currentTarget.id) : null)}
            onMouseEnter={e => {
              setHoverId(e.currentTarget.id);
              onChange && onChange(e.currentTarget.id);
            }}
            onMouseLeave={e => setHoverId(undefined)}
          >
            <div
              style={{
                color: finalColour,
                fontFamily: font || DEFAULT_FONT
              }}
            >
              {el}
            </div>
            <div
              style={{
                borderBottom: `${el}px solid ${colour || DEFAULT_COLOUR}`
              }}
            />
          </div>
        )
      )}
    </div>
  );
};

LineWidthChooser.propTypes = {
  lineWidths: PropTypes.array,
  onChange: PropTypes.func,
  onClick: PropTypes.func
};

export default LineWidthChooser;
