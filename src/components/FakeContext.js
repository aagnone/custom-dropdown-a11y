import React, { createContext, useState } from "react";

export const FakeContext = createContext();

const FakeContextProvider = ({ children }) => {
  const [appState, setState] = useState({
    isOpen: false,
    items: ["small", "medium", "large"],
    selectedItem: ""
  });

  const toggleDropDown = (e, callback) => {
    e.preventDefault();
    setState(prevstate => ({ ...appState, isOpen: !prevstate.isOpen }));
    //THIS DOESNT WORK...Need to focus the selected element when opened. or else the down arrow acts funky
    callback && callback();
  };

  //consider splitting useState

  const selectItem = value => {
    setState(prevstate => ({
      ...appState,
      isOpen: !prevstate.isOpen,
      selectedItem: value
    }));
  };

  return (
    <FakeContext.Provider
      value={{
        appState,
        toggleDropDown,
        selectItem
      }}>
      {children}
    </FakeContext.Provider>
  );
};

export default FakeContextProvider;
