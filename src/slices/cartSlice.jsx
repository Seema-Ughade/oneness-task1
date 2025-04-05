// import { createSlice } from "@reduxjs/toolkit"

// // Initial state for the cart
// const initialState = {
//   items: [],
//   isLoading: false,
//   error: null,
// }

// // Create the cart slice with reducers
// export const cartSlice = createSlice({
//   name: "cart",
//   initialState,
//   reducers: {
//     addToCart: (state, action) => {
//       const existingItem = state.items.find((item) => item.id === action.payload.id)
//       if (existingItem) {
//         existingItem.quantity += action.payload.quantity || 1
//       } else {
//         state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 })
//       }
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter((item) => item.id !== action.payload)
//     },
//     updateQuantity: (state, action) => {
//       const { id, quantity } = action.payload
//       const item = state.items.find((item) => item.id === id)
//       if (item) {
//         item.quantity = quantity
//       }
//     },
//     clearCart: (state) => {
//       state.items = []
//     },
//   },
// })

// // Export the actions
// export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions

// // Export the reducer
// export default cartSlice.reducer




// cartSlice.js
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  isLoading: false,
  error: null,
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find((item) => item.id === action.payload.id)
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1
      } else {
        state.items.push({ ...action.payload, quantity: action.payload.quantity || 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find((item) => item.id === id)
      if (item) {
        item.quantity = quantity
      }
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions
export default cartSlice.reducer

