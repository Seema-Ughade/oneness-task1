
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  totalAmount: 0,
}

const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload
      const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id)

      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        state.items[existingItemIndex].quantity += newItem.quantity
      } else {
        // Add new item
        state.items.push(newItem)
      }

      state.totalAmount = calculateTotalAmount(state.items)
    },

    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const itemIndex = state.items.findIndex((item) => item.id === id)

      if (itemIndex !== -1) {
        state.items[itemIndex].quantity = quantity
        state.totalAmount = calculateTotalAmount(state.items)
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload
      state.items = state.items.filter((item) => item.id !== id)
      state.totalAmount = calculateTotalAmount(state.items)
    },

    clearCart: (state) => {
      state.items = []
      state.totalAmount = 0
    },
  },
})

export const { addToCart, updateCartItemQuantity, removeFromCart, clearCart } = cartSlice.actions

export default cartSlice.reducer

