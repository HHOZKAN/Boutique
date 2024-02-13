import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
  name: "cart",
  initialState: {
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
      const exitstingItem = state.itemsList.find((item) => item.id === id)
      if (exitstingItem.quantity === 1) {
        state.itemsList = state.itemsList.filter((item) => item.id !== id)
        state.totalQuantity--
      } else {
        exitstingItem.quantity--
        exitstingItem.totalPrice -= exitstingItem.price
      }
    },
    saveShippingAddress(state, action) {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice.reducer