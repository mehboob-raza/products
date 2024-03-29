// ProductCards.js
import { Box, Card, Typography, Grid, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Categories from './Categories';
import SearchBar from './SearchField.jsx'; // Import the SearchBar component
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productSlice.js';

const ProductCards = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const selectedCategory = useSelector((state) => state.products.selectedCategory);
  const selectedFilter = useSelector((state) => state.products.selectedFilter);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filterProducts = () => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (selectedFilter === 'price') {
      filtered.sort((a, b) => a?.price - b?.price);
    } else if (selectedFilter === 'rating') {
      filtered.sort((a, b) => b?.rating - a?.rating);
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, selectedFilter, searchTerm]);

  return (
    <Box>
      <Container maxWidth='lg'>
        <Box display='flex' justifyContent='space-around' alignItems='center'>
          <Categories />
          <SearchBar onSearch={setSearchTerm} />
        </Box>
        <Box mt={8}>
          <Typography variant='h3' sx={{ mb: 4 }}> Products </Typography>
          <Grid container spacing={1}>
            {filteredProducts.map((product) => (
              <Grid item key={product.productId} md={4} sm={6} xs={12}>
                <Card
                  sx={{
                    width: '100%',
                    height: '220px',
                    position: 'relative'
                  }}
                >
                  <Box component='img' src={product?.imageUrl} alt='prod image' sx={{ width: '100%', height: '180px' }} />
                  <Box display='flex' gap={5} alignItems='center' position='absolute' bottom='10px'>
                    <Typography>{product?.productName}</Typography>
                    <Typography>Price: {product?.price}$</Typography>
                    <Typography>rating: {product?.rating}</Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductCards;
