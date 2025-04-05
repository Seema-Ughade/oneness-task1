
import { Provider } from "react-redux"
import { CartProvider } from "./components/contexts/CartContext"
import { NotificationProvider } from "./components/contexts/NotificationContext"
import store from "./store"

export default function AppProvider({ children }) {
  return (
    <Provider store={store}>
      <NotificationProvider>   
          <CartProvider>{children}</CartProvider>
      </NotificationProvider>
    </Provider>
  )
}

