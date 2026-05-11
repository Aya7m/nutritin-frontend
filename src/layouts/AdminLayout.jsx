import React from 'react'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <div className='min-h-screen'>
        {/* navbar */}
        <div></div>
        {/* content */}
        <div>
            <Outlet/>
        </div>
    </div>
  )
}

export default AdminLayout