// App.js
import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import ProductCards from './components/ProductCards';
import Sidebar from './components/Sidebar';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './store/productSlice';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.data);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      <button onClick={handleSidebarToggle}>Open Sidebar</button>
      <Sidebar open={sidebarOpen} onClose={handleSidebarToggle} />

      <Container component='main' sx={{ mt: 2 }}>
        <Typography variant='h2'>Products</Typography>
        <ProductCards products={products} />
      </Container>
    </>
  );
}

export default App;
