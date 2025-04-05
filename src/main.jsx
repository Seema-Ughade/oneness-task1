import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Provider from "./provider.jsx" // 👈 make sure you're importing this

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider> {/* 👈 wrap your app here */}
      <App />
    </Provider>
  </StrictMode>,
)
