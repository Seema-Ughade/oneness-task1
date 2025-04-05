
import { createSlice } from "@reduxjs/toolkit"

// Define available currencies with their symbols and conversion rates (relative to USD)
export const currencies = {
  USD: { symbol: "$", rate: 1, name: "US Dollar" },
  EUR: { symbol: "€", rate: 0.93, name: "Euro" },
  GBP: { symbol: "£", rate: 0.79, name: "British Pound" },
  JPY: { symbol: "¥", rate: 150.59, name: "Japanese Yen" },
  CAD: { symbol: "C$", rate: 1.37, name: "Canadian Dollar" },
  AUD: { symbol: "A$", rate: 1.52, name: "Australian Dollar" },
  INR: { symbol: "₹", rate: 83.12, name: "Indian Rupee" },
}

// Initialize state with saved currency from localStorage if available
const getInitialCurrency = () => {
  if (typeof window !== "undefined") {
    const savedCurrency = localStorage.getItem("currency")
    return savedCurrency && currencies[savedCurrency] ? savedCurrency : "USD"
  }
  return "USD"
}

const initialState = {
  selectedCurrency: getInitialCurrency(),
}

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.selectedCurrency = action.payload
      // Save to localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("currency", action.payload)
      }
    },
  },
})

// Export actions
export const { setCurrency } = currencySlice.actions

// Export selectors
export const selectCurrency = (state) => state.currency.selectedCurrency
export const selectCurrencyData = (state) => currencies[state.currency.selectedCurrency]

// Export utility functions
export const convertPrice = (priceInUSD, currencyCode) => {
  const rate = currencies[currencyCode].rate
  return priceInUSD * rate
}

export const formatPrice = (price, currencyCode) => {
  const { symbol } = currencies[currencyCode]

  if (currencyCode === "JPY") {
    return `${symbol}${Math.round(price)}`
  }

  return `${symbol}${price.toFixed(2)}`
}

// Helper function to convert and format in one step
export const formatCurrency = (state, priceInUSD) => {
  const currencyCode = selectCurrency(state)
  const convertedPrice = convertPrice(priceInUSD, currencyCode)
  return formatPrice(convertedPrice, currencyCode)
}

export default currencySlice.reducer

