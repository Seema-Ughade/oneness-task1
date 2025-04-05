
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { selectCurrency, formatPrice, convertPrice } from "../slices/currencySlice";
import { useNotification } from "./contexts/NotificationContext";

const ProductCard = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const selectedCurrency = useSelector(selectCurrency);
  const { addNotification } = useNotification(); // Add this line to use the notification context

  const handleAddToCart = () => {
    setIsAdding(true);

    setTimeout(() => {
      // Add to cart using Redux
      dispatch(addToCart({ ...product, quantity: 1 }));
      
      // Show notification using Context
      addNotification(
        "Added to Cart", 
        `${product.name} has been added to your cart.`, 
        "success"
      );

      setIsAdding(false);
      setIsAdded(true);

      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 500);
  };

  // Format the price with the selected currency
  const formattedPrice = formatPrice(convertPrice(product.price, selectedCurrency), selectedCurrency);

  return (
    <div className="bg-gradient-to-r from-orange-50 to-purple-100 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group border border-gray-200 p-4">
      <div className="relative h-48 sm:h-56 md:h-64 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={handleAddToCart}
            disabled={isAdding || isAdded}
            className={`rounded-full p-3 shadow-md ${
              isAdded ? "bg-green-500 text-white" : "bg-purple-600 text-white hover:bg-purple-700"
            } transition-colors`}
            aria-label="Add to cart"
          >
            {isAdding ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isAdded ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 truncate">{product.name}</h3>
        <p className="text-gray-700 text-sm mb-2">{product.category}</p>

        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-gray-900">{formattedPrice}</span>

          <button
            onClick={handleAddToCart}
            disabled={isAdding || isAdded}
            className={`rounded-md px-4 py-2 text-sm font-medium ${
              isAdded ? "bg-green-500 text-white" : "bg-purple-600 text-white hover:bg-purple-700"
            } transition-all duration-300`}
          >
            {isAdding ? "Adding..." : isAdded ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;