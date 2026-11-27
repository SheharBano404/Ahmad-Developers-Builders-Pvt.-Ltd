import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { CurrencyProvider } from './utils/currency'
import './styles/main.css'
createRoot(document.getElementById('root')).render(
  <React.StrictMode><BrowserRouter><CurrencyProvider><App /></CurrencyProvider></BrowserRouter></React.StrictMode>)
