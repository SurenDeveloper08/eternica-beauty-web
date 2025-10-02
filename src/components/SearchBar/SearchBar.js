
import React, { useState } from "react";
import { TextField, Autocomplete, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const products = [
  { label: "iPhone 14", category: "Mobiles" },
  { label: "Samsung Galaxy S23", category: "Mobiles" },
  { label: "Leather Jacket", category: "Fashion" },
  { label: "Office Chair", category: "Furnitures" },
  { label: "MacBook Pro", category: "Electronics" },
  { label: "AirPods", category: "Electronics" },
];

const SearchBar = ({width}) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const primaryColor = "#4C348C";

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      options={products}
      getOptionLabel={(option) => option.label}
      sx={{ width }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search products..."
          size="small"
          variant="outlined"
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#fff",
              color: primaryColor,
              borderColor: primaryColor,
              "& fieldset": {
                borderColor: primaryColor,
              },
              "&:hover fieldset": {
                borderColor: primaryColor,
              },
              "&.Mui-focused fieldset": {
                borderColor: primaryColor,
              },
            },
            "& .MuiInputBase-input": {
              color: primaryColor,
            },
            "& .MuiSvgIcon-root": {
              color: primaryColor,
            },
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit" aria-label="search">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default SearchBar;
