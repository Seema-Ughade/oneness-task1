import { mockProducts } from "./mockData"

// Mock API functions
const api = {
  getProducts: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProducts)
      }, 500)
    })
  },

  getProductById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const product = mockProducts.find((p) => p.id === Number.parseInt(id))
        if (product) {
          resolve(product)
        } else {
          reject(new Error("Product not found"))
        }
      }, 300)
    })
  },

  processPayment: (orderData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate successful payment (90% success rate)
        if (Math.random() > 0.1) {
          resolve({
            success: true,
            orderId: "ORD-" + Math.floor(Math.random() * 10000),
            message: "Payment successful",
          })
        } else {
          reject(new Error("Payment failed. Please try again."))
        }
      }, 2000)
    })
  },

  applyCoupon: (code) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate coupon validation
        const validCoupons = {
          SAVE10: { discount: 10, message: "10% discount applied" },
          SAVE20: { discount: 20, message: "20% discount applied" },
          FREESHIP: { discount: 0, freeShipping: true, message: "Free shipping applied" },
        }

        if (validCoupons[code]) {
          resolve({
            success: true,
            ...validCoupons[code],
          })
        } else {
          reject(new Error("Invalid coupon code"))
        }
      }, 800)
    })
  },
}

export default api

