import React, { useState, useEffect } from 'react';
import { 
  FaCalendarAlt, FaFilter, FaCheckCircle, 
  FaSpinner, FaTimes, FaUserCog, 
  FaDollarSign, FaCar, FaTools, FaSearch,
  FaHistory, FaClipboardCheck
} from 'react-icons/fa';
import './ServiceBookingManagement.css';

const ServiceBookingManagement = () => {
  // Sample booking data
  const allBookings = [
    {
      id: 1,
      bookingId: 'BK-2023-001',
      customer: 'John Doe',
      vehicle: 'Toyota Corolla 2020',
      services: ['Oil Change', 'Tire Rotation'],
      date: '2023-06-15',
      time: '09:30 AM',
      status: 'confirmed',
      paymentStatus: 'paid',
      assignedTo: 'Mechanic 1',
      total: 109.98,
      duration: '1 hour 15 mins'
    },
    {
      id: 2,
      bookingId: 'BK-2023-002',
      customer: 'Jane Smith',
      vehicle: 'Honda Civic 2019',
      services: ['Brake Inspection', 'AC Check'],
      date: '2023-06-16',
      time: '11:00 AM',
      status: 'in-progress',
      paymentStatus: 'paid',
      assignedTo: 'Mechanic 2',
      total: 169.98,
      duration: '2 hours'
    },
    {
      id: 3,
      bookingId: 'BK-2023-003',
      customer: 'Robert Johnson',
      vehicle: 'Ford F-150 2021',
      services: ['Engine Tune-Up'],
      date: '2023-06-17',
      time: '02:00 PM',
      status: 'pending',
      paymentStatus: 'pending',
      assignedTo: '',
      total: 199.99,
      duration: '2 hours'
    },
    {
      id: 4,
      bookingId: 'BK-2023-004',
      customer: 'Emily Davis',
      vehicle: 'Tesla Model 3 2022',
      services: ['Full Detailing'],
      date: '2023-06-18',
      time: '10:00 AM',
      status: 'completed',
      paymentStatus: 'paid',
      assignedTo: 'Mechanic 3',
      total: 249.99,
      duration: '3 hours'
    },
    {
      id: 5,
      bookingId: 'BK-2023-005',
      customer: 'Michael Wilson',
      vehicle: 'Chevrolet Silverado 2020',
      services: ['Transmission Flush', 'Battery Service'],
      date: '2023-06-19',
      time: '03:30 PM',
      status: 'completed',
      paymentStatus: 'paid',
      assignedTo: 'Mechanic 1',
      total: 319.98,
      duration: '2 hours 30 mins'
    }
  ];

  const [bookings, setBookings] = useState(allBookings);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedMechanic, setSelectedMechanic] = useState('');
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Available mechanics
  const mechanics = ['Mechanic 1', 'Mechanic 2', 'Mechanic 3', 'Mechanic 4'];

  useEffect(() => {
    // Filter bookings based on active tab and search term
    let filtered = allBookings;
    
    if (activeTab === 'completed') {
      filtered = filtered.filter(booking => booking.status === 'completed');
    } else if (activeTab !== 'all') {
      filtered = filtered.filter(booking => booking.status === activeTab);
    }
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.customer.toLowerCase().includes(term) ||
        booking.vehicle.toLowerCase().includes(term) ||
        booking.bookingId.toLowerCase().includes(term)
      );
    }
    
    setBookings(filtered);
  }, [activeTab, searchTerm]);

  const handleAssignMechanic = (booking) => {
    setSelectedBooking(booking);
    setSelectedMechanic(booking.assignedTo || '');
    setShowAssignModal(true);
  };

  const confirmAssignment = () => {
    const updatedBookings = allBookings.map(booking => 
      booking.id === selectedBooking.id 
        ? { ...booking, assignedTo: selectedMechanic, status: 'confirmed' } 
        : booking
    );
    
    setBookings(updatedBookings);
    setShowAssignModal(false);
    setSelectedBooking(null);
  };

  const updateBookingStatus = (bookingId, newStatus) => {
    const updatedBookings = allBookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus } 
        : booking
    );
    
    setBookings(updatedBookings);
  };

  const viewBookingDetails = (booking) => {
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
      default:
        return <FaTimes className="sbm-status-icon sbm-unknown" />;
    }
  };

  const statusCounts = {
    all: allBookings.length,
    confirmed: allBookings.filter(b => b.status === 'confirmed').length,
    'in-progress': allBookings.filter(b => b.status === 'in-progress').length,
    completed: allBookings.filter(b => b.status === 'completed').length,
    pending: allBookings.filter(b => b.status === 'pending').length
  };

  return (
    <div className="sbm-page-container">
      <div className="sbm-content-container">
        <div className="sbm-header">
          <h2 className="sbm-title">Service Bookings Management</h2>
          <p className="sbm-subtitle">Manage all customer service bookings and assignments</p>
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
                <div className="sbm-table-col sbm-col-mechanic">Mechanic</div>
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
                      <div className={`sbm-payment-badge sbm-${booking.paymentStatus}`}>
                        <FaDollarSign className="sbm-payment-icon" />
                        <span>{booking.paymentStatus}</span>
                      </div>
                    </div>
                    <div className="sbm-table-col sbm-col-mechanic">
                      {booking.assignedTo || 'Unassigned'}
                    </div>
                    <div className="sbm-table-col sbm-col-actions">
                      <button 
                        className="sbm-action-btn sbm-view-btn"
                        onClick={() => viewBookingDetails(booking)}
                      >
                        View
                      </button>
                      {booking.status !== 'completed' && (
                        <button 
                          className="sbm-action-btn sbm-assign-btn"
                          onClick={() => handleAssignMechanic(booking)}
                        >
                          <FaUserCog className="sbm-assign-icon" />
                          Assign
                        </button>
                      )}
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

        {/* Assign Mechanic Modal */}
        {showAssignModal && selectedBooking && (
          <div className="sbm-modal-overlay">
            <div className="sbm-modal">
              <div className="sbm-modal-header">
                <h3>Assign Mechanic</h3>
                <button 
                  className="sbm-modal-close"
                  onClick={() => setShowAssignModal(false)}
                >
                  <FaTimes />
                </button>
              </div>
              <div className="sbm-modal-body">
                <div className="sbm-assign-info">
                  <p><strong>Booking ID:</strong> {selectedBooking.bookingId}</p>
                  <p><strong>Customer:</strong> {selectedBooking.customer}</p>
                  <p><strong>Vehicle:</strong> {selectedBooking.vehicle}</p>
                  <p><strong>Services:</strong> {selectedBooking.services.join(', ')}</p>
                </div>
                
                <div className="sbm-form-group">
                  <label>Select Mechanic:</label>
                  <select
                    value={selectedMechanic}
                    onChange={(e) => setSelectedMechanic(e.target.value)}
                    className="sbm-mechanic-select"
                  >
                    <option value="">Select Mechanic</option>
                    {mechanics.map(mechanic => (
                      <option key={mechanic} value={mechanic}>{mechanic}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sbm-modal-footer">
                <button 
                  className="sbm-btn sbm-cancel-btn"
                  onClick={() => setShowAssignModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="sbm-btn sbm-confirm-btn"
                  onClick={confirmAssignment}
                  disabled={!selectedMechanic}
                >
                  Confirm Assignment
                </button>
              </div>
            </div>
          </div>
        )}

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
                    <span className="sbm-detail-value">{selectedBooking.customer}</span>
                  </div>
                  <div className="sbm-detail-item">
                    <span className="sbm-detail-label">Vehicle:</span>
                    <span className="sbm-detail-value">
                      <FaCar className="sbm-detail-icon" /> {selectedBooking.vehicle}
                    </span>
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
                      <div className={`sbm-payment-badge sbm-${selectedBooking.paymentStatus}`}>
                        <FaDollarSign className="sbm-payment-icon" />
                        <span>{selectedBooking.paymentStatus}</span>
                      </div>
                    </span>
                  </div>
                  <div className="sbm-detail-item">
                    <span className="sbm-detail-label">Assigned Mechanic:</span>
                    <span className="sbm-detail-value">
                      {selectedBooking.assignedTo || 'Not assigned'}
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
                    <span className="sbm-detail-value">{selectedBooking.duration}</span>
                  </div>
                  <div className="sbm-detail-item">
                    <span className="sbm-detail-label">Total Amount:</span>
                    <span className="sbm-detail-value sbm-total-amount">
                      ${selectedBooking.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="sbm-modal-footer">
                {selectedBooking.status === 'pending' && (
                  <button 
                    className="sbm-btn sbm-confirm-btn"
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'confirmed');
                      setShowDetailsModal(false);
                    }}
                  >
                    Confirm Booking
                  </button>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <button 
                    className="sbm-btn sbm-start-btn"
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'in-progress');
                      setShowDetailsModal(false);
                    }}
                  >
                    Start Service
                  </button>
                )}
                {selectedBooking.status === 'in-progress' && (
                  <button 
                    className="sbm-btn sbm-complete-btn"
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'completed');
                      setShowDetailsModal(false);
                    }}
                  >
                    Mark as Completed
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