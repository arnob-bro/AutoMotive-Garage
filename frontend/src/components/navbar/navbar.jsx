import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaBell, FaShoppingCart, FaCar, FaUserShield, FaSignOutAlt } from 'react-icons/fa';
import './navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.user-dropdown-wrapper')) {
        setDropdownOpen(false);
      }
      if (notificationOpen && !event.target.closest('.notification-wrapper')) {
        setNotificationOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen, notificationOpen]);

  const handleLogout = () => {
    // Will implement actual logout logic later
    setDropdownOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <div className="logo-icon">
            <FaCar />
          </div>
          <div className="logo-text">
            <span>AutoMotive</span>
            <span className="logo-highlight">Pro</span>
          </div>
        </Link>

        <div className="nav-menu">
          <div className="nav-links-container">
            <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>
              Services
            </Link>
            <Link to="/parts" className={`nav-link ${location.pathname === '/parts' ? 'active' : ''}`}>
              Parts
            </Link>
            <Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>
              About
            </Link>
            <Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>
              Contact
            </Link>
          </div>

          <div className="nav-actions">
            <div className="notification-wrapper">
              <button 
                className="nav-action-button"
                onClick={() => setNotificationOpen(!notificationOpen)}
              >
                <FaBell className="action-icon" />
                <span className="notification-badge">3</span>
              </button>
              
              {notificationOpen && (
                <div className="notification-dropdown">
                  <div className="notification-header">
                    <h4>Notifications</h4>
                    <button className="mark-all-read">Mark all as read</button>
                  </div>
                  <div className="notification-list">
                    <div className="notification-item unread">
                      <div className="notification-icon">
                        <FaShoppingCart />
                      </div>
                      <div className="notification-content">
                        <p>Your service appointment is confirmed for tomorrow at 10 AM</p>
                        <span className="notification-time">2 hours ago</span>
                      </div>
                    </div>
                    <div className="notification-item">
                      <div className="notification-icon">
                        <FaShoppingCart />
                      </div>
                      <div className="notification-content">
                        <p>Your order #12345 has been shipped</p>
                        <span className="notification-time">1 day ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="notification-footer">
                    <Link to="/notifications">View all notifications</Link>
                  </div>
                </div>
              )}
            </div>

            <div className="user-dropdown-wrapper">
              <button 
                className="nav-action-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FaUser className="action-icon" />
                <span>Account</span>
              </button>

              {dropdownOpen && (
                <div className="user-dropdown">
                  <Link to="/account" className="dropdown-item">
                    <FaUser className="dropdown-icon" />
                    My Account
                  </Link>
                  <Link to="/admin" className="dropdown-item">
                    <FaUserShield className="dropdown-icon" />
                    Admin
                  </Link>
                  <Link to="/login" className="dropdown-item">
                    <FaUser className="dropdown-icon" />
                    Login
                  </Link>
                  <button onClick={handleLogout} className="dropdown-item logout">
                    <span>Logout</span>
                    <FaSignOutAlt className="logout-icon" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div 
          className={`mobile-menu-icon ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
          <div className="menu-bar"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;