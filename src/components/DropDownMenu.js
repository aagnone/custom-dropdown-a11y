import React from "react";

const DropDownMenu = ({ show, keyDown, children, ...props }) => {
  return (
    <ul
      className="menu"
      onKeyDown={keyDown}
      style={{ display: show ? "block" : "none" }}
      {...props}
      aria-haspopup="listbox">
      {children}
    </ul>
  );
};

export default DropDownMenu;
