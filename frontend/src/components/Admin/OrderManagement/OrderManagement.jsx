import React, { useState, useEffect } from 'react';
import { 
  FaShoppingCart, FaSearch, FaFilter, FaCalendarAlt, 
  FaTruck, FaCheckCircle, FaTimesCircle, FaPrint,
  FaEllipsisV, FaEye, FaEdit, FaTrash, FaArrowRight
} from 'react-icons/fa';
import './OrderManagement.css';

const OrderManagement = () => {
  // Sample order data
  const initialOrders = [
    {
      id: 'ORD-1001',
      customer: 'John Smith',
      date: '2023-08-15',
      items: [
        { name: 'Premium Brake Pads', quantity: 2, price: 59.99 },
        { name: 'Performance Air Filter', quantity: 1, price: 39.99 }
      ],
      total: 159.97,
      status: 'completed',
      payment: 'credit',
      shipping: 'standard',
      tracking: 'TRK12345678'
    },
    {
      id: 'ORD-1002',
      customer: 'Sarah Johnson',
      date: '2023-08-14',
      items: [
        { name: 'Synthetic Motor Oil 5W-30', quantity: 3, price: 34.99 }
      ],
      total: 104.97,
      status: 'shipped',
      payment: 'paypal',
      shipping: 'express',
      tracking: 'TRK87654321'
    },
    {
      id: 'ORD-1003',
      customer: 'Michael Brown',
      date: '2023-08-12',
      items: [
        { name: 'LED Headlight Bulbs', quantity: 1, price: 89.99 },
        { name: 'Car Battery', quantity: 1, price: 129.99 }
      ],
      total: 219.98,
      status: 'processing',
      payment: 'credit',
      shipping: 'standard',
      tracking: null
    },
    {
      id: 'ORD-1004',
      customer: 'Emily Davis',
      date: '2023-08-10',
      items: [
        { name: 'All-Season Tires', quantity: 4, price: 599.99 }
      ],
      total: 2399.96,
      status: 'cancelled',
      payment: 'credit',
      shipping: 'standard',
      tracking: null
    },
    {
      id: 'ORD-1005',
      customer: 'Robert Wilson',
      date: '2023-08-08',
      items: [
        { name: 'Diagnostic Scanner', quantity: 1, price: 99.99 },
        { name: 'Car Cover', quantity: 1, price: 149.99 }
      ],
      total: 249.98,
      status: 'completed',
      payment: 'paypal',
      shipping: 'standard',
      tracking: 'TRK13579246'
    }
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(null);

  const statusOptions = ['all', 'processing', 'shipped', 'completed', 'cancelled'];
  const dateOptions = ['all', 'today', 'week', 'month'];

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    
    const now = new Date();
    const orderDate = new Date(order.date);
    const matchesDate = filterDate === 'all' ||
                      (filterDate === 'today' && orderDate.toDateString() === now.toDateString()) ||
                      (filterDate === 'week' && (now - orderDate) <= 7 * 24 * 60 * 60 * 1000) ||
                      (filterDate === 'month' && orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear());
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch(status) {
      case 'completed':
        return { icon: <FaCheckCircle />, color: 'var(--success)', text: 'Completed' };
      case 'shipped':
        return { icon: <FaTruck />, color: 'var(--info)', text: 'Shipped' };
      case 'processing':
        return { icon: <FaEllipsisV />, color: 'var(--warning)', text: 'Processing' };
      case 'cancelled':
        return { icon: <FaTimesCircle />, color: 'var(--danger)', text: 'Cancelled' };
      default:
        return { icon: null, color: '', text: '' };
    }
  };

  // Open order details modal
  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  // Open edit order modal
  const openEditModal = (order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
    setIsActionMenuOpen(null);
  };

  // Update order status
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setIsEditModalOpen(false);
  };

  // Cancel order
  const cancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      setOrders(orders.map(order => 
        order.id === orderId ? { ...order, status: 'cancelled' } : order
      ));
    }
    setIsActionMenuOpen(null);
  };

  // Delete order
  const deleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order? This cannot be undone.')) {
      setOrders(orders.filter(order => order.id !== orderId));
    }
    setIsActionMenuOpen(null);
  };

  // Toggle action menu
  const toggleActionMenu = (orderId, e) => {
    e.stopPropagation();
    setIsActionMenuOpen(isActionMenuOpen === orderId ? null : orderId);
  };

  // Close all modals and menus
  const closeAll = () => {
    setIsDetailModalOpen(false);
    setIsEditModalOpen(false);
    setIsActionMenuOpen(null);
  };

  // Calculate order summary stats
  const orderStats = {
    total: orders.length,
    processing: orders.filter(o => o.status === 'processing').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders.filter(o => o.status !== 'cancelled').reduce((sum, order) => sum + order.total, 0)
  };

  return (
    <div className="order-management">
      <div className="order-header">
        <h1><FaShoppingCart /> Order Management</h1>
        <p>View and manage customer orders</p>
      </div>

      <div className="order-controls">
        <div className="search-filters">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <div className="filter-dropdown">
              <FaFilter className="filter-icon" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                {statusOptions.filter(s => s !== 'all').map(status => (
                  <option key={status} value={status}>
                    {getStatusInfo(status).text}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="filter-dropdown">
              <FaCalendarAlt className="filter-icon" />
              <select
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="order-stats">
        <div className="stat-card">
          <div className="stat-value">{orderStats.total}</div>
          <div className="stat-label">Total Orders</div>
        </div>
        <div className="stat-card processing">
          <div className="stat-value">{orderStats.processing}</div>
          <div className="stat-label">Processing</div>
        </div>
        <div className="stat-card shipped">
          <div className="stat-value">{orderStats.shipped}</div>
          <div className="stat-label">Shipped</div>
        </div>
        <div className="stat-card completed">
          <div className="stat-value">{orderStats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>
        <div className="stat-card cancelled">
          <div className="stat-value">{orderStats.cancelled}</div>
          <div className="stat-label">Cancelled</div>
        </div>
        <div className="stat-card revenue">
          <div className="stat-value">${orderStats.revenue.toFixed(2)}</div>
          <div className="stat-label">Total Revenue</div>
        </div>
      </div>

      <div className="orders-table">
        {filteredOrders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} onClick={() => openDetailModal(order)}>
                  <td className="order-id">{order.id}</td>
                  <td className="customer">{order.customer}</td>
                  <td className="date">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="items">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</td>
                  <td className="total">${order.total.toFixed(2)}</td>
                  <td className="payment">
                    <span className={`payment-method ${order.payment}`}>
                      {order.payment === 'credit' ? 'Credit Card' : 'PayPal'}
                    </span>
                  </td>
                  <td className="status">
                    <span className="status-badge" style={{ backgroundColor: getStatusInfo(order.status).color }}>
                      {getStatusInfo(order.status).icon}
                      {getStatusInfo(order.status).text}
                    </span>
                  </td>
                  <td className="actions" onClick={(e) => e.stopPropagation()}>
                    <div className="action-menu">
                      <button 
                        className="menu-toggle" 
                        onClick={(e) => toggleActionMenu(order.id, e)}
                      >
                        <FaEllipsisV />
                      </button>
                      {isActionMenuOpen === order.id && (
                        <div className="menu-dropdown">
                          <button onClick={() => openDetailModal(order)}>
                            <FaEye /> View Details
                          </button>
                          <button onClick={() => openEditModal(order)}>
                            <FaEdit /> Edit Status
                          </button>
                          {order.status !== 'cancelled' && (
                            <button onClick={() => cancelOrder(order.id)}>
                              <FaTimesCircle /> Cancel Order
                            </button>
                          )}
                          <button onClick={() => deleteOrder(order.id)}>
                            <FaTrash /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-orders">
            <p>No orders found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {isDetailModalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={closeAll}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Order Details: {selectedOrder.id}</h3>
              <button className="close-modal" onClick={closeAll}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="order-info">
                <div className="info-row">
                  <span className="info-label">Customer:</span>
                  <span className="info-value">{selectedOrder.customer}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Order Date:</span>
                  <span className="info-value">{new Date(selectedOrder.date).toLocaleDateString()}</span>
                </div>
                <div className="info-row">
                  <span className="info-label">Status:</span>
                  <span className="info-value">
                    <span className="status-badge" style={{ backgroundColor: getStatusInfo(selectedOrder.status).color }}>
                      {getStatusInfo(selectedOrder.status).icon}
                      {getStatusInfo(selectedOrder.status).text}
                    </span>
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Payment Method:</span>
                  <span className="info-value">
                    {selectedOrder.payment === 'credit' ? 'Credit Card' : 'PayPal'}
                  </span>
                </div>
                <div className="info-row">
                  <span className="info-label">Shipping Method:</span>
                  <span className="info-value">
                    {selectedOrder.shipping === 'express' ? 'Express Shipping' : 'Standard Shipping'}
                  </span>
                </div>
                {selectedOrder.tracking && (
                  <div className="info-row">
                    <span className="info-label">Tracking Number:</span>
                    <span className="info-value tracking">
                      {selectedOrder.tracking}
                      <button className="tracking-btn">
                        Track Package <FaArrowRight />
                      </button>
                    </span>
                  </div>
                )}
              </div>

              <div className="order-items">
                <h4>Order Items</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${item.price.toFixed(2)}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="order-summary">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>{selectedOrder.shipping === 'express' ? '$12.99' : 'Free'}</span>
                </div>
                <div className="summary-row">
                  <span>Tax:</span>
                  <span>${(selectedOrder.total * 0.07).toFixed(2)}</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${(selectedOrder.total * 1.07 + (selectedOrder.shipping === 'express' ? 12.99 : 0)).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="print-btn">
                <FaPrint /> Print Order
              </button>
              <button className="close-btn" onClick={closeAll}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {isEditModalOpen && selectedOrder && (
        <div className="modal-overlay" onClick={closeAll}>
          <div className="modal-container edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Order Status: {selectedOrder.id}</h3>
              <button className="close-modal" onClick={closeAll}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="current-status">
                <span>Current Status:</span>
                <span className="status-badge" style={{ backgroundColor: getStatusInfo(selectedOrder.status).color }}>
                  {getStatusInfo(selectedOrder.status).icon}
                  {getStatusInfo(selectedOrder.status).text}
                </span>
              </div>

              <div className="status-options">
                <h4>Update Status To:</h4>
                <div className="options-grid">
                  <button 
                    className={`status-option ${selectedOrder.status === 'processing' ? 'active' : ''}`}
                    onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                  >
                    <FaEllipsisV />
                    Processing
                  </button>
                  <button 
                    className={`status-option ${selectedOrder.status === 'shipped' ? 'active' : ''}`}
                    onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                    disabled={!selectedOrder.tracking}
                  >
                    <FaTruck />
                    Shipped
                  </button>
                  <button 
                    className={`status-option ${selectedOrder.status === 'completed' ? 'active' : ''}`}
                    onClick={() => updateOrderStatus(selectedOrder.id, 'completed')}
                  >
                    <FaCheckCircle />
                    Completed
                  </button>
                  <button 
                    className={`status-option ${selectedOrder.status === 'cancelled' ? 'active' : ''}`}
                    onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')}
                  >
                    <FaTimesCircle />
                    Cancelled
                  </button>
                </div>
              </div>

              {selectedOrder.status === 'shipped' && !selectedOrder.tracking && (
                <div className="tracking-input">
                  <label>Tracking Number:</label>
                  <input 
                    type="text" 
                    placeholder="Enter tracking number"
                  />
                  <button className="save-tracking">
                    Save Tracking
                  </button>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={closeAll}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderManagement;