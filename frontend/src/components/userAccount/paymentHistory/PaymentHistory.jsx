import React, { useState } from 'react';
import { 
  FaCreditCard, FaFilter, FaCalendarAlt, 
  FaCheckCircle, FaTimesCircle, FaClock,
  FaTools, FaShoppingBag, FaArrowRight,
  FaFilePdf
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
      amount: 8999,
      status: 'completed',
      method: 'SSL Commerz',
      invoiceNumber: 'INV-2023-081',
      deliveryAddress: 'House 12, Road 5, Gulshan-1, Dhaka 1212, Bangladesh'
    },
    {
      id: 2,
      date: '2023-08-15',
      type: 'parts',
      description: 'Premium Brake Pads (x2)',
      amount: 11998,
      status: 'completed',
      method: 'Cash on Delivery',
      invoiceNumber: 'INV-2023-072',
      deliveryAddress: 'House 34, Road 7, Dhanmondi, Dhaka 1209, Bangladesh'
    },
    {
      id: 3,
      date: '2023-07-28',
      type: 'service',
      description: 'Brake Inspection',
      amount: 4999,
      status: 'failed',
      method: 'SSL Commerz',
      invoiceNumber: 'INV-2023-063',
      deliveryAddress: 'Plot 15, Block B, Bashundhara R/A, Dhaka 1229, Bangladesh'
    },
    {
      id: 4,
      date: '2023-07-10',
      type: 'parts',
      description: 'Performance Air Filter',
      amount: 3999,
      status: 'pending',
      method: 'Cash on Delivery',
      invoiceNumber: 'INV-2023-054',
      deliveryAddress: 'House 5, Road 12, Uttara, Dhaka 1230, Bangladesh'
    },
    {
      id: 5,
      date: '2023-06-22',
      type: 'service',
      description: 'Tire Rotation',
      amount: 3999,
      status: 'completed',
      method: 'SSL Commerz',
      invoiceNumber: 'INV-2023-045',
      deliveryAddress: 'House 21, Road 3, Banani, Dhaka 1213, Bangladesh'
    },
    {
      id: 6,
      date: '2023-06-05',
      type: 'parts',
      description: 'Synthetic Motor Oil 5W-30 (x3)',
      amount: 10497,
      status: 'completed',
      method: 'Cash on Delivery',
      invoiceNumber: 'INV-2023-036',
      deliveryAddress: 'House 8, Road 14, Mirpur DOHS, Dhaka 1216, Bangladesh'
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
        return <FaCheckCircle className="ph-status-icon ph-completed" />;
      case 'failed':
        return <FaTimesCircle className="ph-status-icon ph-failed" />;
      case 'pending':
        return <FaClock className="ph-status-icon ph-pending" />;
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
        return <FaTools className="ph-type-icon ph-service" />;
      case 'parts':
        return <FaShoppingBag className="ph-type-icon ph-parts" />;
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

  const handleDownloadPDF = () => {
    // In a real app, this would generate/download a PDF
    alert('PDF download functionality would be implemented here');
  };

  return (
    <div className="ph-container">
      <div className="ph-header">
        <h2><FaCreditCard /> Payment History</h2>
        <div className="ph-filter-controls">
          <div className="ph-filter-group">
            <label>Payment Status:</label>
            <div className="ph-filter-buttons">
              <button 
                className={`ph-filter-btn ${filter === 'all' ? 'ph-active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({statusCounts.all})
              </button>
              <button 
                className={`ph-filter-btn ${filter === 'completed' ? 'ph-active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed ({statusCounts.completed})
              </button>
              <button 
                className={`ph-filter-btn ${filter === 'failed' ? 'ph-active' : ''}`}
                onClick={() => setFilter('failed')}
              >
                Failed ({statusCounts.failed})
              </button>
              <button 
                className={`ph-filter-btn ${filter === 'pending' ? 'ph-active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending ({statusCounts.pending})
              </button>
            </div>
          </div>
          
          <div className="ph-filter-group">
            <label>Payment Type:</label>
            <div className="ph-filter-buttons">
              <button 
                className={`ph-filter-btn ${typeFilter === 'all' ? 'ph-active' : ''}`}
                onClick={() => setTypeFilter('all')}
              >
                All ({typeCounts.all})
              </button>
              <button 
                className={`ph-filter-btn ${typeFilter === 'service' ? 'ph-active' : ''}`}
                onClick={() => setTypeFilter('service')}
              >
                Services ({typeCounts.service})
              </button>
              <button 
                className={`ph-filter-btn ${typeFilter === 'parts' ? 'ph-active' : ''}`}
                onClick={() => setTypeFilter('parts')}
              >
                Parts ({typeCounts.parts})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="ph-payment-list">
        {filteredPayments.length > 0 ? (
          <table className="ph-payments-table">
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
                    <div className="ph-date-cell">
                      <FaCalendarAlt className="ph-calendar-icon" />
                      {new Date(payment.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td>
                    <div className="ph-type-cell">
                      {getTypeIcon(payment.type)}
                      {getTypeText(payment.type)}
                    </div>
                  </td>
                  <td className="ph-description-cell">{payment.description}</td>
                  <td className="ph-amount-cell">৳{(payment.amount / 100).toFixed(2)}</td>
                  <td>
                    <div className={`ph-status-cell ph-${payment.status}`}>
                      {getStatusIcon(payment.status)}
                      {getStatusText(payment.status)}
                    </div>
                  </td>
                  <td>
                    <button 
                      className="ph-receipt-btn"
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
          <div className="ph-no-payments">
            <p>No payments found matching your filters</p>
            <button className="ph-explore-btn">
              Explore Services <FaArrowRight />
            </button>
          </div>
        )}
      </div>

      {showReceiptModal && selectedPayment && (
        <div className="ph-receipt-modal-overlay">
          <div className="ph-receipt-modal">
            <div className="ph-modal-header">
              <h3>Payment Receipt</h3>
              <button 
                className="ph-close-modal"
                onClick={() => setShowReceiptModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="ph-receipt-content">
              <div className="ph-receipt-row">
                <span>Invoice Number:</span>
                <strong>{selectedPayment.invoiceNumber}</strong>
              </div>
              
              <div className="ph-receipt-row">
                <span>Date:</span>
                <span>{new Date(selectedPayment.date).toLocaleDateString()}</span>
              </div>
              
              <div className="ph-receipt-row">
                <span>Type:</span>
                <span>
                  {getTypeIcon(selectedPayment.type)}
                  {getTypeText(selectedPayment.type)}
                </span>
              </div>
              
              <div className="ph-receipt-row">
                <span>Description:</span>
                <span>{selectedPayment.description}</span>
              </div>
              
              <div className="ph-receipt-row">
                <span>Payment Method:</span>
                <span>{selectedPayment.method}</span>
              </div>

              <div className="ph-receipt-row">
                <span>Delivery Address:</span>
                <span>{selectedPayment.deliveryAddress}</span>
              </div>
              
              <div className="ph-receipt-row">
                <span>Status:</span>
                <span className={`ph-status-text ph-${selectedPayment.status}`}>
                  {getStatusIcon(selectedPayment.status)}
                  {getStatusText(selectedPayment.status)}
                </span>
              </div>
              
              <div className="ph-receipt-row ph-total-row">
                <span>Total Amount:</span>
                <span className="ph-total-amount">৳{(selectedPayment.amount / 100).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="ph-modal-actions">
              <button className="ph-download-btn" onClick={handleDownloadPDF}>
                <FaFilePdf /> Download PDF
              </button>
              <button 
                className="ph-close-btn"
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