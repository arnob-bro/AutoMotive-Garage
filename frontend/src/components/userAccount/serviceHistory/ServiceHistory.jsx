import React, { useState } from 'react';
import { 
  FaHistory, FaFilter, FaCalendarAlt, FaCar, 
  FaTools, FaCheckCircle, FaSpinner, FaPlusCircle,
  FaClock, FaExclamationTriangle, FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ServiceHistory.css';

const ServiceHistory = () => {
  // Sample service data
  const allServices = [
    {
      id: 1,
      date: '2023-05-15',
      serviceType: 'Oil Change',
      vehicle: 'Toyota Corolla 2020',
      status: 'completed',
      cost: 89.99,
      duration: '1 hour'
    },
    {
      id: 2,
      date: '2023-06-20',
      serviceType: 'Brake Inspection',
      vehicle: 'Toyota Corolla 2020',
      status: 'completed',
      cost: 49.99,
      duration: '45 mins'
    },
    {
      id: 3,
      date: '2023-07-10',
      serviceType: 'Tire Rotation',
      vehicle: 'Toyota Corolla 2020',
      status: 'in-progress',
      cost: 39.99,
      duration: '30 mins'
    },
    {
      id: 4,
      date: '2023-08-05',
      serviceType: 'Engine Diagnostics',
      vehicle: 'Toyota Corolla 2020',
      status: 'pending',
      cost: 99.99,
      duration: '2 hours'
    }
  ];

  const [filter, setFilter] = useState('all');
  const [showBookingPromo, setShowBookingPromo] = useState(true);

  // Sort services by date in descending order (most recent first)
  const sortedServices = [...allServices].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredServices = filter === 'all' 
    ? sortedServices 
    : sortedServices.filter(service => service.status === filter);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed':
        return <FaCheckCircle className="status-icon completed" />;
      case 'in-progress':
        return <FaSpinner className="status-icon in-progress" />;
      case 'pending':
        return <FaClock className="status-icon pending" />;
      default:
        return <FaExclamationTriangle className="status-icon unknown" />;
    }
  };

  const statusCounts = {
    all: allServices.length,
    completed: allServices.filter(s => s.status === 'completed').length,
    'in-progress': allServices.filter(s => s.status === 'in-progress').length,
    pending: allServices.filter(s => s.status === 'pending').length
  };

  return (
    <div className="service-history-container">
      <div className="service-history-header">
        <h2><FaHistory /> Service History</h2>
        <div className="filter-controls">
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
              className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
              onClick={() => setFilter('in-progress')}
            >
              In Progress ({statusCounts['in-progress']})
            </button>
            <button 
              className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({statusCounts.pending})
            </button>
          </div>
        </div>
      </div>

      {showBookingPromo && (
        <div className="booking-promo-card">
          <div className="promo-content">
            <h3><FaPlusCircle /> Need Another Service?</h3>
            <p>Book your next service now and get 10% off your first maintenance package!</p>
            <div className="promo-highlights">
              <div className="highlight-item">
                <FaCheckCircle className="highlight-icon" />
                <span>Quick online booking</span>
              </div>
              <div className="highlight-item">
                <FaCheckCircle className="highlight-icon" />
                <span>Flexible scheduling</span>
              </div>
              <div className="highlight-item">
                <FaCheckCircle className="highlight-icon" />
                <span>Expert technicians</span>
              </div>
            </div>
            <Link to="/services" className="promo-cta-btn">
              Book Now <FaArrowRight />
            </Link>
          </div>
          <div className="promo-image">
            <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537" alt="Car Service" />
          </div>
          <button 
            className="close-promo-btn"
            onClick={() => setShowBookingPromo(false)}
          >
            ×
          </button>
        </div>
      )}

      <div className="service-list">
        {filteredServices.length > 0 ? (
          filteredServices.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-header">
                <div className="service-type">
                  <FaTools className="service-icon" />
                  <h3>{service.serviceType}</h3>
                </div>
                <div className="service-status">
                  {getStatusIcon(service.status)}
                  <span className={`status-text ${service.status}`}>
                    {service.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="service-details">
                <div className="detail-row">
                  <FaCalendarAlt className="detail-icon" />
                  <span>{new Date(service.date).toLocaleDateString()}</span>
                </div>
                <div className="detail-row">
                  <FaCar className="detail-icon" />
                  <span>{service.vehicle}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Duration:</span>
                  <span>{service.duration}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Cost:</span>
                  <span className="service-cost">${service.cost.toFixed(2)}</span>
                </div>
              </div>

              {service.status === 'completed' && (
                <button className="review-btn">
                  Leave a Review
                </button>
              )}
            </div>
          ))
        ) : (
          <div className="no-services">
            <p>No services found matching your filter</p>
            <Link to="/services" className="book-service-btn">
              Book a Service Now
            </Link>
          </div>
        )}
      </div>

      <div className="quick-book-section">
        <h3>Quick Book</h3>
        <p>Schedule your next service in just a few clicks</p>
        <div className="quick-book-options">
          <Link to="/services/oil-change" className="quick-book-option">
            <FaTools className="option-icon" />
            <span>Oil Change</span>
          </Link>
          <Link to="/services/tire-rotation" className="quick-book-option">
            <FaCar className="option-icon" />
            <span>Tire Rotation</span>
          </Link>
          <Link to="/services/brake-service" className="quick-book-option">
            <FaTools className="option-icon" />
            <span>Brake Service</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceHistory;