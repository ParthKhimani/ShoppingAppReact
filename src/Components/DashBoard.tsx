import * as React from "react";
import Navbar from "../Components/Navbar";
import Category from "../Components/Category";
import Products from "../Components/Products";
import PriceRange from "../Components/PriceRange";
import PaymentHistory from "./PaymentHistory";

interface Product {
  _id: string;
  productName: string;
  productPrice: number;
  productCategory: string;
  productQuantity: number;
}

interface Response {
  products: Product[];
}

const DashBoard = () => {
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
    let url = `${process.env.REACT_APP_BASE_URL}/getData`;

    if (filter.category !== "" || filter.priceRange !== "") {
      url = `${process.env.REACT_APP_BASE_URL}/setFilter`;
    }

    fetch(url, {
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
  }, [filter]);

  return (
    <>
      <Navbar />
      <div className="right">
        <PaymentHistory />
      </div>
      <div className="center">
        <Category sendCategory={handleCategoryFilter} />
        <PriceRange sendPriceRange={handlePriceRangeFilter} />
      </div>
      <Products products={products} />
    </>
  );
};

export default DashBoard;
