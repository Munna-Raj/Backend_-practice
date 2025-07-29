import { useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AdminNav from './component/AdminNav.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    heello
 <BrowserRouter>
      <AdminNav/>
  </BrowserRouter>
  </>
  )
}

export default App
