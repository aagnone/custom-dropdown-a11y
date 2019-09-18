import React from "react";

const DropdownToggle = React.forwardRef((props, ref) => {
  return (
    <button
      onClick={props.click}
      onKeyDown={props.keyDown}
      ref={ref}
      aria-expanded={props.expanded}
      aria-haspopup="listbox"
      aria-labelledby={props.labelledby}>
      {props.children}
    </button>
  );
});

export default DropdownToggle;
