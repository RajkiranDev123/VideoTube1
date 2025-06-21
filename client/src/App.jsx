import { useState } from 'react'
import { Toaster } from 'react-hot-toast'


import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
function App() {



  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />

      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Dashboard />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
