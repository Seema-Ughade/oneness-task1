
import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "./contexts/CartContext"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { items } = useCart()

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    // <header className="bg-transparent backdrop-blur-md bg-purple-200/60 shadow-sm sticky top-0 z-10">
      <header className="bg-purple-200/40 backdrop-blur-md shadow-sm sticky top-0 z-10">

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-purple-500">
              ShopCart
            </Link>

            <nav className="hidden md:block ml-10">
              <ul className="flex space-x-8">
                <li>
                  <Link to="/" className="text-gray-700 hover:text-purple-500 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-gray-700 hover:text-purple-500 transition">
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/categories" className="text-gray-700 hover:text-purple-500 transition">
                    Categories
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-4">
            {isSearchOpen ? (
              <div className="flex items-center bg-gray-100 rounded-md px-3 py-1.5 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-transparent border-none outline-none text-sm w-full"
                  autoFocus
                />
                <button onClick={() => setIsSearchOpen(false)} className="ml-2 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-700 hover:text-blue-600 transition"
                aria-label="Search"
              >
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            )}

            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition" aria-label="Cart">
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
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <Link
              to="/account"
              className="p-2 hidden sm:block text-gray-700 hover:text-blue-600 transition"
              aria-label="Account"
            >
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </Link>

            <button
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className="block px-2 py-1 text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="block px-2 py-1 text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className="block px-2 py-1 text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  to="/account"
                  className="block px-2 py-1 text-gray-700 hover:text-blue-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Account
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar

