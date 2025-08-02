import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  FaTachometerAlt, FaWrench, FaCalendarAlt, 
  FaBoxes, FaShoppingCart, FaCreditCard, 
  FaUsers, FaUserCog, FaSignOutAlt, FaChevronLeft, FaChevronRight,
  FaBars, FaTimes, FaStar, FaQuestionCircle, FaFileAlt, FaHeadset,
  FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import './AdminPage.css';

const AdminPage = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

  const adminMenu = [
    { id: 'dashboard', icon: <FaTachometerAlt />, label: 'Dashboard', path: '/admin/dashboard' },
    { id: 'service', icon: <FaWrench />, label: 'Services', path: '/admin/admin-services' },
    { id: 'booking', icon: <FaCalendarAlt />, label: 'Manage Bookings', path: '/admin/bookings' },
    { id: 'parts', icon: <FaBoxes />, label: 'Inventory', path: '/admin/admin-parts' },
    { id: 'orders', icon: <FaShoppingCart />, label: 'Manage Orders', path: '/admin/orders' },
    { id: 'users', icon: <FaUserCog />, label: 'Manage Customer', path: '/admin/users' },
    { id: 'reviews', icon: <FaStar />, label: 'Manage Review', path: '/admin/reviews' },
    { id: 'support', icon: <FaHeadset />, label: 'Contact Support', path: '/admin/support' },
    { 
      id: 'content', 
      icon: <FaFileAlt />, 
      label: 'Manage Content', 
      path: '/admin/content/faq',
      subItems: [
        { id: 'faq', label: 'FAQ Management', path: '/admin/content/faq' },
        { id: 'articles', label: 'Educational Article Management', path: '/admin/content/articles' },
        { id: 'promotional', label: 'Promotional Content Management', path: '/admin/content/promotional' }
      ]
    }
  ];

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

  const toggleMenu = (menuId) => {
    if (expandedMenu === menuId) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(menuId);
    }
  };

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
            <React.Fragment key={item.id}>
              <div
                className={`nav-item-container ${item.subItems ? 'has-submenu' : ''}`}
              >
                <Link
                  to={item.path}
                  className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                  onClick={(e) => {
                    if (item.subItems) {
                      e.preventDefault();
                      toggleMenu(item.id);
                    }
                    setMobileMenuOpen(false);
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!sidebarCollapsed && (
                    <>
                      <span className="nav-label">{item.label}</span>
                      {item.subItems && (
                        <span className="submenu-icon">
                          {expandedMenu === item.id ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                      )}
                    </>
                  )}
                  {sidebarCollapsed && <div className="nav-tooltip">{item.label}</div>}
                </Link>
                
                {/* Render sub-items if not collapsed */}
                {item.subItems && !sidebarCollapsed && expandedMenu === item.id && (
                  <div className="sub-items">
                    {item.subItems.map(subItem => (
                      <Link
                        key={subItem.id}
                        to={subItem.path}
                        className={`sub-item ${isActive(subItem.path) ? 'active' : ''}`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </React.Fragment>
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