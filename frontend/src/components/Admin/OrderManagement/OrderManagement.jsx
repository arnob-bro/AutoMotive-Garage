import React, { useState } from 'react';
import { 
  FaShoppingCart, FaSearch, FaFilter, FaCalendarAlt, 
  FaTruck, FaCheckCircle, FaTimesCircle, 
  FaEllipsisV, FaEye, FaEdit, FaFilePdf
} from 'react-icons/fa';
import './OrderManagement.css';

const OrderManagement = () => {
  // Sample order data
  const initialOrders = [
    {
      id: 'ORD-1001',
      customer: 'John Smith',
      address: 'House 12, Road 5, Dhanmondi, Dhaka 1205',
      date: '2023-08-15',
      items: [
        { name: 'Premium Brake Pads', quantity: 2, price: 5999 },
        { name: 'Performance Air Filter', quantity: 1, price: 3999 }
      ],
      amount: 15997,
      tax: 1119.79,
      net: 17116.79,
      deliveryStatus: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'sslcommerz'
    },
    {
      id: 'ORD-1002',
      customer: 'Sarah Johnson',
      address: 'Flat A5, House 34, Gulshan 1, Dhaka 1212',
      date: '2023-08-14',
      items: [
        { name: 'Synthetic Motor Oil 5W-30', quantity: 3, price: 3499 }
      ],
      amount: 10497,
      tax: 734.79,
      net: 11231.79,
      deliveryStatus: 'shipped',
      paymentStatus: 'paid',
      paymentMethod: 'sslcommerz'
    },
    {
      id: 'ORD-1003',
      customer: 'Michael Brown',
      address: 'Road 9/A, House 45, Banani, Dhaka 1213',
      date: '2023-08-12',
      items: [
        { name: 'LED Headlight Bulbs', quantity: 1, price: 8999 },
        { name: 'Car Battery', quantity: 1, price: 12999 }
      ],
      amount: 21998,
      tax: 1539.86,
      net: 23537.86,
      deliveryStatus: 'processing',
      paymentStatus: 'pending',
      paymentMethod: 'cashondelivery'
    },
    {
      id: 'ORD-1004',
      customer: 'Emily Davis',
      address: 'House 56, Road 11, Uttara, Dhaka 1230',
      date: '2023-08-10',
      items: [
        { name: 'All-Season Tires', quantity: 4, price: 59999 }
      ],
      amount: 239996,
      tax: 16799.72,
      net: 256795.72,
      deliveryStatus: 'cancelled',
      paymentStatus: 'failed',
      paymentMethod: 'sslcommerz'
    },
    {
      id: 'ORD-1005',
      customer: 'Robert Wilson',
      address: 'Plot 15, Block C, Bashundhara R/A, Dhaka 1229',
      date: '2023-08-08',
      items: [
        { name: 'Diagnostic Scanner', quantity: 1, price: 9999 },
        { name: 'Car Cover', quantity: 1, price: 14999 }
      ],
      amount: 24998,
      tax: 1749.86,
      net: 26747.86,
      deliveryStatus: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'cashondelivery'
    }
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDeliveryStatus, setFilterDeliveryStatus] = useState('all');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(null);
  const [revenueTimeframe, setRevenueTimeframe] = useState('total');

  const deliveryStatusOptions = ['all', 'processing', 'shipped', 'delivered', 'cancelled'];
  const paymentStatusOptions = ['all', 'paid', 'pending', 'failed'];
  const dateOptions = ['all', 'today', 'week', 'month'];

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDeliveryStatus = filterDeliveryStatus === 'all' || order.deliveryStatus === filterDeliveryStatus;
    const matchesPaymentStatus = filterPaymentStatus === 'all' || order.paymentStatus === filterPaymentStatus;
    
    const now = new Date();
    const orderDate = new Date(order.date);
    const matchesDate = filterDate === 'all' ||
                      (filterDate === 'today' && orderDate.toDateString() === now.toDateString()) ||
                      (filterDate === 'week' && (now - orderDate) <= 7 * 24 * 60 * 60 * 1000) ||
                      (filterDate === 'month' && orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear());
    
    return matchesSearch && matchesDeliveryStatus && matchesPaymentStatus && matchesDate;
  });

  // Get delivery status icon and color
  const getDeliveryStatusInfo = (status) => {
    switch(status) {
      case 'delivered':
        return { icon: <FaCheckCircle />, color: '#2ecc71', text: 'Delivered' };
      case 'shipped':
        return { icon: <FaTruck />, color: '#3498db', text: 'Shipped' };
      case 'processing':
        return { icon: <FaEllipsisV />, color: '#f39c12', text: 'Processing' };
      case 'cancelled':
        return { icon: <FaTimesCircle />, color: '#e74c3c', text: 'Cancelled' };
      default:
        return { icon: null, color: '', text: '' };
    }
  };

  // Get payment status info
  const getPaymentStatusInfo = (status) => {
    switch(status) {
      case 'paid':
        return { color: '#2ecc71', text: 'Paid' };
      case 'pending':
        return { color: '#f39c12', text: 'Pending' };
      case 'failed':
        return { color: '#e74c3c', text: 'Failed' };
      default:
        return { color: '', text: '' };
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

  // Update delivery status
  const updateDeliveryStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, deliveryStatus: newStatus } : order
    ));
    setIsEditModalOpen(false);
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
    processing: orders.filter(o => o.deliveryStatus === 'processing').length,
    shipped: orders.filter(o => o.deliveryStatus === 'shipped').length,
    delivered: orders.filter(o => o.deliveryStatus === 'delivered').length,
    cancelled: orders.filter(o => o.deliveryStatus === 'cancelled').length,
    revenue: orders.filter(o => o.paymentStatus === 'paid').reduce((sum, order) => sum + order.net, 0),
    todayRevenue: orders.filter(o => {
      const orderDate = new Date(o.date);
      const today = new Date();
      return o.paymentStatus === 'paid' && orderDate.toDateString() === today.toDateString();
    }).reduce((sum, order) => sum + order.net, 0)
  };

  // Download PDF
  const downloadPDF = () => {
    alert('PDF download functionality would be implemented here');
  };

  return (
    <div className="om-order-management">
      <div className="om-order-header">
        <h1><FaShoppingCart /> Order Management</h1>
        <p>View and manage customer orders</p>
      </div>

      <div className="om-order-controls">
        <div className="om-search-box">
          <FaSearch className="om-search-icon" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="om-filter-group">
          <div className="om-filter-dropdown">
            <FaFilter className="om-filter-icon" />
            <select
              value={filterDeliveryStatus}
              onChange={(e) => setFilterDeliveryStatus(e.target.value)}
            >
              <option value="all">All Delivery Status</option>
              {deliveryStatusOptions.filter(s => s !== 'all').map(status => (
                <option key={status} value={status}>
                  {getDeliveryStatusInfo(status).text}
                </option>
              ))}
            </select>
          </div>
          
          <div className="om-filter-dropdown">
            <FaFilter className="om-filter-icon" />
            <select
              value={filterPaymentStatus}
              onChange={(e) => setFilterPaymentStatus(e.target.value)}
            >
              <option value="all">All Payment Status</option>
              {paymentStatusOptions.filter(s => s !== 'all').map(status => (
                <option key={status} value={status}>
                  {getPaymentStatusInfo(status).text}
                </option>
              ))}
            </select>
          </div>
          
          <div className="om-filter-dropdown">
            <FaCalendarAlt className="om-filter-icon" />
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

      <div className="om-order-stats">
        <div className="om-stat-card">
          <div className="om-stat-value">{orderStats.total}</div>
          <div className="om-stat-label">Total Orders</div>
        </div>
        <div className="om-stat-card">
          <div className="om-stat-value">{orderStats.processing}</div>
          <div className="om-stat-label">Processing</div>
        </div>
        <div className="om-stat-card">
          <div className="om-stat-value">{orderStats.shipped}</div>
          <div className="om-stat-label">Shipped</div>
        </div>
        <div className="om-stat-card">
          <div className="om-stat-value">{orderStats.delivered}</div>
          <div className="om-stat-label">Delivered</div>
        </div>
        <div className="om-stat-card">
          <div className="om-stat-value">{orderStats.cancelled}</div>
          <div className="om-stat-label">Cancelled</div>
        </div>
        <div className="om-stat-card om-revenue">
          <div className="om-stat-value">৳{revenueTimeframe === 'today' ? 
            orderStats.todayRevenue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) : 
            orderStats.revenue.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
          </div>
          <div className="om-stat-label">Total Revenue</div>
          <div className="om-revenue-options">
            <label>
              <input 
                type="radio" 
                name="revenueTimeframe" 
                value="today" 
                checked={revenueTimeframe === 'today'}
                onChange={() => setRevenueTimeframe('today')}
              /> Today
            </label>
            <label>
              <input 
                type="radio" 
                name="revenueTimeframe" 
                value="total" 
                checked={revenueTimeframe === 'total'}
                onChange={() => setRevenueTimeframe('total')}
              /> Total
            </label>
          </div>
        </div>
      </div>

      <div className="om-orders-table-container">
        {filteredOrders.length > 0 ? (
          <table className="om-orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Amount (৳)</th>
                <th>Tax (৳)</th>
                <th>Net (৳)</th>
                <th>Payment Method</th>
                <th>Delivery Status</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} onClick={() => openDetailModal(order)}>
                  <td className="om-order-id">{order.id}</td>
                  <td className="om-customer">{order.customer}</td>
                  <td className="om-date">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="om-items">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</td>
                  <td className="om-amount">৳{order.amount.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="om-tax">৳{order.tax.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="om-net">৳{order.net.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                  <td className="om-payment-method">
                    <span className={`om-payment-method-badge ${order.paymentMethod}`}>
                      {order.paymentMethod === 'sslcommerz' ? 'SSL Commerz' : 'Cash on Delivery'}
                    </span>
                  </td>
                  <td className="om-delivery-status">
                    <span className="om-status-badge" style={{ backgroundColor: getDeliveryStatusInfo(order.deliveryStatus).color }}>
                      {getDeliveryStatusInfo(order.deliveryStatus).icon}
                      {getDeliveryStatusInfo(order.deliveryStatus).text}
                    </span>
                  </td>
                  <td className="om-payment-status">
                    <span className="om-status-badge" style={{ backgroundColor: getPaymentStatusInfo(order.paymentStatus).color }}>
                      {getPaymentStatusInfo(order.paymentStatus).text}
                    </span>
                  </td>
                  <td className="om-actions" onClick={(e) => e.stopPropagation()}>
                    <div className="om-action-menu">
                      <button 
                        className="om-menu-toggle" 
                        onClick={(e) => toggleActionMenu(order.id, e)}
                      >
                        <FaEllipsisV />
                      </button>
                      {isActionMenuOpen === order.id && (
                        <div className="om-menu-dropdown">
                          <button onClick={() => openDetailModal(order)}>
                            <FaEye /> View Details
                          </button>
                          <button onClick={() => openEditModal(order)}>
                            <FaEdit /> Edit Status
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
          <div className="om-no-orders">
            <p>No orders found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Order Detail Modal */}
      {isDetailModalOpen && selectedOrder && (
        <div className="om-modal-overlay" onClick={closeAll}>
          <div className="om-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="om-modal-header">
              <h3>Order Details: {selectedOrder.id}</h3>
              <button className="om-close-modal" onClick={closeAll}>
                ×
              </button>
            </div>
            <div className="om-modal-body">
              <div className="om-order-info">
                <div className="om-info-row">
                  <span className="om-info-label">Customer:</span>
                  <span className="om-info-value">{selectedOrder.customer}</span>
                </div>
                <div className="om-info-row">
                  <span className="om-info-label">Address:</span>
                  <span className="om-info-value">{selectedOrder.address}</span>
                </div>
                <div className="om-info-row">
                  <span className="om-info-label">Order Date:</span>
                  <span className="om-info-value">{new Date(selectedOrder.date).toLocaleDateString()}</span>
                </div>
                <div className="om-info-row">
                  <span className="om-info-label">Delivery Status:</span>
                  <span className="om-info-value">
                    <span className="om-status-badge" style={{ backgroundColor: getDeliveryStatusInfo(selectedOrder.deliveryStatus).color }}>
                      {getDeliveryStatusInfo(selectedOrder.deliveryStatus).icon}
                      {getDeliveryStatusInfo(selectedOrder.deliveryStatus).text}
                    </span>
                  </span>
                </div>
                <div className="om-info-row">
                  <span className="om-info-label">Payment Method:</span>
                  <span className="om-info-value">
                    {selectedOrder.paymentMethod === 'sslcommerz' ? 'SSL Commerz' : 'Cash on Delivery'}
                  </span>
                </div>
                <div className="om-info-row">
                  <span className="om-info-label">Payment Status:</span>
                  <span className="om-info-value">
                    <span className="om-status-badge" style={{ backgroundColor: getPaymentStatusInfo(selectedOrder.paymentStatus).color }}>
                      {getPaymentStatusInfo(selectedOrder.paymentStatus).text}
                    </span>
                  </span>
                </div>
              </div>

              <div className="om-order-items">
                <h4>Order Items</h4>
                <table>
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price (৳)</th>
                      <th>Subtotal (৳)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.items.map((item, index) => (
                      <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>৳{(item.price / 100).toFixed(2)}</td>
                        <td>৳{(item.price * item.quantity / 100).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="om-order-summary">
                <div className="om-summary-row">
                  <span>Subtotal:</span>
                  <span>৳{(selectedOrder.amount / 100).toFixed(2)}</span>
                </div>
                <div className="om-summary-row">
                  <span>Tax (7%):</span>
                  <span>৳{(selectedOrder.tax / 100).toFixed(2)}</span>
                </div>
                <div className="om-summary-row om-total">
                  <span>Total:</span>
                  <span>৳{(selectedOrder.net / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="om-modal-footer">
              <button className="om-pdf-btn" onClick={downloadPDF}>
                <FaFilePdf /> Download PDF
              </button>
              <button className="om-close-btn" onClick={closeAll}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Order Modal */}
      {isEditModalOpen && selectedOrder && (
        <div className="om-modal-overlay" onClick={closeAll}>
          <div className="om-modal-container om-edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="om-modal-header">
              <h3>Update Delivery Status: {selectedOrder.id}</h3>
              <button className="om-close-modal" onClick={closeAll}>
                ×
              </button>
            </div>
            <div className="om-modal-body">
              <div className="om-current-status">
                <span>Current Status:</span>
                <span className="om-status-badge" style={{ backgroundColor: getDeliveryStatusInfo(selectedOrder.deliveryStatus).color }}>
                  {getDeliveryStatusInfo(selectedOrder.deliveryStatus).icon}
                  {getDeliveryStatusInfo(selectedOrder.deliveryStatus).text}
                </span>
              </div>

              <div className="om-status-options">
                <h4>Update Status To:</h4>
                <div className="om-options-grid">
                  <button 
                    className={`om-status-option ${selectedOrder.deliveryStatus === 'processing' ? 'om-active' : ''}`}
                    onClick={() => updateDeliveryStatus(selectedOrder.id, 'processing')}
                  >
                    <span className="om-status-icon"><FaEllipsisV /></span>
                    Processing
                  </button>
                  <button 
                    className={`om-status-option ${selectedOrder.deliveryStatus === 'shipped' ? 'om-active' : ''}`}
                    onClick={() => updateDeliveryStatus(selectedOrder.id, 'shipped')}
                  >
                    <span className="om-status-icon"><FaTruck /></span>
                    Shipped
                  </button>
                  <button 
                    className={`om-status-option ${selectedOrder.deliveryStatus === 'delivered' ? 'om-active' : ''}`}
                    onClick={() => updateDeliveryStatus(selectedOrder.id, 'delivered')}
                  >
                    <span className="om-status-icon"><FaCheckCircle /></span>
                    Delivered
                  </button>
                  <button 
                    className={`om-status-option ${selectedOrder.deliveryStatus === 'cancelled' ? 'om-active' : ''}`}
                    onClick={() => updateDeliveryStatus(selectedOrder.id, 'cancelled')}
                  >
                    <span className="om-status-icon"><FaTimesCircle /></span>
                    Cancelled
                  </button>
                </div>
              </div>
            </div>
            <div className="om-modal-footer">
              <button className="om-cancel-btn" onClick={closeAll}>
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