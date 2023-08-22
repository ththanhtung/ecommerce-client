import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Main from './page/Main'

const Cart = () => {
  return (
    <Routes>
        <Route index element={<Main/>}/>
    </Routes>
  )
}

export default Cart