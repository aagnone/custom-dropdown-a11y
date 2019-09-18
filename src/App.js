import React from "react";
import FakeContextProvider from "./components/FakeContext";
import FakeProduct from "./components/FakeProduct";

const App = () => {
  return (
    <>
      <h1>Accessible Dropdown Study</h1>
      <FakeContextProvider>
        <FakeProduct />
      </FakeContextProvider>
    </>
  );
};

export default App;
