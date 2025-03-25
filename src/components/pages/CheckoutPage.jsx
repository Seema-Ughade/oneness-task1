
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../contexts/CartContext"
import { useNotification } from "../contexts/NotificationContext"
import CheckoutForm from "../CheckoutForm"
import OrderSummary from "../OrderSummary"
import ProgressBar from "../ProgressBar"
import api from "../api"

const CheckoutPage = () => {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const [couponCode, setCouponCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const { items, totalAmount, clearCart } = useCart()
  const { addNotification } = useNotification()
  const navigate = useNavigate()

  const handleCouponApply = (discount) => {
    setDiscount(discount)
  }

  const handleCheckout = async (paymentDetails) => {
    if (items.length === 0) return

    setLoading(true)
    setProgress(10)

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 300)

      // Process payment
      const orderData = {
        items,
        totalAmount: discount > 0 ? totalAmount - (totalAmount * discount) / 100 : totalAmount,
        paymentDetails,
        couponCode: couponCode || null,
      }

      const result = await api.processPayment(orderData)

      clearInterval(progressInterval)
      setProgress(100)

      // Clear cart after successful payment
      clearCart()

      // Show success notification
      addNotification("Order Confirmed", "Your payment was successful!", "success")

      // Redirect to success page
      setTimeout(() => {
        navigate("/checkout/success?orderId=" + result.orderId)
      }, 1000)
    } catch (err) {
      setError("Payment failed. Please try again.")
      addNotification("Payment Failed", err.message, "error")
      setProgress(0)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {loading && <ProgressBar progress={progress} />}

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CheckoutForm onSubmit={handleCheckout} loading={loading} />
        </div>

        <div className="lg:col-span-1">
          <OrderSummary items={items} totalAmount={totalAmount} discount={discount} onApplyCoupon={handleCouponApply} />
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

