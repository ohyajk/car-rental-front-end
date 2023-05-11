import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create an async thunk to fetch data from an API endpoint
export const fetchCars = createAsyncThunk('extra/fetchCars', async () => {
  const response = await fetch('https://carapi.app/api/models');
  const data = await response.json();
  return data;
});

// Define the extra reducer with an initial state
const carSlice = createSlice({
  name: 'carSlice',
  initialState: { data: null, isLoading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending state of the async thunk
    builder.addCase(fetchCars.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    // Handle the fulfilled state of the async thunk
    builder.addCase(fetchCars.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    // Handle the rejected state of the async thunk
    builder.addCase(fetchCars.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export default carSlice.reducer;
