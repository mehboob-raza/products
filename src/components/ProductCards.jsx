// ProductCards.js
import { Box, Card, Typography, Grid, Container } from '@mui/material';
import React, { useEffect } from 'react';
import Categories from './Categories';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../store/productSlice';

const ProductCards = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);
  const selectedCategory = useSelector((state) => state.products.selectedCategory);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products && selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <Box>
      <Container maxWidth='lg'>
        <Categories />
      <Box mt={8}>
        <Typography variant='h3' sx={{mb:4}}> Products </Typography>
      <Grid container spacing={1}>
        {filteredProducts.map((product) => (
          <Grid item key={product.productId} md={3} sm={4} xs={12}>
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
