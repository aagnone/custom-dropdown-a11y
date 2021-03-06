import React, {
  useState,
  useContext,
  useRef,
  createRef,
  useEffect
} from "react";
import DropDown from "./Dropdown";
import DropdownToggle from "./DropdownToggle";
import DropDownMenu from "./DropDownMenu";
import DropdownItem from "./DropDownItem";
import { FakeContext } from "./FakeContext";

const FakeProduct = () => {
  // int - what element is selected
  const [selected, setSelected] = useState(0);

  const {
    isOpen,
    items,
    selectedItem,
    toggleDropDown,
    selectItem,
    closeDropDown
  } = useContext(FakeContext);

  //creates list of DOM refs to focus
  const elRef = useRef(items.map(() => createRef()));
  const toggleRef = useRef(null);

  const handleOpen = e => {
    toggleDropDown(e);
  };

  const handleSelect = (item, index) => {
    setSelected(index);
    selectItem(item);
  };

  const handleDownArrow = () => {
    selected < items.length - 1 && setSelected(selected + 1);
  };
  const handleUpArrow = () => {
    selected > 0 && setSelected(selected - 1);
    selected === 0 && closeDropdownHandler();
  };

  const handleKeys = e => {
    const keyPressed = e.key || e.which;
    if (isOpen) {
      switch (keyPressed) {
        case "ArrowDown" || 40:
          e.preventDefault();
          handleDownArrow();
          break;
        case "ArrowUp" || 38:
          e.preventDefault();
          handleUpArrow();
          break;
        case "Escape" || 27:
          closeDropdownHandler();
          toggleRef.current.focus();
          break;
        case "Enter" || 13:
          e.preventDefault();
          handleSelect(items[selected], selected);
          closeDropdownHandler();
          break;
        default:
          return e.key;
      }
      return;
    }

    switch (keyPressed) {
      case "ArrowDown" || 40:
        e.preventDefault();
        handleOpen(e);
        break;
      case "Enter" || 13:
        e.preventDefault();
        handleOpen(e);
        break;
      default:
        return;
    }
  };

  const closeDropdownHandler = e => {
    closeDropDown && closeDropDown(e);
    isOpen && toggleRef.current.focus();
  };

  useEffect(() => {
    elRef.current[selected].current.focus();
    return () => {
      console.log(selected);
    };
  }, [selected]);

  useEffect(() => {
    document.body.addEventListener("click", closeDropdownHandler);
    return () =>
      document.body.removeEventListener("click", closeDropdownHandler);
  });

  useEffect(() => {
    elRef.current[selected].current.focus();
    return;
  }, [isOpen]);

  return (
    <>
      <DropDown>
        <DropdownToggle
          click={e => handleOpen(e)}
          keyDown={e => handleKeys(e)}
          ref={toggleRef}
          labelledby="sizeSelectLabel"
          expanded={isOpen}>
          {selectedItem ? (
            selectedItem
          ) : (
            <p id="sizeSelectLabel">Select Size</p>
          )}
        </DropdownToggle>
        <DropDownMenu
          keyDown={e => handleKeys(e)}
          show={isOpen}
          id="sizeSelectMenu"
          aria-labelledby="sizeSelectLabel">
          {items.map((item, i) => (
            <React.Fragment key={i}>
              <DropdownItem
                href="#"
                reference={elRef.current[i]}
                click={() => handleSelect(item, i)}
                aria-selected={i === selected}
                role="option">
                {item}
              </DropdownItem>
            </React.Fragment>
          ))}
        </DropDownMenu>
      </DropDown>
      You are focusing: {selected}
    </>
  );
};

export default FakeProduct;
