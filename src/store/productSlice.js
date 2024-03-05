import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

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
  initialState,
    reducers: {
      selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
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

export const { selectCategory } = productsSlice.actions;
export default productsSlice.reducer;
