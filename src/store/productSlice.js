import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';




export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
      const response = await axios.get('/api/products');
      console.log(response.data, 'response');
      return response.data;
      
  } catch (error) {
    throw Error('Error fetching products: ' + error.message);
  }
});


const productsSlice = createSlice({
    name: 'products',
  initialState: {
    data: [],
    selectedCategory: null,
    selectedFilter: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setFilter: (state, action) => {
      state.selectedFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
          state.data = action.payload;
        //   console.log(action.payload, 'action.payload');
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setProducts, setCategory, setFilter } = productsSlice.actions;
export default productsSlice.reducer;
