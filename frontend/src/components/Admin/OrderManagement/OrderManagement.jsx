import React, { useState, useEffect } from 'react';
import { 
  FaShoppingCart, FaSearch, FaFilter, FaCalendarAlt, 
  FaTruck, FaCheckCircle, FaTimesCircle, 
  FaEllipsisV, FaEye, FaEdit, FaFilePdf, FaSpinner
} from 'react-icons/fa';
import './OrderManagement.css';
import OrderApi from '../../../apis/orderApi'; // Import the OrderApi

const orderApi = new OrderApi();

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDeliveryStatus, setFilterDeliveryStatus] = useState('all');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isActionMenuOpen, setIsActionMenuOpen] = useState(null);
  const [revenueTimeframe, setRevenueTimeframe] = useState('total');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const deliveryStatusOptions = ['all', 'processing', 'shipped', 'delivered', 'cancelled'];
  const paymentStatusOptions = ['all', 'paid', 'pending', 'failed'];
  const dateOptions = ['all', 'today', 'week', 'month'];

  // Fetch orders from API
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await orderApi.getOrders({
        page: currentPage,
        limit: 10,
        searchTerm: searchTerm,
        status: filterDeliveryStatus !== 'all' ? filterDeliveryStatus : ''
      });

      if (response.success !== false) {
        setOrders(response.data || []);
        setPagination({
          page: response.page,
          limit: response.limit,
          total: response.total,
          totalPages: response.totalPages
        });
      } else {
        console.error('Failed to fetch orders');
        setOrders([]);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders on component mount and when filters change
  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchTerm, filterDeliveryStatus]);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setCurrentPage(1); // Reset to first page on search
      fetchOrders();
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Filter orders based on payment status and date (client-side filtering)
  const filteredOrders = orders.filter(order => {
    const matchesPaymentStatus = filterPaymentStatus === 'all' || order.payment_status === filterPaymentStatus;
    
    const now = new Date();
    const orderDate = new Date(order.created_at);
    const matchesDate = filterDate === 'all' ||
                      (filterDate === 'today' && orderDate.toDateString() === now.toDateString()) ||
                      (filterDate === 'week' && (now - orderDate) <= 7 * 24 * 60 * 60 * 1000) ||
                      (filterDate === 'month' && orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear());
    
    return matchesPaymentStatus && matchesDate;
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
        return { icon: null, color: '#666', text: status || 'Unknown' };
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
        return { color: '#666', text: status || 'Unknown' };
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

  // Update delivery status using API
  const updateDeliveryStatus = async (orderId, newStatus) => {
    try {
      const response = await orderApi.updateOrderStatus(orderId, newStatus);
      if (response.success) {
        // Update local state
        setOrders(orders.map(order => 
          order.order_id === orderId ? { ...order, status: newStatus } : order
        ));
        setIsEditModalOpen(false);
        
        // Show success message
        alert(`Order status updated to ${newStatus}`);
      } else {
        alert('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Failed to update order status');
    }
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
    delivered: orders.filter(o => o.status === 'delivered').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders.filter(o => o.payment_status === 'paid').reduce((sum, order) => sum + parseFloat(order.net_amount || 0), 0),
    todayRevenue: orders.filter(o => {
      const orderDate = new Date(o.created_at);
      const today = new Date();
      return o.payment_status === 'paid' && orderDate.toDateString() === today.toDateString();
    }).reduce((sum, order) => sum + parseFloat(order.net_amount || 0), 0)
  };

  // Download PDF
  const downloadPDF = () => {
    alert('PDF download functionality would be implemented here');
  };

  if (loading) {
    return (
      <div className="om-order-management">
        <div className="om-loading">
          <FaSpinner className="om-spinner" />
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

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
          <>
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
                  <tr key={order.order_id} onClick={() => openDetailModal(order)}>
                    <td className="om-order-id">{order.order_code}</td>
                    <td className="om-customer">{order.customer_id}</td>
                    <td className="om-date">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="om-items">{order.items ? order.items.length : 0} item{order.items && order.items.length !== 1 ? 's' : ''}</td>
                    <td className="om-amount">৳{parseFloat(order.total_amount || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td className="om-tax">৳{parseFloat(order.tax || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td className="om-net">৳{parseFloat(order.net_amount || 0).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    <td className="om-payment-method">
                      <span className={`om-payment-method-badge ${order.payment_method}`}>
                        {order.payment_method === 'ssl' ? 'SSL Commerz' : 'Cash on Delivery'}
                      </span>
                    </td>
                    <td className="om-delivery-status">
                      <span className="om-status-badge" style={{ backgroundColor: getDeliveryStatusInfo(order.status).color }}>
                        {getDeliveryStatusInfo(order.status).icon}
                        {getDeliveryStatusInfo(order.status).text}
                      </span>
                    </td>
                    <td className="om-payment-status">
                      <span className="om-status-badge" style={{ backgroundColor: getPaymentStatusInfo(order.payment_status).color }}>
                        {getPaymentStatusInfo(order.payment_status).text}
                      </span>
                    </td>
                    <td className="om-actions" onClick={(e) => e.stopPropagation()}>
                      <div className="om-action-menu">
                        <button 
                          className="om-menu-toggle" 
                          onClick={(e) => toggleActionMenu(order.order_id, e)}
                        >
                          <FaEllipsisV />
                        </button>
                        {isActionMenuOpen === order.order_id && (
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
            
            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="om-pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="om-pagination-btn"
                >
                  Previous
                </button>
                <span className="om-pagination-info">
                  Page {currentPage} of {pagination.totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, pagination.totalPages))}
                  disabled={currentPage === pagination.totalPages}
                  className="om-pagination-btn"
                >
                  Next
                </button>
              </div>
            )}
          </>
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
              <h3>Order Details: {selectedOrder.order_code}</h3>
              <button className="om-close-modal" onClick={closeAll}>
                ×
              </button>
            </div>
            <div className="om-modal-body">
              <div className="om-order-info">
                <div className="om-info-row">
                  <span className="om-info-label">Customer ID:</span>
                  <span className="om-info-value">{selectedOrder.customer_id}</span>
                </div>
                <div className="om-info-row">
                  <span className="om-info-label">Address:</span>
                  <span className="om-info-value">{selectedOrder.delivery_address}</span>
                </div>
                <div className="om-info-row">
                  <span className="om-info-label">Order Date:</span>
                  <span className="om-info-value">{new Date(selectedOrder.created_at).toLocaleDateString()}</span>
                </div>
                <div className="om-info-row">
                  <span className="om-info-label">Delivery Status:</span>
                  <span className="om-info-value">
                    <span className="om-status-badge" style={{ backgroundColor: getDeliveryStatusInfo(selectedOrder.status).color }}>
                      {getDeliveryStatusInfo(selectedOrder.status).icon}
                      {getDeliveryStatusInfo(selectedOrder.status).text}
                    </span>
                  </span>
                </div>
                <div className="om-info-row">
                  <span className="om-info-label">Payment Method:</span>
                  <span className="om-info-value">
                    {selectedOrder.payment_method === 'ssl' ? 'SSL Commerz' : 'Cash on Delivery'}
                  </span>
                </div>
                <div className="om-info-row">
                  <span className="om-info-label">Payment Status:</span>
                  <span className="om-info-value">
                    <span className="om-status-badge" style={{ backgroundColor: getPaymentStatusInfo(selectedOrder.payment_status).color }}>
                      {getPaymentStatusInfo(selectedOrder.payment_status).text}
                    </span>
                  </span>
                </div>
              </div>

              <div className="om-order-items">
                <h4>Order Items</h4>
                {selectedOrder.items && selectedOrder.items.length > 0 ? (
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
                          <td>{item.name || `Part ID: ${item.part_id}`}</td>
                          <td>{item.quantity}</td>
                          <td>৳{parseFloat(item.price_each || 0).toFixed(2)}</td>
                          <td>৳{(parseFloat(item.price_each || 0) * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No items found for this order.</p>
                )}
              </div>

              <div className="om-order-summary">
                <div className="om-summary-row">
                  <span>Subtotal:</span>
                  <span>৳{parseFloat(selectedOrder.total_amount || 0).toFixed(2)}</span>
                </div>
                <div className="om-summary-row">
                  <span>Tax:</span>
                  <span>৳{parseFloat(selectedOrder.tax || 0).toFixed(2)}</span>
                </div>
                <div className="om-summary-row om-total">
                  <span>Total:</span>
                  <span>৳{parseFloat(selectedOrder.net_amount || 0).toFixed(2)}</span>
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
              <h3>Update Delivery Status: {selectedOrder.order_code}</h3>
              <button className="om-close-modal" onClick={closeAll}>
                ×
              </button>
            </div>
            <div className="om-modal-body">
              <div className="om-current-status">
                <span>Current Status:</span>
                <span className="om-status-badge" style={{ backgroundColor: getDeliveryStatusInfo(selectedOrder.status).color }}>
                  {getDeliveryStatusInfo(selectedOrder.status).icon}
                  {getDeliveryStatusInfo(selectedOrder.status).text}
                </span>
              </div>

              <div className="om-status-options">
                <h4>Update Status To:</h4>
                <div className="om-options-grid">
                  <button 
                    className={`om-status-option ${selectedOrder.status === 'processing' ? 'om-active' : ''}`}
                    onClick={() => updateDeliveryStatus(selectedOrder.order_id, 'processing')}
                  >
                    <span className="om-status-icon"><FaEllipsisV /></span>
                    Processing
                  </button>
                  <button 
                    className={`om-status-option ${selectedOrder.status === 'shipped' ? 'om-active' : ''}`}
                    onClick={() => updateDeliveryStatus(selectedOrder.order_id, 'shipped')}
                  >
                    <span className="om-status-icon"><FaTruck /></span>
                    Shipped
                  </button>
                  <button 
                    className={`om-status-option ${selectedOrder.status === 'delivered' ? 'om-active' : ''}`}
                    onClick={() => updateDeliveryStatus(selectedOrder.order_id, 'delivered')}
                  >
                    <span className="om-status-icon"><FaCheckCircle /></span>
                    Delivered
                  </button>
                  <button 
                    className={`om-status-option ${selectedOrder.status === 'cancelled' ? 'om-active' : ''}`}
                    onClick={() => updateDeliveryStatus(selectedOrder.order_id, 'cancelled')}
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