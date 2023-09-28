import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface CategoryProps {
  sendCategory: (data: string) => void;
}

const Category: React.FC<CategoryProps> = ({ sendCategory }) => {
  const [category, setCategory] = useState({ category: "" });
  const [productsCategory, setProductsCategory] = useState<string[]>([]);

  React.useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/getCategory`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        setProductsCategory(result.productsCategory);
      });
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    const category = event.target.value;
    setCategory({ category: category });
    sendCategory(category);
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
    </>
  );
};

export default Category;
