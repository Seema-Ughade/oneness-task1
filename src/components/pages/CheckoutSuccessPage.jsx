

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrency, formatPrice, convertPrice } from "../../slices/currencySlice"

const CheckoutSuccessPage = () => {
  const [orderDetails, setOrderDetails] = useState(null)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const orderId = searchParams.get("orderId")
  const selectedCurrency = useSelector(selectCurrency)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate mock total price between 50 and 150
      const mockTotal = Math.random() * 100 + 50

      // Set mock order data
      setOrderDetails({
        id: orderId || "ORD-" + Math.floor(Math.random() * 10000),
        date: new Date().toLocaleDateString(),
        total: mockTotal,
        items: [
          {
            id: 1,
            name: "Premium Wireless Headphones",
            price: 129.99,
            quantity: 1,
          },
          {
            id: 2,
            name: "Smart Fitness Watch",
            price: 89.99,
            quantity: 1,
          },
        ],
      })
    }

    fetchOrderDetails()
  }, [orderId])

  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-white rounded-lg shadow-sm p-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-green-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase</p>

        {orderDetails ? (
          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h2 className="font-semibold text-lg mb-2">Order Details</h2>
            <p className="text-gray-700">Order ID: {orderDetails.id}</p>
            <p className="text-gray-700">Date: {orderDetails.date}</p>
            <p className="text-gray-700">
              Total:{" "}
              {formatPrice(
                convertPrice(orderDetails.total, selectedCurrency),
                selectedCurrency
              )}
            </p>

            {orderDetails.items && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="font-medium mb-2">Items Purchased</h3>
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-1">
                    <span>
                      {item.name} x{item.quantity}
                    </span>
                    <span>
                      {formatPrice(
                        convertPrice(item.price * item.quantity, selectedCurrency),
                        selectedCurrency
                      )}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="animate-pulse bg-gray-100 h-32 rounded-md mb-6"></div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition"
          >
            Continue Shopping
          </Link>
          <Link
            to="/orders"
            className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 transition"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSuccessPage

