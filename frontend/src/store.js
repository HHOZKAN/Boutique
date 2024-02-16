import { configureStore } from '@reduxjs/toolkit'
import dataReducer from '../features/dataSlice'
import userReducer from '../features/userSlice';
import cartReducer from '../features/cartSlice'
import { localStorageMiddleware } from './localStorageMiddleware';

export default configureStore({
  reducer: {
    data: dataReducer,
    user: userReducer,
    cart: cartReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageMiddleware),
})