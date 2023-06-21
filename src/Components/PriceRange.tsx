import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface PriceRangeProps {
  sendPriceRange: (data: string) => void;
}

const PriceRange: React.FC<PriceRangeProps> = ({ sendPriceRange }) => {
  const [priceRange, setPriceRange] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    const priceRange = event.target.value;
    setPriceRange(priceRange);
    sendPriceRange(priceRange);
  };

  return (
    <>
      <FormControl sx={{ m: 2, minWidth: 80, width: "14%" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Price Range
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          onChange={handleChange}
          autoWidth
          label="Price Range"
          value={priceRange}
        >
          <MenuItem value="">
            <em>-Select Price Range-</em>
          </MenuItem>
          <MenuItem value="0-100">0-100</MenuItem>
          <MenuItem value="100-200">100-200</MenuItem>
          <MenuItem value="200-300">200-300</MenuItem>
          <MenuItem value="300-400">300-400</MenuItem>
          <MenuItem value="400-500">400-500</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default PriceRange;
