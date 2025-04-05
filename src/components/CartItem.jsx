
// // import { useDispatch, useSelector } from "react-redux"
// // import { FaTrash, FaMinus, FaPlus } from "react-icons/fa"
// // import { removeFromCart, updateQuantity } from "../slices/cartSlice"
// // import { selectCurrency, formatPrice, convertPrice } from "../slices/currencySlice"

// // const CartItem = ({ item }) => {
// //   const dispatch = useDispatch()
// //   const selectedCurrency = useSelector(selectCurrency)

// //   const handleRemove = () => {
// //     dispatch(removeFromCart(item.id))
// //   }

// //   const handleIncreaseQuantity = () => {
// //     dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
// //   }

// //   const handleDecreaseQuantity = () => {
// //     if (item.quantity > 1) {
// //       dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
// //     } else {
// //       dispatch(removeFromCart(item.id))
// //     }
// //   }

// //   // Format prices using Redux currency utilities
// //   const itemPrice = formatPrice(convertPrice(item.price, selectedCurrency), selectedCurrency)
// //   const itemTotal = formatPrice(convertPrice(item.price * item.quantity, selectedCurrency), selectedCurrency)

// //   return (
// //     <div className="flex items-center py-4 border-b border-gray-200">
// //       <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md">
// //         <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
// //       </div>
// //       <div className="ml-4 flex-1">
// //         <h3 className="text-lg font-medium text-gray-800">{item.name}</h3>
// //         <p className="text-sm text-gray-500">{item.description}</p>
// //         <div className="flex items-center justify-between mt-2">
// //           <div className="flex items-center border rounded-md">
// //             <button onClick={handleDecreaseQuantity} className="px-2 py-1 text-gray-600 hover:text-gray-800">
// //               <FaMinus className="w-3 h-3" />
// //             </button>
// //             <span className="px-2 py-1 text-gray-800">{item.quantity}</span>
// //             <button onClick={handleIncreaseQuantity} className="px-2 py-1 text-gray-600 hover:text-gray-800">
// //               <FaPlus className="w-3 h-3" />
// //             </button>
// //           </div>
// //           <div className="flex items-center">
// //             <span className="text-lg font-medium text-gray-800 mr-4">{itemTotal}</span>
// //             <button onClick={handleRemove} className="text-red-500 hover:text-red-700">
// //               <FaTrash />
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }

// // export default CartItem

// import { useDispatch, useSelector } from "react-redux"
// import { FaTrash, FaMinus, FaPlus } from "react-icons/fa"
// import { removeFromCart, updateQuantity } from "../slices/cartSlice"
// import { selectCurrency, formatPrice, convertPrice } from "../slices/currencySlice"

// const CartItem = ({ item }) => {
//   const dispatch = useDispatch()
//   const selectedCurrency = useSelector(selectCurrency)

//   const handleRemove = () => {
//     dispatch(removeFromCart(item.id))
//   }

//   const handleIncreaseQuantity = () => {
//     dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))
//   }

//   const handleDecreaseQuantity = () => {
//     if (item.quantity > 1) {
//       dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))
//     } else {
//       dispatch(removeFromCart(item.id))
//     }
//   }

//   const itemPrice = formatPrice(convertPrice(item.price, selectedCurrency), selectedCurrency)
//   const itemTotal = formatPrice(convertPrice(item.price * item.quantity, selectedCurrency), selectedCurrency)

//   return (
//     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 py-4 border-b border-gray-200">
//       {/* Product Image */}
//       <div className="w-full sm:w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
//         <img
//           src={item.image || "/placeholder.svg"}
//           alt={item.name}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Product Info */}
//       <div className="flex-1 w-full">
//         <h3 className="text-base sm:text-lg font-medium text-gray-800">{item.name}</h3>
//         <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>

//         {/* Quantity & Price Actions */}
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-3 gap-4">
//           {/* Quantity Controls */}
//           <div className="flex items-center border rounded-md">
//             <button
//               onClick={handleDecreaseQuantity}
//               className="px-3 py-1 text-gray-600 hover:text-gray-800"
//             >
//               <FaMinus className="w-3 h-3" />
//             </button>
//             <span className="px-3 py-1 text-gray-800 font-medium">{item.quantity}</span>
//             <button
//               onClick={handleIncreaseQuantity}
//               className="px-3 py-1 text-gray-600 hover:text-gray-800"
//             >
//               <FaPlus className="w-3 h-3" />
//             </button>
//           </div>

//           {/* Price & Remove Button */}
//           <div className="flex items-center justify-between w-full sm:w-auto">
//             <span className="text-base sm:text-lg font-semibold text-gray-800 mr-4">{itemTotal}</span>
//             <button
//               onClick={handleRemove}
//               className="text-red-500 hover:text-red-700 transition"
//               title="Remove Item"
//             >
//               <FaTrash />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default CartItem
import { useDispatch, useSelector } from "react-redux";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import { removeFromCart, updateQuantity } from "../slices/cartSlice";
import { selectCurrency, formatPrice, convertPrice } from "../slices/currencySlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const selectedCurrency = useSelector(selectCurrency);

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  const itemPrice = formatPrice(convertPrice(item.price, selectedCurrency), selectedCurrency);
  const itemTotal = formatPrice(convertPrice(item.price * item.quantity, selectedCurrency), selectedCurrency);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 py-4 border-b border-gray-200">
      <div className="w-full sm:w-24 h-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-300 bg-white">
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="w-full sm:w-2/3">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800">{item.name}</h3>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
            <span className="text-sm text-gray-600 mt-2 block">{itemPrice}</span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-3 sm:mt-0">
            <div className="flex items-center border rounded-md">
              <button
                onClick={handleDecreaseQuantity}
                className="px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                <FaMinus className="w-3 h-3" />
              </button>
              <span className="px-4 py-2 text-gray-800">{item.quantity}</span>
              <button
                onClick={handleIncreaseQuantity}
                className="px-3 py-2 text-gray-600 hover:text-gray-900"
              >
                <FaPlus className="w-3 h-3" />
              </button>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto">
              <span className="text-lg font-semibold text-gray-900">{itemTotal}</span>
              <button
                onClick={handleRemove}
                className="text-red-500 hover:text-red-700 ml-4 sm:ml-6"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
