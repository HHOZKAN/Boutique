import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem('cart')) || {
    itemsList: [],
    totalQuantity: 0,
    shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || {},
  },

  reducers: {
    addToCart(state, action) {
      const newItem = action.payload

      //check item is already exits
      const exitsItem = state.itemsList.find((item) => item.id === newItem.id)

      if (exitsItem) {
        exitsItem.quantity++
        exitsItem.totalPrice += newItem.price
      } else {
        state.itemsList.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.name,
          cover: newItem.cover,
        })
      }
      state.totalQuantity++
    },
    removeFromCart(state, action) {
      const id = action.payload
      const existingItem = state.itemsList.find((item) => item.id === id)
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.itemsList = state.itemsList.filter((item) => item.id !== id)
        } else {
          existingItem.quantity--
          existingItem.totalPrice -= existingItem.price
        }
        state.totalQuantity--
      }
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    setCart: (state, action) => {
      state.itemsList = action.payload.itemsList;
      state.totalQuantity = action.payload.totalQuantity;
      state.shippingAddress = action.payload.shippingAddress;
    },
    resetCart: (state) => {
      state.itemsList = [];
      state.totalQuantity = 0;
      state.shippingAddress = {};
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer