import Navbar from "./Components/Navbar";
import Category from "./Components/Category";
import BasicGrid from "./Components/Products";
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
      <BasicGrid />
    </>
  );
};

export default App;
