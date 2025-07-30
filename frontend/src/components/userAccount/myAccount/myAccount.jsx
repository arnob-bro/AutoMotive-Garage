import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
import { FaUser, FaHistory, FaShoppingBag, FaCreditCard, FaStar, FaQuestionCircle, FaSignOutAlt, FaCar } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import Profile from '../profile/profile';
import ServiceHistory from '../serviceHistory/ServiceHistory';
import PartsPurchase from '../partsPurchaseHistory/PartsPurchase'; 
import PaymentHistory from '../paymentHistory/PaymentHistory';
import SubmitReview from '../submitReview/SubmitReview';
import FAQ from '../faq/FAQ';
import './myAccount.css';

const MyAccount = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();

  // Sample user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2023',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  };

  const accountOptions = [
    { id: 'profile', icon: <FaUser />, label: 'My Profile', path: '/account/profile' },
    { id: 'service', icon: <FaHistory />, label: 'Service History', path: '/account/service-history' },
    { id: 'parts', icon: <FaShoppingBag />, label: 'Parts Purchase', path: '/account/parts-purchase' },
    { id: 'payment', icon: <FaCreditCard />, label: 'Payment History', path: '/account/payment-history' },
    { id: 'review', icon: <FaStar />, label: 'Submit Review', path: '/account/submit-review' },
    { id: 'faq', icon: <FaQuestionCircle />, label: 'FAQ', path: '/account/faq' },
  ];

  const handleLogout = () => {
    // Logout logic will be implemented later
    console.log('User logged out');
    setShowLogoutModal(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="my-account-page">
      {/* Hero Section */}
      <div className="account-hero">
        <div className="account-hero-content">
          <h6 className="hero-subtitle">Manage Account</h6>
          <h1 className="hero-title">My <span>Account</span></h1>
        </div>
      </div>

      <div className="account-container">
        <div className="user-profile-card">
          <div className="avatar-container">
            <img src={userData.avatar} alt="User Avatar" className="user-avatar" />
            <button className="edit-avatar">
              <MdOutlineEdit />
            </button>
          </div>
          <div className="user-info">
            <h2>{userData.name}</h2>
            <p>{userData.email}</p>
            <p>{userData.phone}</p>
            <p className="join-date">Member since {userData.joinDate}</p>
          </div>
        </div>

        <div className="account-content">
          <div className="account-sidebar">
            {accountOptions.map((option) => (
              <Link
                key={option.id}
                to={option.path}
                className={`sidebar-option ${isActive(option.path) ? 'active' : ''}`}
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-label">{option.label}</span>
              </Link>
            ))}
            
            <button 
              className="sidebar-option logout-option"
              onClick={() => setShowLogoutModal(true)}
            >
              <span className="option-icon"><FaSignOutAlt /></span>
              <span className="option-label">Logout</span>
            </button>
          </div>

          <div className="account-main">
            <Routes>
              <Route index element={<Profile userData={userData} />} />
              <Route path="profile" element={<Profile userData={userData} />} />
              <Route path="service-history" element={<ServiceHistory userData={userData} />} />
              <Route path="parts-purchase" element={<PartsPurchase userData={userData} />} />
              <Route path="payment-history" element={<PaymentHistory userData={userData} />} />
              <Route path="submit-review" element={<SubmitReview userData={userData} />} />
              <Route path="faq" element={<FAQ userData={userData} />} />
            </Routes>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="logout-modal">
            <h3>Confirm Logout</h3>
            <p>Are you sure you want to logout?</p>
            <div className="modal-actions">
              <button className="btn secondary-btn" onClick={() => setShowLogoutModal(false)}>
                No, Cancel
              </button>
              <button className="btn primary-btn" onClick={handleLogout}>
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyAccount;