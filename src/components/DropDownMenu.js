import React from "react";

const DropDownMenu = ({ show, keyDown, children, ...props }) => {
  return (
    <div
      className="menu"
      onKeyDown={keyDown}
      style={{ display: show ? "block" : "none" }}
      {...props}
      aria-haspopup="listbox">
      {children}
    </div>
  );
};

export default DropDownMenu;
