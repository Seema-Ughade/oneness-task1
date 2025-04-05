
import { useState, useRef, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrency, selectCurrency, currencies } from "../slices/currencySlice"
import { ChevronDown, ChevronUp } from "lucide-react"

const CurrencySelector = () => {
  const selectedCurrency = useSelector(selectCurrency)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleCurrencyChange = (currency) => {
    dispatch(setCurrency(currency))
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative w-fit" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-purple-100 hover:bg-purple-100 px-4 py-2 rounded-full text-sm font-medium text-gray-800 transition duration-150 border border-gray-300 shadow-sm"
      >
        <span>{currencies[selectedCurrency].symbol}</span>
        <span className="uppercase">{selectedCurrency}</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white w-60 rounded-xl shadow-xl border border-gray-200 z-50">
          <div className="max-h-64 overflow-y-auto py-2">
            {Object.keys(currencies).map((currency) => (
              <button
                key={currency}
                onClick={() => handleCurrencyChange(currency)}
                className={`flex justify-between items-center w-full px-4 py-2 text-sm transition hover:bg-purple-50 ${
                  selectedCurrency === currency
                    ? "bg-purple-100 text-purple-700 font-semibold"
                    : "text-gray-700"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{currencies[currency].symbol}</span>
                  <span className="uppercase">{currency}</span>
                </div>
                <span className="text-xs text-gray-500">{currencies[currency].name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default CurrencySelector
