
import { useState } from "react"
import { useNotification } from "./contexts/NotificationContext"
import api from "../components/api"

const OrderSummary = ({ items, totalAmount, discount, onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState("")
  const [loading, setLoading] = useState(false)
  const { addNotification } = useNotification()

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const shippingCost = totalAmount > 100 ? 0 : 10
  const discountAmount = discount > 0 ? (totalAmount * discount) / 100 : 0
  const tax = (totalAmount - discountAmount) * 0.07 // 7% tax
  const finalTotal = totalAmount + shippingCost + tax - discountAmount

  const handleApplyCoupon = async () => {
    if (!couponCode) return

    setLoading(true)
    try {
      const result = await api.applyCoupon(couponCode)
      onApplyCoupon(result.discount)
      addNotification("Coupon Applied", result.message, "success")
    } catch (error) {
      addNotification("Error", error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span className="font-medium">${totalAmount.toFixed(2)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                />
              </svg>
              Discount ({discount}%)
            </span>
            <span>-${discountAmount.toFixed(2)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium">
            {shippingCost === 0 ? <span className="text-green-600">Free</span> : `$${shippingCost.toFixed(2)}`}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax (7%)</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Apply Coupon Code</label>
        <div className="flex">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-grow border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleApplyCoupon}
            disabled={loading || !couponCode}
            className="bg-gray-800 text-white px-4 py-2 rounded-r-md hover:bg-gray-900 transition flex items-center"
          >
            {loading ? (
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Apply"
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">Try "SAVE20" for 20% off</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium mb-2">Order Details</h3>
        <div className="max-h-40 overflow-y-auto space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span className="text-gray-600">
                {item.name} <span className="text-gray-400">x{item.quantity}</span>
              </span>
              <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderSummary

