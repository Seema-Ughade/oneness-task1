import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CartProvider } from "./components/contexts/CartContext"
import { NotificationProvider } from "./components/contexts/NotificationContext"
import Navbar from "./components/Navbar"
import ToastNotification from "./components/ToastNotification"
import HomePage from "./components/pages/HomePage"
import CartPage from "./components/pages/CartPage"
import CheckoutPage from "./components/pages/CheckoutPage"
import CheckoutSuccessPage from "./components/pages/CheckoutSuccessPage"

const App = () => {
  return (
    <Router>
      <CartProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/checkout/success" element={<CheckoutSuccessPage />} />
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <footer className="bg-white border-t py-6">
              <div className="container mx-auto px-4 text-center text-gray-500">
                © {new Date().getFullYear()} E-Commerce Store
              </div>
            </footer>
            <ToastNotification />
          </div>
        </NotificationProvider>
      </CartProvider>
    </Router>
  )
}

export default App

