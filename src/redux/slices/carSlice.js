import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const SHOW_CARS = 'car-rental/car/SHOW';
const SHOW_CAR = 'car-rental/car/SHOW/:id';
const ADD_CAR = 'car-rental/car/ADD';
const DELETE_CAR = 'car-rental/car/DELETE';

// Base Url
const BASE_URL = process.env.REACT_APP_BASE_URL;

// Create an async thunk to fetch data from an API endpoint
export const fetchCars = createAsyncThunk('extra/fetchCars', async () => {
  const response = await fetch('https://carapi.app/api/models');
  const data = await response.json();
  return data;
});

export const getCars = createAsyncThunk(SHOW_CARS, async (filter = null, thunkAPI) => {
  const API_URL = filter === true ? `${BASE_URL}/api/v1/cars?filter=true` : `${BASE_URL}/api/v1/cars`;
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axios.get(API_URL, requestOptions);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

export const getCar = createAsyncThunk(SHOW_CAR, async (id, thunkAPI) => {
  const API_URL = `${BASE_URL}/api/v1/cars/${id}`;
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axios.get(API_URL, requestOptions);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

// Method AddCar
export const addCar = createAsyncThunk(ADD_CAR, async (car, thunkAPI) => {
  const API_URL = `${BASE_URL}/api/v1/cars`;
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    return await axios.post(API_URL, car, requestOptions);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
});

// Method Delete Car
export const deleteCar = createAsyncThunk(DELETE_CAR, async (id, thunkAPI) => {
  const API_URL = `${BASE_URL}/api/v1/cars/${id}`;
  const token = localStorage.getItem('token');
  const requestOptions = {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await axios.delete(API_URL, requestOptions);
    return id;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.error);
  }
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
