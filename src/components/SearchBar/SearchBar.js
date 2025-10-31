import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { TextField, Autocomplete, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { getActiveSearchProducts } from '../../redux/actions/productActions';
import debounce from 'lodash.debounce';
import Loader from '../Loader/Loader';
const SearchBar = ({ width }) => {
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchResults, loading, error } = useSelector(state => state.productsState);
  const primaryColor = "#4C348C";

  // Debounced search function to avoid too many calls
  const debouncedSearch = React.useMemo(
    () => debounce((query) => {
    if (query && query.length >= 2) {
        dispatch(getActiveSearchProducts(query));
      }
    }, 400),
    [dispatch]
  );

  useEffect(() => {
    if (inputValue === "") {
      // Clear results or reset if needed
      // You might want to dispatch an action to clear search results here
      // dispatch(clearSearchResults());
      return;
    }
    debouncedSearch(inputValue);

    // Cleanup on unmount or inputValue change
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue, debouncedSearch]);

  // Navigate to product page or category when selecting an option
  const handleOptionSelect = (event, newValue) => {
    
    setValue(newValue);
    if (newValue) {
      if (newValue.slug) {
        navigate(`/${newValue.category}${newValue.subCategory ? `/${newValue.subCategory}` : ''}/${newValue.slug}`);
      } else if (newValue.link) {
        navigate(`/${newValue.category}${newValue.subCategory ? `/${newValue.subCategory}` : ''}`);
      }
    }
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleOptionSelect}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
      options={searchResults || []}
      getOptionLabel={(option) => option.productName || option.label || ""}
      loading={loading}
      noOptionsText={loading ? <Loader/> : "No products found"}
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
                <IconButton 
                // onClick={handleSearchClick} 
                aria-label="search">
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
