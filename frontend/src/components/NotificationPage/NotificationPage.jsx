import React, { useState } from 'react';
import { FaBell, FaCheck, FaSearch, FaRegBell } from 'react-icons/fa';
import './NotificationPage.css';

const NotificationPage = () => {
  // Sample notification data with Bangladesh context
  const initialNotifications = [
    {
      id: 1,
      type: 'service',
      title: 'Service Appointment Confirmed',
      message: 'Your oil change service is confirmed for tomorrow at 10:00 AM at our Dhaka service center',
      date: '2023-06-15',
      time: '09:30 AM',
      read: false,
      important: true
    },
    {
      id: 2,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #12345 (Brake Pads) has been shipped from Chittagong and will arrive in 2-3 business days',
      date: '2023-06-14',
      time: '03:45 PM',
      read: true,
      important: false
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      message: 'We have received your payment of ৳89.99 for service #SRV-102',
      date: '2023-06-14',
      time: '11:20 AM',
      read: true,
      important: false
    },
    {
      id: 4,
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 15% off on your next service at our Sylhet branch. Use code: SUMMER15 at checkout',
      date: '2023-06-13',
      time: '10:00 AM',
      read: false,
      important: false
    },
    {
      id: 5,
      type: 'system',
      title: 'Account Update',
      message: 'Your account information has been successfully updated in our Bangladesh system',
      date: '2023-06-12',
      time: '05:30 PM',
      read: true,
      important: false
    }
  ];

  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  const filteredNotifications = notifications.filter(notification => {
    // Search term matching
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter matching
    const matchesFilter = 
      selectedFilter === 'all' ||
      (selectedFilter === 'unread' && !notification.read) ||
      (selectedFilter === 'important' && notification.important);
    
    // Type matching
    const matchesType = selectedType === 'all' || notification.type === selectedType;
    
    return matchesSearch && matchesFilter && matchesType;
  });

  const markAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? {...n, read: true} : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({...n, read: true})));
  };

  const getTypeIcon = (type) => {
    const icons = {
      service: '🔧',
      order: '📦',
      payment: '💳',
      promotion: '🎁',
      system: '⚙️'
    };
    return icons[type] || '🔔';
  };

  const getTypeName = (type) => {
    const names = {
      service: 'Service',
      order: 'Order',
      payment: 'Payment',
      promotion: 'Promotion',
      system: 'System'
    };
    return names[type] || 'Notification';
  };

  return (
    <div className="notification-page">
      <div className="notification-page-header">
        <div className="notification-header-content">
          <FaBell className="notification-header-icon" />
          <h1 className="notification-header-title">Notifications</h1>
          <span className="notification-count">{filteredNotifications.length}</span>
        </div>
        <p className="notification-header-subtitle">Manage your notifications</p>
      </div>

      <div className="notification-toolbar">
        <div className="notification-search-container">
          <FaSearch className="notification-search-icon" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="notification-search-input"
          />
        </div>

        <div className="notification-filter-container">
          <div className="notification-filter-group">
            <label className="notification-filter-label">Filter:</label>
            <select 
              value={selectedFilter} 
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="notification-filter-select"
            >
              <option value="all">All</option>
              <option value="unread">Unread</option>
              <option value="important">Important</option>
            </select>
          </div>

          <div className="notification-filter-group">
            <label className="notification-filter-label">Type:</label>
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
              className="notification-filter-select"
            >
              <option value="all">All</option>
              <option value="service">Service</option>
              <option value="order">Order</option>
              <option value="payment">Payment</option>
              <option value="promotion">Promotion</option>
              <option value="system">System</option>
            </select>
          </div>

          <button 
            className="notification-mark-all-btn"
            onClick={markAllAsRead}
            disabled={notifications.every(n => n.read)}
          >
            <FaCheck /> Mark all as read
          </button>
        </div>
      </div>

      <div className="notification-list">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map(notification => (
            <div 
              key={notification.id} 
              className={`notification-card ${!notification.read ? 'notification-unread' : ''} ${notification.important ? 'notification-important' : ''}`}
            >
              <div className="notification-card-type">
                <span className="notification-type-icon">{getTypeIcon(notification.type)}</span>
                <span className="notification-type-label">{getTypeName(notification.type)}</span>
              </div>
              
              <div className="notification-card-content">
                <div className="notification-card-header">
                  <h3 className="notification-card-title">{notification.title}</h3>
                  <div className="notification-card-meta">
                    <span className="notification-meta-date">{notification.date}</span>
                    <span className="notification-meta-time">{notification.time}</span>
                  </div>
                </div>
                <p className="notification-card-message">{notification.message}</p>
              </div>
              
              <div className="notification-card-actions">
                {!notification.read && (
                  <button 
                    className="notification-action-btn notification-mark-read"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <FaCheck />
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="notification-empty-state">
            <FaRegBell className="notification-empty-icon" />
            <h3 className="notification-empty-title">No notifications found</h3>
            <p className="notification-empty-text">Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;