import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './sidebar'

const AdminLayout = () => {
  return (
    <div className='flex min-h-screen w-full'>
        <AdminSidebar/>
        {/*  Admin Sidebar */}
        <div className="flex flex-1 flex-col">
            <main className="flex-1 flex bg-muted/40 p-4 md:p-6">
            <Outlet/>
            </main>
        </div>
    </div>
  )
}

export default AdminLayout