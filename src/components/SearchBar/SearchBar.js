import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Autocomplete, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const products = [
  { label: "Carrier Oils and Base Oils", category: "Carrier-Oils", link: "Carrier-Oils" },
  { label: "Gym Wipes", category: "Gym-Wipes", link: "Gym-Wipes" },
  { label: "Dispenser", category: "Wipes", link: "Dispenser" },
];

const SearchBar = ({ width }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const primaryColor = "#4C348C";

  const handleOptionSelect = (event, newValue) => {
    setValue(newValue);
    if (newValue && newValue.link) {
      // navigate to product listing page
      navigate(`/category/${newValue.link}`);
    }
  };


  return (
    <Autocomplete
      value={value}
      onChange={handleOptionSelect}
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
                <IconButton type="submit" aria-label="search"
                  onClick={() => {
                    if (value && value.link) {
                      navigate(`/${value.link}`);
                    }
                  }}
                >
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
