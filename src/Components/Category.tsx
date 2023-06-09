import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Category = () => {
  const [category, setCategory] = React.useState("");
  const [productsCategory, setProductsCategory] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:4444/getCategory", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((result) => {
        setProductsCategory(result.productsCategory);
      });
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
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
          value={category}
          onChange={handleChange}
          autoWidth
          label="Category"
        >
          <MenuItem value="">
            <em>-Select Category-</em>
          </MenuItem>
          {productsCategory.map((category, index) => (
            <MenuItem key={index} value={category}>
              {(category)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default Category;