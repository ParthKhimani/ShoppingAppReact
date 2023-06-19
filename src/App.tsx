import * as React from "react";
import Navbar from "./Components/Navbar";
import Category from "./Components/Category";
import Products from "./Components/Products";
import PriceRange from "./Components/PriceRange";
import "./App.css";

interface Product {
  productName: string;
  productPrice: number;
  productCategory: string;
}

interface Response {
  products: Product[];
}

const App = () => {
  const [filter, setFilter] = React.useState({ category: "", priceRange: "" });
  const [products, setProducts] = React.useState<Product[]>([]);
  const handleCategoryFilter = (category: string) => {
    setFilter((prevState) => ({
      ...prevState,
      category: category,
    }));
  };
  const handlePriceRangeFilter = (priceRange: string) => {
    setFilter((prevState) => ({
      ...prevState,
      priceRange: priceRange,
    }));
  };

  React.useEffect(() => {
    if (filter.category !== "" && filter.priceRange !== "") {
      fetch("http://localhost:4444/setFilter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(filter),
      })
        .then((response) => response.json())
        .then((result: Response) => {
          setProducts(result.products);
        });
    } else {
      fetch("http://localhost:4444/getData", {
        method: "POST",
      })
        .then((response) => response.json())
        .then((result: Response) => {
          setProducts(result.products);
        });
    }
  }, [filter]);

  return (
    <>
      <Navbar />
      <div className="center">
        <Category sendCategory={handleCategoryFilter} />
        <PriceRange sendPriceRange={handlePriceRangeFilter} />
      </div>
      <Products products={products} />
    </>
  );
};

export default App;
