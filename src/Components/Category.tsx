import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const SelectAutoWidth = () => {
  const [age, setAge] = React.useState("");

  React.useEffect(()=>{
    fetch("http://localhost:4444/getData", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body: JSON.stringify(""),
    })
      .then((response) => response.json())
      .then((category) => {
        console.log(category);
      });
  },[])

  const handleChange = (event: SelectChangeEvent) => {
    
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 2, minWidth: 80, width: "14%" }}>
        <InputLabel id="demo-simple-select-autowidth-label">
          Category
        </InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={age}
          onChange={handleChange}
          autoWidth
          label="Category"
        >
          <MenuItem value="">
            <em>-Select Category-</em>
          </MenuItem>
          <MenuItem value={10}>Twenty</MenuItem>
          <MenuItem value={21}>Twenty one</MenuItem>
          <MenuItem value={22}>Twenty one and a half</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};
export default SelectAutoWidth;
