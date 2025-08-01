import React, { useState } from 'react';
import { FaBell, FaCheck, FaTrash, FaFilter, FaSearch, FaRegBell } from 'react-icons/fa';
import './NotificationPage.css';

const NotificationPage = () => {
  // Sample notification data
  const allNotifications = [
    {
      id: 1,
      type: 'service',
      title: 'Service Appointment Confirmed',
      message: 'Your oil change service is confirmed for tomorrow at 10:00 AM',
      date: '2023-06-15',
      time: '09:30 AM',
      read: false,
      important: true
    },
    {
      id: 2,
      type: 'order',
      title: 'Order Shipped',
      message: 'Your order #12345 (Brake Pads) has been shipped and will arrive in 2-3 business days',
      date: '2023-06-14',
      time: '03:45 PM',
      read: true,
      important: false
    },
    {
      id: 3,
      type: 'payment',
      title: 'Payment Received',
      message: 'We have received your payment of $89.99 for service #SRV-102',
      date: '2023-06-14',
      time: '11:20 AM',
      read: true,
      important: false
    },
    {
      id: 4,
      type: 'promotion',
      title: 'Special Offer',
      message: 'Get 15% off on your next service. Use code: SUMMER15 at checkout',
      date: '2023-06-13',
      time: '10:00 AM',
      read: false,
      important: false
    },
    {
      id: 5,
      type: 'system',
      title: 'Account Update',
      message: 'Your account information has been successfully updated',
      date: '2023-06-12',
      time: '05:30 PM',
      read: true,
      important: false
    }
  ];

  const [notifications, setNotifications] = useState(allNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Available filters
  const filters = ['all', 'unread', 'important'];
  const types = ['all', 'service', 'order', 'payment', 'promotion', 'system'];

  // Filter notifications
  const filteredNotifications = allNotifications.filter(notification => {
    const matchesSearch = searchTerm === '' || 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = 
      (selectedFilter === 'all') ||
      (selectedFilter === 'unread' && !notification.read) ||
      (selectedFilter === 'important' && notification.important);
    
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

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
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
    <div className="notification-container">
      <div className="notification-header">
        <div className="header-content">
          <FaBell className="header-icon" />
          <h1>Notifications</h1>
          <span className="notification-count">{filteredNotifications.length}</span>
        </div>
        <p className="header-subtitle">Manage your notifications</p>
      </div>

      <div className="notification-toolbar">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-container">
          <div className="filter-group">
            <label>Filter:</label>
            <select 
              value={selectedFilter} 
              onChange={(e) => setSelectedFilter(e.target.value)}
            >
              {filters.map(filter => (
                <option key={filter} value={filter}>
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Type:</label>
            <select 
              value={selectedType} 
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {types.map(type => (
                <option key={type} value={type}>
                  {getTypeName(type)}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="mark-all-btn"
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
              className={`notification-card ${notification.read ? '' : 'unread'} ${notification.important ? 'important' : ''}`}
            >
              <div className="notification-type">
                <span className="type-icon">{getTypeIcon(notification.type)}</span>
                <span className="type-label">{getTypeName(notification.type)}</span>
              </div>
              
              <div className="notification-content">
                <div className="notification-header">
                  <h3>{notification.title}</h3>
                  <div className="notification-meta">
                    <span>{notification.date}</span>
                    <span>{notification.time}</span>
                  </div>
                </div>
                <p className="notification-message">{notification.message}</p>
              </div>
              
              <div className="notification-actions">
                {!notification.read && (
                  <button 
                    className="action-btn mark-read"
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <FaCheck />
                  </button>
                )}
                <button 
                  className="action-btn delete"
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete notification"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <FaRegBell className="empty-icon" />
            <h3>No notifications found</h3>
            <p>Try adjusting your filters or search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;