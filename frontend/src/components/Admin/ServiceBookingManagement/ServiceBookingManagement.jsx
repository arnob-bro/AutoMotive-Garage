import React, { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, FaFilter, FaCheckCircle, 
  FaSpinner, FaTimes, FaUserCog, 
  FaDollarSign, FaCar, FaTools, FaSearch,
  FaHistory, FaClipboardCheck, FaMoneyBillWave,
  FaExchangeAlt, FaCreditCard
} from 'react-icons/fa';
import BookingApi from '../../../apis/bookingApi';
import './ServiceBookingManagement.css';

const ServiceBookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [allBookings, setAllBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Initialize BookingApi
  const bookingApi = new BookingApi();

  // Helper function to safely format the total amount
  const formatTotalAmount = (total) => {
    if (total === null || total === undefined) return 'N/A';
    
    // Convert to number if it's a string
    const num = typeof total === 'string' ? parseFloat(total) : total;
    
    // Check if it's a valid number
    if (isNaN(num)) return 'Invalid amount';
    
    return `BDT ${num.toFixed(2)}`;
  };

  // Fetch bookings from API
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await bookingApi.getBookings({
        page: currentPage,
        limit: 20,
        searchTerm: searchTerm,
        status: activeTab === 'all' ? '' : activeTab
      });

      if (response.success) {
        console.log('Raw API response:', response);
        // Transform API response to match component format
        const transformedBookings = response.bookings.map(booking => ({
          id: booking.booking_id,
          bookingId: booking.booking_id,
          customer: booking.customer_name || booking.customer_email || `Customer ${booking.customer_id?.slice(0, 8)}` || 'Unknown Customer',
          vehicle: booking.vehicle || 'Not specified',
          services: booking.services ? booking.services.map(s => s.name) : [],
          date: booking.booking_date,
          time: booking.booking_time,
          status: booking.status,
          paymentStatus: booking.paymentStatus,
          total: booking.total,
          duration: booking.duration,
          address: booking.customer_address || booking.address || 'Address not provided',
          customer_id: booking.customer_id,
          customer_email: booking.customer_email,
          customer_phone: booking.customer_phone
        }));
        
        setBookings(transformedBookings);
        setAllBookings(transformedBookings);
        setTotalPages(response.totalPages || 1);
      } else {
        setError(response.message || 'Failed to fetch bookings');
        setBookings([]);
        setAllBookings([]);
      }
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err.error || 'Failed to fetch bookings');
      setBookings([]);
        setAllBookings([]);
      }
    finally {
      setLoading(false);
    }
  };

  // Load bookings on component mount and when filters change
  useEffect(() => {
    fetchBookings();
  }, [currentPage, activeTab, searchTerm]);

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const statusResponse = await bookingApi.updateBookingStatus(bookingId, { status: newStatus });
  
      if (statusResponse.success) {
        let newPaymentStatus = selectedBooking.paymentStatus;
  
        if (newStatus === 'completed') {
          try {
            const paymentResponse = await bookingApi.updateBookingPaymentStatus(bookingId, { paymentStatus: 'paid' });
            if (paymentResponse.success) newPaymentStatus = 'paid';
          } catch (paymentError) {
            console.error('Error updating payment status:', paymentError);
          }
        }
  
        // Update local state immediately
        setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus, paymentStatus: newPaymentStatus } : b));
        setAllBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus, paymentStatus: newPaymentStatus } : b));
        setSelectedBooking(prev => prev ? { ...prev, status: newStatus, paymentStatus: newPaymentStatus } : prev);
  
        alert(`Booking status updated to ${newStatus}${newStatus === 'completed' ? ' and payment status set to paid' : ''}`);
      } else {
        alert(`Failed to update booking status: ${statusResponse.message}`);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert(`Failed to update booking status: ${error.error || error.message}`);
    }
  };
  

  const viewBookingDetails = (booking) => {
    console.log('Viewing booking details:', booking);
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <FaCheckCircle className="sbm-status-icon sbm-completed" />;
      case 'in-progress':
        return <FaSpinner className="sbm-status-icon sbm-in-progress" />;
      case 'confirmed':
        return <FaCheckCircle className="sbm-status-icon sbm-confirmed" />;
      case 'pending':
        return <FaTimes className="sbm-status-icon sbm-pending" />;
      case 'cancelled':
        return <FaTimes className="sbm-status-icon sbm-cancelled" />;
      default:
        return <FaTimes className="sbm-status-icon sbm-unknown" />;
    }
  };

  const getPaymentIcon = (paymentStatus) => {
    switch(paymentStatus) {
      case 'paid':
        return <FaMoneyBillWave className="sbm-payment-icon sbm-paid" />;
      case 'pending':
        return <FaCreditCard className="sbm-payment-icon sbm-pending" />;
      case 'refund':
        return <FaExchangeAlt className="sbm-payment-icon sbm-refund" />;
      default:
        return <FaCreditCard className="sbm-payment-icon sbm-unknown" />;
    }
  };

  const statusCounts = {
    all: allBookings.length,
    confirmed: allBookings.filter(b => b.status === 'confirmed').length,
    'in-progress': allBookings.filter(b => b.status === 'in-progress').length,
    completed: allBookings.filter(b => b.status === 'completed').length,
    pending: allBookings.filter(b => b.status === 'pending').length,
    cancelled: allBookings.filter(b => b.status === 'cancelled').length
  };

  // Add loading state to the component
  if (loading && allBookings.length === 0) {
    return (
      <div className="sbm-page-container">
        <div className="sbm-content-container">
          <div className="sbm-header">
            <h2 className="sbm-title">Service Bookings Management</h2>
            <p className="sbm-subtitle">Loading bookings...</p>
          </div>
          <div style={{ textAlign: 'center', padding: '50px' }}>
            <FaSpinner className="fa-spin" style={{ fontSize: '2rem', marginBottom: '1rem' }} />
            <p>Loading bookings from the server...</p>
          </div>
        </div>
      </div>
    );
  }

  // Add error state to the component
  if (error && allBookings.length === 0) {
    return (
      <div className="sbm-page-container">
        <div className="sbm-content-container">
          <div className="sbm-header">
            <h2 className="sbm-title">Service Bookings Management</h2>
            <p className="sbm-subtitle">Error loading bookings</p>
          </div>
          <div style={{ textAlign: 'center', padding: '50px', color: '#e74c3c' }}>
            <p>{error}</p>
            <button 
              onClick={fetchBookings}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                backgroundColor: '#3498db',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="sbm-page-container">
      <div className="sbm-content-container">
        <div className="sbm-header">
          <h2 className="sbm-title">Service Bookings Management</h2>
          <p className="sbm-subtitle">Manage all customer service bookings</p>
        </div>

        <div className="sbm-controls">
          <div className="sbm-tabs">
            <button
              className={`sbm-tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All Bookings ({statusCounts.all})
            </button>
            <button
              className={`sbm-tab ${activeTab === 'confirmed' ? 'active' : ''}`}
              onClick={() => setActiveTab('confirmed')}
            >
              Confirmed ({statusCounts.confirmed})
            </button>
            <button
              className={`sbm-tab ${activeTab === 'in-progress' ? 'active' : ''}`}
              onClick={() => setActiveTab('in-progress')}
            >
              In Progress ({statusCounts['in-progress']})
            </button>
            <button
              className={`sbm-tab ${activeTab === 'completed' ? 'active' : ''}`}
              onClick={() => setActiveTab('completed')}
            >
              <FaClipboardCheck /> Completed ({statusCounts.completed})
            </button>
            <button
              className={`sbm-tab ${activeTab === 'pending' ? 'active' : ''}`}
              onClick={() => setActiveTab('pending')}
            >
              Pending ({statusCounts.pending})
            </button>
            <button
              className={`sbm-tab ${activeTab === 'cancelled' ? 'active' : ''}`}
              onClick={() => setActiveTab('cancelled')}
            >
              Cancelled ({statusCounts.cancelled})
            </button>
          </div>
          
          <div className="sbm-search-filter">
            <div className="sbm-search-box">
              <FaSearch className="sbm-search-icon" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="sbm-search-input"
              />
            </div>
          </div>
        </div>

        <div className="sbm-bookings-table-container">
          <div className="sbm-bookings-table">
            <div className="sbm-table-header">
              <div className="sbm-table-row">
                <div className="sbm-table-col sbm-col-id">Booking ID</div>
                <div className="sbm-table-col sbm-col-customer">Customer</div>
                <div className="sbm-table-col sbm-col-vehicle">Vehicle</div>
                <div className="sbm-table-col sbm-col-services">Services</div>
                <div className="sbm-table-col sbm-col-date">Date & Time</div>
                <div className="sbm-table-col sbm-col-status">Status</div>
                <div className="sbm-table-col sbm-col-payment">Payment</div>
                <div className="sbm-table-col sbm-col-actions">Actions</div>
              </div>
            </div>
            
            <div className="sbm-table-body">
              {bookings.length > 0 ? (
                bookings.map(booking => (
                  <div key={booking.id} className="sbm-table-row">
                    <div className="sbm-table-col sbm-col-id">
                      <span className="sbm-booking-id">{booking.bookingId}</span>
                    </div>
                    <div className="sbm-table-col sbm-col-customer">{booking.customer}</div>
                    <div className="sbm-table-col sbm-col-vehicle">
                      <FaCar className="sbm-vehicle-icon" /> {booking.vehicle}
                    </div>
                    <div className="sbm-table-col sbm-col-services">
                      {booking.services.join(', ')}
                    </div>
                    <div className="sbm-table-col sbm-col-date">
                      <div className="sbm-date-time">
                        <FaCalendarAlt className="sbm-date-icon" />
                        <span>{booking.date} at {booking.time}</span>
                      </div>
                    </div>
                    <div className="sbm-table-col sbm-col-status">
                      <div className={`sbm-status-badge sbm-${booking.status}`}>
                        {getStatusIcon(booking.status)}
                        <span>{booking.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <div className="sbm-table-col sbm-col-payment">
                      <div className={`sbm-payment-badge sbm-${booking.paymentStatus || 'pending'}`}>
                        {getPaymentIcon(booking.paymentStatus || 'pending')}
                        <span>{booking.paymentStatus || 'pending'}</span>
                      </div>
                    </div>
                    <div className="sbm-table-col sbm-col-actions">
                      <button 
                        className="sbm-action-btn sbm-view-btn"
                        onClick={() => viewBookingDetails(booking)}
                      >
                        View
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="sbm-no-bookings">
                  <p>No bookings found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Details Modal */}
        {showDetailsModal && selectedBooking && (
          <div className="sbm-modal-overlay">
            <div className="sbm-modal sbm-details-modal">
              <div className="sbm-modal-header">
                <h3>Booking Details</h3>
                <button 
                  className="sbm-modal-close"
                  onClick={() => setShowDetailsModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="sbm-modal-body">
                <div className="sbm-details-grid">
                  <div className="sbm-detail-item">
                    <span className="sbm-detail-label">Booking ID:</span>
                    <span className="sbm-detail-value">{selectedBooking.bookingId}</span>
                  </div>
                  <div className="sbm-detail-item">
                    <span className="sbm-detail-label">Customer:</span>
                    <span className="sbm-detail-value">
                      <div className="sbm-customer-info">
                        <div className="sbm-customer-name">{selectedBooking.customer}</div>
                        {selectedBooking.customer_email && (
                          <div className="sbm-customer-email">📧 {selectedBooking.customer_email}</div>
                        )}
                        {selectedBooking.customer_phone && (
                          <div className="sbm-customer-phone">📞 {selectedBooking.customer_phone}</div>
                        )}
                      </div>
                    </span>
                  </div>
                  <div className="sbm-detail-item">
                    <span className="sbm-detail-label">Vehicle:</span>
                    <span className="sbm-detail-value">
                      <FaCar className="sbm-detail-icon" /> {selectedBooking.vehicle}
                    </span>
                  </div>
                  <div className="sbm-detail-item">
                    <span className="sbm-detail-label">Address:</span>
                    <span className="sbm-detail-value">{selectedBooking.address}</span>
                  </div>
                  <div className="sbm-detail-item">
                    <span className="sbm-detail-label">Date & Time:</span>
                    <span className="sbm-detail-value">
                      <FaCalendarAlt className="sbm-detail-icon" /> 
                      {selectedBooking.date} at {selectedBooking.time}
                    </span>
                  </div>
                  <div className="sbm-detail-item">
                    <span className="sbm-detail-label">Status:</span>
                    <span className="sbm-detail-value">
                      <div className={`sbm-status-badge sbm-${selectedBooking.status}`}>
                        {getStatusIcon(selectedBooking.status)}
                        <span>{selectedBooking.status.replace('-', ' ')}</span>
                      </div>
                    </span>
                  </div>
                  <div className="sbm-detail-item">
                    <span className="sbm-detail-label">Payment:</span>
                    <span className="sbm-detail-value">
                      <div className={`sbm-payment-badge sbm-${selectedBooking.paymentStatus || 'pending'}`}>
                        {getPaymentIcon(selectedBooking.paymentStatus || 'pending')}
                        <span>{selectedBooking.paymentStatus || 'pending'}</span>
                      </div>
                    </span>
                  </div>
                  <div className="sbm-detail-item">
                    <span className="sbm-detail-label">Services:</span>
                    <div className="sbm-services-list">
                      {selectedBooking.services.map((service, index) => (
                        <div key={index} className="sbm-service-item">
                          <FaTools className="sbm-service-icon" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="sbm-detail-item">
                    <span className="sbm-detail-label">Estimated Duration:</span>
                    <span className="sbm-detail-value">{selectedBooking.duration || 'Not specified'}</span>
                  </div>
                  <div className="sbm-detail-item">
                    <span className="sbm-detail-label">Total Amount:</span>
                    <span className="sbm-detail-value sbm-total-amount">
                      {formatTotalAmount(selectedBooking.total)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="sbm-modal-footer">
                {selectedBooking.status === 'pending' && (
                  <button 
                    className="sbm-btn sbm-confirm-btn"
                    onClick={async () => {
                      await updateBookingStatus(selectedBooking.id, 'confirmed');
                      setShowDetailsModal(false);
                    }}
                  >
                    Confirm Booking
                  </button>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button 
                    className="sbm-btn sbm-start-btn"
                    onClick={async () => {
                      await updateBookingStatus(selectedBooking.id, 'in-progress');
                      setShowDetailsModal(false);
                    }}
                  >
                    Start Service
                  </button>
                )}
                {selectedBooking.status === 'in-progress' && (
                  <button 
                    className="sbm-btn sbm-complete-btn"
                    onClick={async () => {
                      await updateBookingStatus(selectedBooking.id, 'completed');
                      setShowDetailsModal(false);
                    }}
                  >
                    Mark as Completed
                  </button>
                )}
                {selectedBooking.status !== 'cancelled' && (
                  <button 
                    className="sbm-btn sbm-cancel-btn"
                    onClick={async () => {
                      await updateBookingStatus(selectedBooking.id, 'cancelled');
                      setShowDetailsModal(false);
                    }}
                  >
                    Cancel Booking
                  </button>
                )}
                <button 
                  className="sbm-btn sbm-close-btn"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceBookingManagement;