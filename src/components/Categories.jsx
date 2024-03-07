import React, { useEffect } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setCategory } from '../store/productSlice.js';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.data?.map((product) => product.category));
  const selectedCategory = useSelector((state) => state.products.selectedCategory);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(setCategory(category === selectedCategory ? null : category));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="category-button"
        aria-controls="category-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {selectedCategory || 'Select Category'}
      </Button>
      <Menu
        id="category-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {Array.from(new Set(categories)).map((category) => (
          <MenuItem
            key={category}
            onClick={() => {
              handleCategoryClick(category);
              handleClose();
            }}
          >
            {category}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default Categories;
