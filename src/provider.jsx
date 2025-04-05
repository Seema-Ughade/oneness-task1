
import { Provider } from "react-redux"
import { CartProvider } from "./components/contexts/CartContext"
import { NotificationProvider } from "./components/contexts/NotificationContext"
import { CurrencyProvider } from "./components/contexts/CurrencyContext"
import store from "./store"

export default function AppProvider({ children }) {
  return (
    <Provider store={store}>
      <NotificationProvider>   
        <CurrencyProvider>
          <CartProvider>{children}</CartProvider>
        </CurrencyProvider>
      </NotificationProvider>
    </Provider>
  )
}

