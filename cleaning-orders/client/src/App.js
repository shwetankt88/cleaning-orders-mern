import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import OrderForm from './pages/OrderForm';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import OrderDetail from './pages/OrderDetail';
import Success from './pages/Success';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  return token ? children : <Navigate to="/admin/login" />;
};

export default function App() {
  return (
    <Routes>
      {/* Public Order Form */}
      <Route path="/" element={<OrderForm />} />
      <Route path="/success" element={<Success />} />

      {/* Admin Routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={
        <PrivateRoute><AdminDashboard /></PrivateRoute>
      } />
      <Route path="/admin/orders/:id" element={
        <PrivateRoute><OrderDetail /></PrivateRoute>
      } />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
