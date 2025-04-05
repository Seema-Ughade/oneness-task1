
import { createContext, useContext, useState, useEffect } from "react"
import currencies from "../api/currencies" // ✅ Adjust path as needed

const CurrencyContext = createContext()

export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("USD")

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency")
    if (savedCurrency && currencies[savedCurrency]) {
      setSelectedCurrency(savedCurrency)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("currency", selectedCurrency)
  }, [selectedCurrency])

  const convertPrice = (priceInUSD) => {
    const rate = currencies[selectedCurrency].rate
    return priceInUSD * rate
  }

  const formatPrice = (price) => {
    const { symbol } = currencies[selectedCurrency]
    return selectedCurrency === "JPY"
      ? `${symbol}${Math.round(price)}`
      : `${symbol}${price.toFixed(2)}`
  }

  const formatCurrency = (priceInUSD) => {
    const convertedPrice = convertPrice(priceInUSD)
    return formatPrice(convertedPrice)
  }

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        setSelectedCurrency,
        currencies,
        convertPrice,
        formatPrice,
        formatCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  )
}

export const useCurrency = () => {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error("useCurrency must be used within a CurrencyProvider")
  }
  return context
}
