import React from "react";
import createStyledElement from "./createStyledElement";

export default props => {
  const { click, reference, ...passThroughProps } = props;

  return createStyledElement("a", {
    ...passThroughProps,
    onClick: click,
    ref: reference
  });
};
