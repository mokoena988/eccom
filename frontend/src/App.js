import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import PlaceOrderPage from './pages/PlaceOrderPage';
import ShippinPage from './pages/ShippinPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ProtectedRoute from './component/ProtectedRoute';
import AdminRoute from './component/AdminRoute';
import OrderListPage from './pages/OrderListPage';
import AdminUserList from './pages/AdminUserList';
import AdminUserEdit from './pages/AdminUserEdit';

function App() {
  return (
    <div>
      <BrowserRouter >

        <Routes>
          <Route path="/signin" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/shipping" element={<ShippinPage />} />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/orderhistory"
            element={
              <ProtectedRoute>
                <OrderHistoryPage />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin/orders"
            element={
              <AdminRoute>
                <OrderListPage />
              </AdminRoute>
            }
          ></Route>
          <Route path="/placeorder" element={<PlaceOrderPage />} />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUserList />
              </AdminRoute>
            }
          ></Route>
          <Route
            path="/admin/user/:id"
            element={
              <AdminRoute>
                <AdminUserEdit />
              </AdminRoute>
            }
          ></Route>

          <Route path="/" element={<HomePage />} />
        </Routes>

      </BrowserRouter>
    </div>
  )
}

export default App
