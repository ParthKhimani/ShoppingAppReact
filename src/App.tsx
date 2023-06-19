import * as React from "react";
import Navbar from "./Components/Navbar";
import Category from "./Components/Category";
import Products from "./Components/Products";
import PriceRange from "./Components/PriceRange";
import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <div className="center">
        <Category />
        <PriceRange />
      </div>
    </>
  );
};

export default App;
