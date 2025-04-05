
// import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"
// import { selectCurrency, formatPrice, convertPrice } from "../slices/currencySlice"

// const CartSummary = () => {
//   const cartItems = useSelector((state) => state.cart.items || [])
//   const selectedCurrency = useSelector(selectCurrency)

//   // Filter only valid cart items
//   const validItems = cartItems.filter(
//     (item) => item && typeof item.price === "number" && typeof item.quantity === "number" && item.quantity > 0,
//   )

//   // Debug log
//   console.log("🛒 Valid Cart Items:", validItems)

//   const subtotal = validItems.reduce((total, item) => total + item.price * item.quantity, 0)
//   const shipping = subtotal > 100 ? 0 : 10
//   const tax = subtotal * 0.07
//   const total = subtotal + shipping + tax

//   // Convert all prices to the selected currency
//   const convertedSubtotal = convertPrice(subtotal, selectedCurrency)
//   const convertedShipping = shipping === 0 ? 0 : convertPrice(shipping, selectedCurrency)
//   const convertedTax = convertPrice(tax, selectedCurrency)
//   const convertedTotal = convertPrice(total, selectedCurrency)

//   return (
//     <div className="bg-gray-50 p-6 rounded-lg shadow-md">
//       <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
//       <div className="space-y-3">
//         <div className="flex justify-between text-gray-600">
//           <span>Subtotal</span>
//           <span>{formatPrice(convertedSubtotal, selectedCurrency)}</span>
//         </div>
//         <div className="flex justify-between text-gray-600">
//           <span>Shipping</span>
//           <span>{shipping === 0 ? "Free" : formatPrice(convertedShipping, selectedCurrency)}</span>
//         </div>
//         <div className="flex justify-between text-gray-600">
//           <span>Tax (7%)</span>
//           <span>{formatPrice(convertedTax, selectedCurrency)}</span>
//         </div>
//         <div className="border-t border-gray-200 pt-3 mt-3">
//           <div className="flex justify-between font-semibold text-lg text-gray-800">
//             <span>Total</span>
//             <span>{formatPrice(convertedTotal, selectedCurrency)}</span>
//           </div>
//         </div>
//       </div>
//       <div className="mt-6">
//         <Link
//           to="/checkout"
//           className={`w-full bg-purple-600 text-white py-3 px-4 rounded-md font-medium text-center block hover:bg-blue-700 transition-colors ${
//             validItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
//           }`}
//           onClick={(e) => {
//             if (validItems.length === 0) e.preventDefault()
//           }}
//         >
//           Proceed to Checkout
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default CartSummary

import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectCurrency, formatPrice, convertPrice } from "../slices/currencySlice"

const CartSummary = () => {
  const cartItems = useSelector((state) => state.cart.items || [])
  const selectedCurrency = useSelector(selectCurrency)

  const validItems = cartItems.filter(
    (item) =>
      item &&
      typeof item.price === "number" &&
      typeof item.quantity === "number" &&
      item.quantity > 0,
  )

  const subtotal = validItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 10
  const tax = subtotal * 0.07
  const total = subtotal + shipping + tax

  const convertedSubtotal = convertPrice(subtotal, selectedCurrency)
  const convertedShipping = shipping === 0 ? 0 : convertPrice(shipping, selectedCurrency)
  const convertedTax = convertPrice(tax, selectedCurrency)
  const convertedTotal = convertPrice(total, selectedCurrency)

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Order Summary</h2>

      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Subtotal</span>
          <span>{formatPrice(convertedSubtotal, selectedCurrency)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : formatPrice(convertedShipping, selectedCurrency)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>Tax (7%)</span>
          <span>{formatPrice(convertedTax, selectedCurrency)}</span>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between font-semibold text-lg text-gray-800">
            <span>Total</span>
            <span>{formatPrice(convertedTotal, selectedCurrency)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link
          to="/checkout"
          className={`block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 ${
            validItems.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={(e) => {
            if (validItems.length === 0) e.preventDefault()
          }}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  )
}

export default CartSummary
