import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout/AdminLayout'
const AdminRoutes = () => {
    return (
        <Routes>
            <Route path="dashboard" element={<AdminLayout />} />
        </Routes>
    )
}

export default AdminRoutes