import { configureStore } from '@reduxjs/toolkit';
import carSlice from './slices/carSlice';

const storeConfig = configureStore({
  reducer: {
    cars: carSlice,
  },
});

export default storeConfig;
