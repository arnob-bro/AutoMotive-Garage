import React, { useState, useEffect } from 'react';
import { 
  FaCreditCard, FaFilter, FaCalendarAlt, FaSearch,
  FaCheckCircle, FaTimesCircle, FaClock, FaPrint,
  FaMoneyBillWave, FaExchangeAlt, FaRegCreditCard,
  FaChartLine, FaDownload, FaEllipsisV, FaEye
} from 'react-icons/fa';
import './AdminPaymentManagement.css';

const AdminPaymentManagement = () => {
  // Sample payment data with more admin-specific fields
  const initialPayments = [
    {
      id: 'PAY-1001',
      orderId: 'ORD-2023-081',
      customer: 'John Smith',
      date: '2023-08-20',
      type: 'service',
      description: 'Oil Change Service',
      amount: 89.99,
      fee: 2.70,
      net: 87.29,
      status: 'completed',
      method: 'credit',
      methodDetails: 'VISA ****4242',
      invoiceNumber: 'INV-2023-081',
      processedAt: '2023-08-20 14:32:45'
    },
    {
      id: 'PAY-1002',
      orderId: 'ORD-2023-072',
      customer: 'Sarah Johnson',
      date: '2023-08-15',
      type: 'parts',
      description: 'Premium Brake Pads (x2)',
      amount: 119.98,
      fee: 3.60,
      net: 116.38,
      status: 'completed',
      method: 'paypal',
      methodDetails: 'john.smith@example.com',
      invoiceNumber: 'INV-2023-072',
      processedAt: '2023-08-15 09:15:22'
    },
    {
      id: 'PAY-1003',
      orderId: 'ORD-2023-063',
      customer: 'Michael Brown',
      date: '2023-07-28',
      type: 'service',
      description: 'Brake Inspection',
      amount: 49.99,
      fee: 1.50,
      net: 48.49,
      status: 'refunded',
      method: 'credit',
      methodDetails: 'MC ****5555',
      invoiceNumber: 'INV-2023-063',
      processedAt: '2023-07-28 16:45:10',
      refundedAt: '2023-07-30 11:20:33'
    },
    {
      id: 'PAY-1004',
      orderId: 'ORD-2023-054',
      customer: 'Emily Davis',
      date: '2023-07-10',
      type: 'parts',
      description: 'Performance Air Filter',
      amount: 39.99,
      fee: 1.20,
      net: 38.79,
      status: 'pending',
      method: 'bank_transfer',
      methodDetails: '****7890',
      invoiceNumber: 'INV-2023-054',
      processedAt: null
    },
    {
      id: 'PAY-1005',
      orderId: 'ORD-2023-045',
      customer: 'Robert Wilson',
      date: '2023-06-22',
      type: 'service',
      description: 'Tire Rotation',
      amount: 39.99,
      fee: 1.20,
      net: 38.79,
      status: 'completed',
      method: 'credit',
      methodDetails: 'VISA ****4242',
      invoiceNumber: 'INV-2023-045',
      processedAt: '2023-06-22 13:10:05'
    },
    {
      id: 'PAY-1006',
      orderId: 'ORD-2023-036',
      customer: 'Jennifer Lee',
      date: '2023-06-05',
      type: 'parts',
      description: 'Synthetic Motor Oil 5W-30 (x3)',
      amount: 104.97,
      fee: 3.15,
      net: 101.82,
      status: 'failed',
      method: 'apple_pay',
      methodDetails: 'Apple Pay',
      invoiceNumber: 'INV-2023-036',
      processedAt: null,
      failedAt: '2023-06-05 10:05:18'
    }
  ];

  const [payments, setPayments] = useState(initialPayments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterMethod, setFilterMethod] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  // Status options for filtering
  const statusOptions = ['all', 'completed', 'pending', 'failed', 'refunded'];
  
  // Payment method options for filtering
  const methodOptions = ['all', 'credit', 'paypal', 'bank_transfer', 'apple_pay'];
  
  // Date range options for filtering
  const dateOptions = ['all', 'today', 'week', 'month', 'quarter'];

  // Filter payments based on search and filters
  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus;
    
    const matchesMethod = filterMethod === 'all' || payment.method === filterMethod;
    
    const now = new Date();
    const paymentDate = new Date(payment.date);
    const matchesDate = filterDate === 'all' ||
                      (filterDate === 'today' && paymentDate.toDateString() === now.toDateString()) ||
                      (filterDate === 'week' && (now - paymentDate) <= 7 * 24 * 60 * 60 * 1000) ||
                      (filterDate === 'month' && paymentDate.getMonth() === now.getMonth() && paymentDate.getFullYear() === now.getFullYear()) ||
                      (filterDate === 'quarter' && Math.floor(paymentDate.getMonth() / 3) === Math.floor(now.getMonth() / 3) && paymentDate.getFullYear() === now.getFullYear());
    
    return matchesSearch && matchesStatus && matchesMethod && matchesDate;
  });

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch(status) {
      case 'completed':
        return { icon: <FaCheckCircle />, color: 'var(--success)', text: 'Completed' };
      case 'pending':
        return { icon: <FaClock />, color: 'var(--warning)', text: 'Pending' };
      case 'failed':
        return { icon: <FaTimesCircle />, color: 'var(--danger)', text: 'Failed' };
      case 'refunded':
        return { icon: <FaExchangeAlt />, color: 'var(--info)', text: 'Refunded' };
      default:
        return { icon: null, color: '', text: '' };
    }
  };

  // Get payment method icon and text
  const getMethodInfo = (method) => {
    switch(method) {
      case 'credit':
        return { icon: <FaRegCreditCard />, text: 'Credit Card' };
      case 'paypal':
        return { icon: <FaMoneyBillWave />, text: 'PayPal' };
      case 'bank_transfer':
        return { icon: <FaExchangeAlt />, text: 'Bank Transfer' };
      case 'apple_pay':
        return { icon: <FaMoneyBillWave />, text: 'Apple Pay' };
      default:
        return { icon: null, text: '' };
    }
  };

  // Calculate payment statistics
  const paymentStats = {
    total: payments.length,
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    failed: payments.filter(p => p.status === 'failed').length,
    refunded: payments.filter(p => p.status === 'refunded').length,
    totalAmount: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0),
    totalFees: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.fee, 0),
    totalNet: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.net, 0)
  };

  // Open payment details modal
  const openDetailModal = (payment) => {
    setSelectedPayment(payment);
    setIsDetailModalOpen(true);
  };

  // Toggle export menu
  const toggleExportMenu = (e) => {
    e.stopPropagation();
    setIsExportMenuOpen(!isExportMenuOpen);
  };

  // Close all modals and menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setIsExportMenuOpen(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="admin-payment-management">
      <div className="payment-header">
        <h1><FaCreditCard /> Payment Management</h1>
        <p>View and manage all payment transactions</p>
      </div>

      <div className="payment-controls">
        <div className="search-filters">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search payments..."
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
              <FaMoneyBillWave className="filter-icon" />
              <select
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
              >
                <option value="all">All Methods</option>
                {methodOptions.filter(m => m !== 'all').map(method => (
                  <option key={method} value={method}>
                    {getMethodInfo(method).text}
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
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="export-actions">
          <button className="export-btn" onClick={toggleExportMenu}>
            <FaDownload /> Export
            {isExportMenuOpen && (
              <div className="export-menu">
                <button>CSV</button>
                <button>Excel</button>
                <button>PDF</button>
              </div>
            )}
          </button>
        </div>
      </div>

      <div className="payment-stats">
        <div className="stat-card">
          <div className="stat-icon total">
            <FaCreditCard />
          </div>
          <div className="stat-info">
            <h3>{paymentStats.total}</h3>
            <p>Total Transactions</p>
          </div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-icon">
            <FaCheckCircle />
          </div>
          <div className="stat-info">
            <h3>{paymentStats.completed}</h3>
            <p>Completed</p>
          </div>
        </div>
        
        <div className="stat-card pending">
          <div className="stat-icon">
            <FaClock />
          </div>
          <div className="stat-info">
            <h3>{paymentStats.pending}</h3>
            <p>Pending</p>
          </div>
        </div>
        
        <div className="stat-card failed">
          <div className="stat-icon">
            <FaTimesCircle />
          </div>
          <div className="stat-info">
            <h3>{paymentStats.failed}</h3>
            <p>Failed</p>
          </div>
        </div>
        
        <div className="stat-card refunded">
          <div className="stat-icon">
            <FaExchangeAlt />
          </div>
          <div className="stat-info">
            <h3>{paymentStats.refunded}</h3>
            <p>Refunded</p>
          </div>
        </div>
        
        <div className="stat-card revenue">
          <div className="stat-icon">
            <FaChartLine />
          </div>
          <div className="stat-info">
            <h3>${paymentStats.totalAmount.toFixed(2)}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="payments-table-container">
        {filteredPayments.length > 0 ? (
          <table className="payments-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Fee</th>
                <th>Net</th>
                <th>Method</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td className="payment-id">{payment.id}</td>
                  <td className="order-id">{payment.orderId}</td>
                  <td className="customer">{payment.customer}</td>
                  <td className="date">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="amount">${payment.amount.toFixed(2)}</td>
                  <td className="fee">${payment.fee.toFixed(2)}</td>
                  <td className="net">${payment.net.toFixed(2)}</td>
                  <td className="method">
                    <div className="method-cell">
                      {getMethodInfo(payment.method).icon}
                      {getMethodInfo(payment.method).text}
                    </div>
                  </td>
                  <td className="status">
                    <div className="status-badge" style={{ backgroundColor: getStatusInfo(payment.status).color }}>
                      {getStatusInfo(payment.status).icon}
                      {getStatusInfo(payment.status).text}
                    </div>
                  </td>
                  <td className="actions">
                    <button 
                      className="view-btn"
                      onClick={() => openDetailModal(payment)}
                    >
                      <FaEye /> Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-payments">
            <p>No payments found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Payment Detail Modal */}
      {isDetailModalOpen && selectedPayment && (
        <div className="modal-overlay" onClick={() => setIsDetailModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Payment Details: {selectedPayment.id}</h3>
              <button 
                className="close-modal"
                onClick={() => setIsDetailModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-row">
                  <span className="detail-label">Order ID:</span>
                  <span className="detail-value">{selectedPayment.orderId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Customer:</span>
                  <span className="detail-value">{selectedPayment.customer}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">
                    {new Date(selectedPayment.date).toLocaleDateString()} at {selectedPayment.processedAt?.split(' ')[1] || '--:--:--'}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Description:</span>
                  <span className="detail-value">{selectedPayment.description}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Invoice Number:</span>
                  <span className="detail-value">{selectedPayment.invoiceNumber}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Payment Method:</span>
                  <span className="detail-value">
                    {getMethodInfo(selectedPayment.method).icon} {getMethodInfo(selectedPayment.method).text}
                    {selectedPayment.methodDetails && ` (${selectedPayment.methodDetails})`}
                  </span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Status:</span>
                  <span className="detail-value">
                    <span className="status-badge" style={{ backgroundColor: getStatusInfo(selectedPayment.status).color }}>
                      {getStatusInfo(selectedPayment.status).icon}
                      {getStatusInfo(selectedPayment.status).text}
                    </span>
                  </span>
                </div>
                {selectedPayment.refundedAt && (
                  <div className="detail-row">
                    <span className="detail-label">Refunded At:</span>
                    <span className="detail-value">
                      {new Date(selectedPayment.refundedAt).toLocaleDateString()} at {selectedPayment.refundedAt.split(' ')[1]}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="amount-summary">
                <div className="amount-row">
                  <span>Amount:</span>
                  <span>${selectedPayment.amount.toFixed(2)}</span>
                </div>
                <div className="amount-row">
                  <span>Processing Fee:</span>
                  <span>-${selectedPayment.fee.toFixed(2)}</span>
                </div>
                <div className="amount-row total">
                  <span>Net Amount:</span>
                  <span>${selectedPayment.net.toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="print-btn">
                <FaPrint /> Print Receipt
              </button>
              <button 
                className="close-btn"
                onClick={() => setIsDetailModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPaymentManagement;