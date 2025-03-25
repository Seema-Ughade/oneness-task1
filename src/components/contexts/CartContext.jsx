
import { createContext, useContext, useReducer } from "react"

// Cart Context
const CartContext = createContext()

// Initial cart state
const initialCartState = {
  items: [],
  totalAmount: 0,
}

// Calculate total amount helper
const calculateTotalAmount = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0)
}

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const newItem = action.payload
      const existingItemIndex = state.items.findIndex((item) => item.id === newItem.id)

      let updatedItems

      if (existingItemIndex !== -1) {
        // Item already exists, update quantity
        updatedItems = [...state.items]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        }
      } else {
        // Add new item
        updatedItems = [...state.items, newItem]
      }

      return {
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems),
      }
    }

    case "UPDATE_CART_ITEM_QUANTITY": {
      const { id, quantity } = action.payload
      const itemIndex = state.items.findIndex((item) => item.id === id)

      if (itemIndex !== -1) {
        const updatedItems = [...state.items]
        updatedItems[itemIndex] = {
          ...updatedItems[itemIndex],
          quantity,
        }

        return {
          items: updatedItems,
          totalAmount: calculateTotalAmount(updatedItems),
        }
      }
      return state
    }

    case "REMOVE_FROM_CART": {
      const id = action.payload
      const updatedItems = state.items.filter((item) => item.id !== id)

      return {
        items: updatedItems,
        totalAmount: calculateTotalAmount(updatedItems),
      }
    }

    case "CLEAR_CART": {
      return initialCartState
    }

    default:
      return state
  }
}

// Cart Provider Component
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState)

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", payload: item })
  }

  const updateCartItemQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_CART_ITEM_QUANTITY", payload: { id, quantity } })
  }

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
  }

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
}

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

