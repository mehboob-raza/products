// SearchBar.js
import React, { useState, useEffect } from 'react';
import { InputBase, Button, Paper } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm.trim());
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  

  return (
    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search by title"
        value={searchTerm}
        onChange={handleInputChange}
      />
      
    </Paper>
  );
};

export default SearchBar;
