
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import CartItem from "../CartItem"
import CartSummary from "../CartSummary"

const CartPage = () => {
  const items = useSelector((state) => state.cart.items)

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400 mx-auto mb-4"
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
                <h2 className="text-2xl font-semibold text-gray-700">Your cart is empty</h2>
                <p className="text-gray-500 mt-2 mb-6">Looks like you haven't added anything to your cart yet.</p>
                <Link to="/" className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition">
                  Continue Shopping
                </Link>
              </div>
            ) : (
              items.map((item) => <CartItem key={item.id} item={item} />)
            )}
          </div>
        </div>

        <div className="lg:col-span-1">
          <CartSummary />
        </div>
      </div>
    </div>
  )
}

export default CartPage

