import React, { createContext, useState } from "react";

export const FakeContext = createContext();

const FakeContextProvider = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const [items, setItems] = useState(["small", "medium", "large"]);
  const [selectedItem, setSelectedItem] = useState("");

  const closeDropDown = () => {
    setOpen(false);
  };

  const addItems = item => {
    setItems([...items, item]);
  };

  const toggleDropDown = (e, callback) => {
    e && e.preventDefault();
    setOpen(!isOpen);
    //THIS DOESNT WORK...Need to focus the selected element when opened. or else the down arrow acts funky
    callback && callback();
  };

  const selectItem = value => {
    setSelectedItem(value);
  };

  return (
    <FakeContext.Provider
      value={{
        isOpen,
        items,
        selectedItem,
        toggleDropDown,
        selectItem,
        closeDropDown,
        addItems
      }}>
      {children}
    </FakeContext.Provider>
  );
};

export default FakeContextProvider;
