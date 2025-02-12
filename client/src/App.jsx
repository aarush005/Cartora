import React from 'react'
import "./index.css"
import {  Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/layout'
import AuthLogin from './Pages/auth/login'
import AuthRegister from './Pages/auth/register'
import AdminLayout from './components/admin-view/layout'
import AdminDashboard from './Pages/admin-view/dashboard'
import AdminProducts from './Pages/admin-view/products'
import AdminOrders from './Pages/admin-view/orders'
import NotFound from './Pages/not-found'
import ShoppingLayout from './components/shopping-view/layout'
import ShoppingHome from './Pages/shopping-view/home'
import ShoppingListing from './Pages/shopping-view/listing'
import ShoppingCheckout from './Pages/shopping-view/checkout'
import ShoppingAccount from './Pages/shopping-view/account'
import CheckAuth from './components/common/check-auth'
import UnAuthPage from './Pages/unauth-page'


function App() {

  const isAuthenticated = true;
  const user = {
    name: 'John Doe',
    role:'user'
  };

  return (
    <>
      <div className='flex flex-col overflow-hidden bg-white'>
        <h1 className='text-red-600'>My App</h1>


        {/*  For the authentication it has child pages i.e, login and register */}
        <Routes>
          <Route path='/auth' element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout/>
            </CheckAuth>
          }>
          <Route path='login' element={<AuthLogin/>}/>
          <Route path='register' element={<AuthRegister/>}/>
          </Route>

          {/* Likewise For the admin panel we need to create child routes with will provide url like /admin/dashboard */}
          <Route path="/admin" element={
             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout/>
           </CheckAuth>
           
          }>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='products' element={<AdminProducts/>}/> 
          <Route path='orders ' element={<AdminOrders/>}/> 
          </Route>

          {/* Same Goes with the Shopping Area */}
          <Route path="/shop" element={
             <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
          }>
          <Route path='home' element={<ShoppingHome/>}/>
          <Route path='listing' element={<ShoppingListing/>}/>
          <Route path='checkout' element={<ShoppingCheckout/>}/>
          <Route path='account' element={<ShoppingAccount/>}/>
          </Route>

          <Route path="/unauth-page" element={<UnAuthPage/>}/>
          <Route path="*" element={<NotFound/>}/>

        </Routes>

      </div>
    </>
  )
}

export default App
