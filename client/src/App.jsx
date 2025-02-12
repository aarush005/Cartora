import React from 'react'
import "./index.css"
import {  Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './Pages/auth/login'
import AuthRegister from './Pages/auth/register'

function App() {
  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white'>
        <h1 className='text-red-600'>My App</h1>
        <Routes>
          <Route path='/auth' element={<AuthLayout/>}>
          <Route path='login' element={<AuthLogin/>}/>
          <Route path='register' element={<AuthRegister/>}/>
          </Route>
        </Routes>

      </div>
    </>
  )
}

export default App
