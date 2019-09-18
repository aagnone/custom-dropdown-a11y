import React from "react";

const DropDownItem = React.forwardRef((props, ref) => (
  <li
    ref={ref}
    onClick={props.click}
    tabIndex="-1"
    role="option"
    aria-selected={props.isSelected}>
    <p>{props.children}</p>
  </li>
));

export default DropDownItem;
