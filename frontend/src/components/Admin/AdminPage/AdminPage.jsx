import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, FaWrench, FaCalendarAlt, 
  FaBoxes, FaShoppingCart, FaCreditCard, 
  FaUsers, FaUserCog, FaSignOutAlt, FaChevronLeft, FaChevronRight,
  FaBars, FaTimes
} from 'react-icons/fa';
import './AdminPage.css';

const AdminPage = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminMenu = [
    { id: 'dashboard', icon: <FaTachometerAlt />, label: 'Dashboard', path: '/admin/dashboard' },
    { id: 'service', icon: <FaWrench />, label: 'Services', path: '/admin/admin-services' },
    { id: 'booking', icon: <FaCalendarAlt />, label: 'Bookings', path: '/admin/bookings' },
    { id: 'parts', icon: <FaBoxes />, label: 'Inventory', path: '/admin/admin-parts' },
    { id: 'orders', icon: <FaShoppingCart />, label: 'Orders', path: '/admin/orders' },
    { id: 'payments', icon: <FaCreditCard />, label: 'Payments', path: '/admin/admin-payments' },
    { id: 'employees', icon: <FaUsers />, label: 'Team', path: '/admin/employees' },
    { id: 'users', icon: <FaUserCog />, label: 'User Management', path: '/admin/users' }
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <div className={`admin-app ${sidebarCollapsed ? 'sidebar-collapsed' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      {/* Mobile Header */}
      <header className="mobile-header">
        <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1 className="mobile-logo">GaragePro</h1>
      </header>

      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          {!sidebarCollapsed && (
            <div className="branding">
              <h2>GaragePro</h2>
              <span className="admin-badge">ADMIN</span>
            </div>
          )}
          <button 
            className="collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            aria-label={sidebarCollapsed ? "Expand menu" : "Collapse menu"}
          >
            {sidebarCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {adminMenu.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
              {sidebarCollapsed && <div className="nav-tooltip">{item.label}</div>}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={() => setShowLogoutModal(true)}>
            <FaSignOutAlt />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-content">
        <Outlet />
      </main>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Ready to leave?</h3>
            <p>Confirm you want to logout from the admin panel.</p>
            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowLogoutModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={() => {
                console.log('Admin logged out');
                setShowLogoutModal(false);
              }}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;