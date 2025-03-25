
import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"

const CheckoutSuccessPage = () => {
  const [orderDetails, setOrderDetails] = useState(null)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const orderId = searchParams.get("orderId")

  useEffect(() => {
    // In a real app, fetch order details from API
    const fetchOrderDetails = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setOrderDetails({
        id: orderId || "ORD-" + Math.floor(Math.random() * 10000),
        date: new Date().toLocaleDateString(),
        total: "$" + (Math.random() * 100 + 50).toFixed(2),
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
            <p className="text-gray-700">Total: {orderDetails.total}</p>
          </div>
        ) : (
          <div className="animate-pulse bg-gray-100 h-32 rounded-md mb-6"></div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
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

