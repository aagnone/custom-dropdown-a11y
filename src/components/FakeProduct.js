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

  //bringing in values from our fake context
  const {
    appState: { isOpen, items, selectedItem },
    toggleDropDown,
    selectItem
  } = useContext(FakeContext);

  //creates list of DOM refs to focus
  const elRef = useRef(items.map(() => createRef()));
  const toggleRef = useRef(null);

  const handleOpen = e => {
    //THIS DOESNT WORK...Need to focus the selected element when opened. or else the down arrow acts funky
    toggleDropDown(e, () => elRef.current[selected].current.focus());
  };

  // when you select the item what happens
  const handleSelect = (item, index) => {
    setSelected(index);
    selectItem(item);
  };

  const handleDownArrow = () => {
    selected < items.length - 1 && setSelected(selected + 1);
  };
  const handleUpArrow = () => {
    selected > 0 && setSelected(selected - 1);
  };

  const handleKeys = e => {
    if (isOpen) {
      switch (e.key) {
        case "ArrowDown":
          console.log("test");
          e.preventDefault();
          handleDownArrow();
          break;
        case "ArrowUp":
          e.preventDefault();
          handleUpArrow();
          break;
        case "Escape":
          toggleDropDown(e);
          break;
        case "Enter":
          handleSelect(items[selected], selected);
          break;
        default:
          return e.key;
      }
      return;
    }
    handleOpen(e);
  };

  useEffect(() => {
    elRef.current[selected].current.focus();
    return () => {
      console.log(selected);
    };
  }, [selected]);

  return (
    <>
      <DropDown>
        <DropdownToggle
          click={e => handleOpen(e)}
          keyDown={e => handleKeys(e)}
          ref={toggleRef}
          labelledby="selectLabel"
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
          aria-labelledby="selectLabel">
          {items.map((item, i) => (
            <React.Fragment key={i}>
              <DropdownItem
                ref={elRef.current[i]}
                click={() => handleSelect(item, i)}
                isSelected={i === selected}>
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
