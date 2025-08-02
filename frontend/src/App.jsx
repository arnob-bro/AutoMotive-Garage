import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import Login from './components/loginSignup/login';
import Register from './components/loginSignup/register';
import Services from './components/services/services';
import Parts from './components/parts/parts';
import Checkout from './components/parts/checkout';
import About from './components/about/about';
import ContactPage from './components/contactPage/contactPage';
import MyAccount from './components/userAccount/myAccount/myAccount';
import Profile from './components/userAccount/profile/profile';
import AdminPage from './components/Admin/AdminPage/AdminPage';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import AdminServices from './components/Admin/AdminServices/AdminServices';
import ServiceBookingManagement from './components/Admin/ServiceBookingManagement/ServiceBookingManagement';
import AdminPartsInventory from './components/Admin/AdminPartsInventory/AdminPartsInventory';
import OrderManagement from './components/Admin/OrderManagement/OrderManagement';
import AdminPaymentManagement from './components/Admin/AdminPaymentManagement/AdminPaymentManagement';
import AdminEmployeeManagement from './components/Admin/AdminEmployeeManagement/AdminEmployeeManagement';
import AdminUserManagement from './components/Admin/AdminUserManagement/AdminUserManagement';
import NotificationPage from './components/NotificationPage/NotificationPage';
import ManageReview from './components/Admin/ManageReview/ManageReview';
import ContactSupport from './components/Admin/ContactSupport/ContactSupport';
import FAQManagement from './components/Admin/ManageContents/FAQManagement/FAQManagement';
import EducationalArticleManagement from './components/Admin/ManageContents/EducationalArticleManagement/EducationalArticleManagement';
import PromotionalContentManagement from './components/Admin/ManageContents/PromotionalContentManagement/PromotionalContentManagement';


function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/parts" element={<Parts/>} />
          <Route path="/checkout" element={<Checkout/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/notifications" element={<NotificationPage/>} />
          <Route path="/account/*" element={<MyAccount />} />
          <Route path="/admin/*" element={<AdminPage />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="admin-services" element={<AdminServices />} />
            <Route path="bookings" element={<ServiceBookingManagement />} />
            <Route path="admin-parts" element={<AdminPartsInventory />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="admin-payments" element={<AdminPaymentManagement />} />
            <Route path="employees" element={<AdminEmployeeManagement />} />
            <Route path="users" element={<AdminUserManagement />} />
            <Route path="reviews" element={<ManageReview />} />
            <Route path="support" element={<ContactSupport />} />
            <Route path="content/faq" element={<FAQManagement />} />
            <Route path="content/articles" element={<EducationalArticleManagement />} />
            <Route path="content/promotional" element={<PromotionalContentManagement />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;