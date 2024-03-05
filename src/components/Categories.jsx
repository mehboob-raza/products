// Categories.js
import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectCategory } from '../store/productSlice';

const Categories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.products.data?.map((product) => product.category));
  const selectedCategory = useSelector((state) => state.products.selectedCategory);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCategoryClick = (category) => {
    dispatch(selectCategory(category === selectedCategory ? null : category));
  };

  return (
    <div>
      {Array.from(new Set(categories)).map((category) => (
        <Button
          key={category}
          onClick={() => handleCategoryClick(category)}
          disabled={selectedCategory === category}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default Categories;
