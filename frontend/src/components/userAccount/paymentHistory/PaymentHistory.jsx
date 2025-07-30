import React, { useState } from 'react';
import { 
  FaCreditCard, FaFilter, FaCalendarAlt, 
  FaCheckCircle, FaTimesCircle, FaClock,
  FaTools, FaShoppingBag, FaArrowRight
} from 'react-icons/fa';
import './PaymentHistory.css';

const PaymentHistory = () => {
  // Sample payment data combining both services and parts purchases
  const allPayments = [
    {
      id: 1,
      date: '2023-08-20',
      type: 'service',
      description: 'Oil Change Service',
      amount: 89.99,
      status: 'completed',
      method: 'Credit Card (VISA ****4242)',
      invoiceNumber: 'INV-2023-081'
    },
    {
      id: 2,
      date: '2023-08-15',
      type: 'parts',
      description: 'Premium Brake Pads (x2)',
      amount: 119.98,
      status: 'completed',
      method: 'PayPal',
      invoiceNumber: 'INV-2023-072'
    },
    {
      id: 3,
      date: '2023-07-28',
      type: 'service',
      description: 'Brake Inspection',
      amount: 49.99,
      status: 'failed',
      method: 'Credit Card (MC ****5555)',
      invoiceNumber: 'INV-2023-063'
    },
    {
      id: 4,
      date: '2023-07-10',
      type: 'parts',
      description: 'Performance Air Filter',
      amount: 39.99,
      status: 'pending',
      method: 'Bank Transfer',
      invoiceNumber: 'INV-2023-054'
    },
    {
      id: 5,
      date: '2023-06-22',
      type: 'service',
      description: 'Tire Rotation',
      amount: 39.99,
      status: 'completed',
      method: 'Credit Card (VISA ****4242)',
      invoiceNumber: 'INV-2023-045'
    },
    {
      id: 6,
      date: '2023-06-05',
      type: 'parts',
      description: 'Synthetic Motor Oil 5W-30 (x3)',
      amount: 104.97,
      status: 'completed',
      method: 'Apple Pay',
      invoiceNumber: 'INV-2023-036'
    }
  ];

  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Sort payments by date in descending order (most recent first)
  const sortedPayments = [...allPayments].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredPayments = sortedPayments.filter(payment => {
    const statusMatch = filter === 'all' || payment.status === filter;
    const typeMatch = typeFilter === 'all' || payment.type === typeFilter;
    return statusMatch && typeMatch;
  });

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <FaCheckCircle className="status-icon completed" />;
      case 'failed':
        return <FaTimesCircle className="status-icon failed" />;
      case 'pending':
        return <FaClock className="status-icon pending" />;
      default:
        return null;
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'completed': return 'Completed';
      case 'failed': return 'Failed';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'service':
        return <FaTools className="type-icon service" />;
      case 'parts':
        return <FaShoppingBag className="type-icon parts" />;
      default:
        return null;
    }
  };

  const getTypeText = (type) => {
    switch(type) {
      case 'service': return 'Service';
      case 'parts': return 'Parts';
      default: return 'Unknown';
    }
  };

  const statusCounts = {
    all: allPayments.length,
    completed: allPayments.filter(p => p.status === 'completed').length,
    failed: allPayments.filter(p => p.status === 'failed').length,
    pending: allPayments.filter(p => p.status === 'pending').length
  };

  const typeCounts = {
    all: allPayments.length,
    service: allPayments.filter(p => p.type === 'service').length,
    parts: allPayments.filter(p => p.type === 'parts').length
  };

  const openReceiptModal = (payment) => {
    setSelectedPayment(payment);
    setShowReceiptModal(true);
  };

  return (
    <div className="payment-history-container">
      <div className="payment-history-header">
        <h2><FaCreditCard /> Payment History</h2>
        <div className="filter-controls">
          <div className="filter-group">
            <label>Payment Status:</label>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({statusCounts.all})
              </button>
              <button 
                className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed ({statusCounts.completed})
              </button>
              <button 
                className={`filter-btn ${filter === 'failed' ? 'active' : ''}`}
                onClick={() => setFilter('failed')}
              >
                Failed ({statusCounts.failed})
              </button>
              <button 
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending ({statusCounts.pending})
              </button>
            </div>
          </div>
          
          <div className="filter-group">
            <label>Payment Type:</label>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${typeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setTypeFilter('all')}
              >
                All ({typeCounts.all})
              </button>
              <button 
                className={`filter-btn ${typeFilter === 'service' ? 'active' : ''}`}
                onClick={() => setTypeFilter('service')}
              >
                Services ({typeCounts.service})
              </button>
              <button 
                className={`filter-btn ${typeFilter === 'parts' ? 'active' : ''}`}
                onClick={() => setTypeFilter('parts')}
              >
                Parts ({typeCounts.parts})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="payment-list">
        {filteredPayments.length > 0 ? (
          <table className="payments-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map(payment => (
                <tr key={payment.id}>
                  <td>
                    <div className="date-cell">
                      <FaCalendarAlt className="calendar-icon" />
                      {new Date(payment.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className="type-cell">
                      {getTypeIcon(payment.type)}
                      {getTypeText(payment.type)}
                    </div>
                  </td>
                  <td>{payment.description}</td>
                  <td className="amount-cell">${payment.amount.toFixed(2)}</td>
                  <td>
                    <div className={`status-cell ${payment.status}`}>
                      {getStatusIcon(payment.status)}
                      {getStatusText(payment.status)}
                    </div>
                  </td>
                  <td>
                    <button 
                      className="receipt-btn"
                      onClick={() => openReceiptModal(payment)}
                    >
                      View Receipt
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-payments">
            <p>No payments found matching your filters</p>
            <Link to="/services" className="explore-btn">
              Explore Services <FaArrowRight />
            </Link>
          </div>
        )}
      </div>

      {showReceiptModal && selectedPayment && (
        <div className="receipt-modal-overlay">
          <div className="receipt-modal">
            <div className="modal-header">
              <h3>Payment Receipt</h3>
              <button 
                className="close-modal"
                onClick={() => setShowReceiptModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="receipt-content">
              <div className="receipt-row">
                <span>Invoice Number:</span>
                <strong>{selectedPayment.invoiceNumber}</strong>
              </div>
              
              <div className="receipt-row">
                <span>Date:</span>
                <span>{new Date(selectedPayment.date).toLocaleDateString()}</span>
              </div>
              
              <div className="receipt-row">
                <span>Type:</span>
                <span>
                  {getTypeIcon(selectedPayment.type)}
                  {getTypeText(selectedPayment.type)}
                </span>
              </div>
              
              <div className="receipt-row">
                <span>Description:</span>
                <span>{selectedPayment.description}</span>
              </div>
              
              <div className="receipt-row">
                <span>Payment Method:</span>
                <span>{selectedPayment.method}</span>
              </div>
              
              <div className="receipt-row">
                <span>Status:</span>
                <span className={`status-text ${selectedPayment.status}`}>
                  {getStatusIcon(selectedPayment.status)}
                  {getStatusText(selectedPayment.status)}
                </span>
              </div>
              
              <div className="receipt-row total-row">
                <span>Total Amount:</span>
                <span className="total-amount">${selectedPayment.amount.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="print-btn">Print Receipt</button>
              <button 
                className="close-btn"
                onClick={() => setShowReceiptModal(false)}
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

export default PaymentHistory;