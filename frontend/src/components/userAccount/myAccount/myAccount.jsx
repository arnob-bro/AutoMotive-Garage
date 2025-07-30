import React, { useState } from 'react';
import { FaUser, FaHistory, FaShoppingBag, FaCreditCard, FaStar, FaQuestionCircle, FaSignOutAlt, FaCar } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import './myAccount.css';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Sample user data
  const userData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2023',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  };

  const accountOptions = [
    { id: 'profile', icon: <FaUser />, label: 'My Profile' },
    { id: 'service', icon: <FaHistory />, label: 'Service History' },
    { id: 'parts', icon: <FaShoppingBag />, label: 'Parts Purchase' },
    { id: 'payment', icon: <FaCreditCard />, label: 'Payment History' },
    { id: 'review', icon: <FaStar />, label: 'Submit Review' },
    { id: 'faq', icon: <FaQuestionCircle />, label: 'FAQ' },
  ];

  const handleLogout = () => {
    // Logout logic will be implemented later
    console.log('User logged out');
    setShowLogoutModal(false);
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
              <button
                key={option.id}
                className={`sidebar-option ${activeTab === option.id ? 'active' : ''}`}
                onClick={() => setActiveTab(option.id)}
              >
                <span className="option-icon">{option.icon}</span>
                <span className="option-label">{option.label}</span>
              </button>
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
            <div className="tab-content">
              <div className="welcome-message">
                <FaCar className="welcome-icon" />
                <h3>Welcome to Your AutoMotive Dashboard</h3>
                <p>Select an option from the sidebar to manage your account and vehicle services</p>
              </div>
            </div>
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