
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import ProductList from "../ProductList"
import api from "../api"

const HomePage = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="h-10 w-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
<section className="bg-gradient-to-r from-orange-50 to-purple-100 text-gray-900 rounded-lg p-8 md:p-12 shadow-lg">
  <div className="max-w-3xl mx-auto text-center">
    <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to ShopCart</h1>
    <p className="text-lg md:text-xl mb-6 text-gray-700">Discover amazing products at great prices</p>
    <Link
      to="/products"
      className="inline-flex items-center bg-purple-600 text-white px-6 py-3 rounded-md font-medium hover:bg-purple-700 transition-all duration-300"
    >
      Shop Now
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 ml-2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </Link>
  </div>
</section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
        <ProductList products={products} />
      </section>

      <section className="bg-white/50 backdrop-blur-lg rounded-lg p-6 border border-gray-200 shadow-md">
  <div className="text-center">
    <h2 className="text-2xl font-semibold text-purple-700 mb-2">Free Shipping</h2>
    <p className="text-gray-700 mb-4">On all orders over $100</p>
    <Link to="/cart" className="text-purple-600 hover:text-purple-800 font-medium">
      View your cart
    </Link>
  </div>
</section>
    </div>
  )
}

export default HomePage

