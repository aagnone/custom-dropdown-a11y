import React from "react";

export default (element, props) => {
  const { children, className: pClassName, ...passThroughProps } = props;

  return React.createElement(
    element,
    {
      ...passThroughProps
    },
    children
  );
};
