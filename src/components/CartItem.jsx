
import { useCart } from "./contexts/CartContext"

const CartItem = ({ item }) => {
  const { updateCartItemQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return
    updateCartItemQuantity(item.id, newQuantity)
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b last:border-b-0 gap-4">
      <div className="relative h-20 w-20 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
        <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-grow">
        <h3 className="font-medium text-gray-800">{item.name}</h3>
        <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center space-x-1 border rounded-md">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1.5 rounded-l-md hover:bg-gray-100 text-gray-600"
          aria-label="Decrease quantity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>

        <span className="w-8 text-center text-sm">{item.quantity}</span>

        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1.5 rounded-r-md hover:bg-gray-100 text-gray-600"
          aria-label="Increase quantity"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      <div className="text-right sm:ml-4 w-full sm:w-auto flex justify-between sm:block">
        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>

        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 text-sm flex items-center mt-1"
          aria-label="Remove item"
        >
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          <span className="hidden sm:inline">Remove</span>
        </button>
      </div>
    </div>
  )
}

export default CartItem

