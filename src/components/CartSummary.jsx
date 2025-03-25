
import { useNavigate } from "react-router-dom"
import { useCart } from "./contexts/CartContext"

const CartSummary = () => {
  const { items, totalAmount } = useCart()
  const navigate = useNavigate()

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)
  const shippingCost = totalAmount > 100 ? 0 : 10
  const tax = totalAmount * 0.07 // 7% tax
  const finalTotal = totalAmount + shippingCost + tax

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-300 mx-auto mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-700">Your cart is empty</h3>
        <p className="text-gray-500 text-sm mt-1 mb-4">Add some products to your cart</p>
        <button
          onClick={() => navigate("/")}
          className="inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal ({itemCount} items)</span>
          <span className="font-medium">${totalAmount.toFixed(2)}</span>
        </div>

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

      <button
        onClick={() => navigate("/checkout")}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md flex items-center justify-center hover:bg-blue-700 transition"
      >
        Proceed to Checkout
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 ml-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Free shipping on orders over $100</p>
        <p className="mt-2 text-xs text-gray-400">Secure payments with SSL encryption</p>
      </div>
    </div>
  )
}

export default CartSummary

