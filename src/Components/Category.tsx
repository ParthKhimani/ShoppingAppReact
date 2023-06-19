import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Products from "./Products";

interface Product {
  productName: string;
  productPrice: number;
  productCategory: string;
}

interface Response {
  products: Product[];
}

const Category = () => {
  const [category, setCategory] = useState({ category: "" });
  const [productsCategory, setProductsCategory] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:4444/getCategory", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        setProductsCategory(result.productsCategory);
      });
  }, []);

  React.useEffect(() => {
    if (category.category !== "") {
      fetch("http://localhost:4444/setCategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify(category),
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
  }, [category]);

  const handleChange = (event: SelectChangeEvent) => {
    const newCategory = event.target.value;
    setCategory({ category: newCategory });
  };

  return (
    <>
      <FormControl sx={{ m: 2, minWidth: 80, width: "14%" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={category.category}
          onChange={handleChange}
          autoWidth
          label="Category"
        >
          <MenuItem value="">
            <em>-Select Category-</em>
          </MenuItem>
          {productsCategory.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Products products={products} />
    </>
  );
};

export default Category;
