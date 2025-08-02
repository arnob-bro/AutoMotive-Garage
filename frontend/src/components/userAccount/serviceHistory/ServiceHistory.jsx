import React, { useState } from 'react';
import { 
  FaHistory, FaFilter, FaCalendarAlt, FaCar, 
  FaTools, FaCheckCircle, FaSpinner, FaPlusCircle,
  FaClock, FaExclamationTriangle, FaArrowRight
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './ServiceHistory.css';

const ServiceHistory = () => {
  // Sample service data with Bangladesh-related information
  const allServices = [
    {
      id: 1,
      date: '2023-05-15',
      serviceType: 'Oil Change',
      vehicle: 'Toyota Corolla 2020',
      status: 'completed',
      cost: 4500,
      duration: '1 hour',
      location: 'Dhaka Auto Care, Gulshan'
    },
    {
      id: 2,
      date: '2023-06-20',
      serviceType: 'Brake Inspection',
      vehicle: 'Toyota Corolla 2020',
      status: 'completed',
      cost: 2500,
      duration: '45 mins',
      location: 'Chittagong Car Service, Agrabad'
    },
    {
      id: 3,
      date: '2023-07-10',
      serviceType: 'Tire Rotation',
      vehicle: 'Toyota Corolla 2020',
      status: 'in-progress',
      cost: 2000,
      duration: '30 mins',
      location: 'Khulna Auto Workshop, Khalishpur'
    },
    {
      id: 4,
      date: '2023-08-05',
      serviceType: 'Engine Diagnostics',
      vehicle: 'Toyota Corolla 2020',
      status: 'pending',
      cost: 5000,
      duration: '2 hours',
      location: 'Sylhet Motor Care, Zindabazar'
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
        return <FaCheckCircle className="sh-status-icon sh-completed" />;
      case 'in-progress':
        return <FaSpinner className="sh-status-icon sh-in-progress" />;
      case 'pending':
        return <FaClock className="sh-status-icon sh-pending" />;
      default:
        return <FaExclamationTriangle className="sh-status-icon sh-unknown" />;
    }
  };

  const statusCounts = {
    all: allServices.length,
    completed: allServices.filter(s => s.status === 'completed').length,
    'in-progress': allServices.filter(s => s.status === 'in-progress').length,
    pending: allServices.filter(s => s.status === 'pending').length
  };

  return (
    <div className="sh-container">
      <div className="sh-header">
        <h2><FaHistory className="sh-header-icon" /> Service History</h2>
        <div className="sh-filter-controls">
          <div className="sh-filter-buttons">
            <button 
              className={`sh-filter-btn ${filter === 'all' ? 'sh-active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({statusCounts.all})
            </button>
            <button 
              className={`sh-filter-btn ${filter === 'completed' ? 'sh-active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({statusCounts.completed})
            </button>
            <button 
              className={`sh-filter-btn ${filter === 'in-progress' ? 'sh-active' : ''}`}
              onClick={() => setFilter('in-progress')}
            >
              In Progress ({statusCounts['in-progress']})
            </button>
            <button 
              className={`sh-filter-btn ${filter === 'pending' ? 'sh-active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending ({statusCounts.pending})
            </button>
          </div>
        </div>
      </div>

      {showBookingPromo && (
        <div className="sh-booking-promo-card">
          <div className="sh-promo-content">
            <h3><FaPlusCircle className="sh-promo-icon" /> Need Another Service?</h3>
            <p>Book your next service now and get 10% off your first maintenance package!</p>
            <div className="sh-promo-highlights">
              <div className="sh-highlight-item">
                <FaCheckCircle className="sh-highlight-icon" />
                <span>Quick online booking</span>
              </div>
              <div className="sh-highlight-item">
                <FaCheckCircle className="sh-highlight-icon" />
                <span>Flexible scheduling</span>
              </div>
              <div className="sh-highlight-item">
                <FaCheckCircle className="sh-highlight-icon" />
                <span>Expert technicians</span>
              </div>
            </div>
            <Link to="/services" className="sh-promo-cta-btn">
              Book Now <FaArrowRight className="sh-arrow-icon" />
            </Link>
          </div>
          <div className="sh-promo-image">
            <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537" alt="Car Service" />
          </div>
          <button 
            className="sh-close-promo-btn"
            onClick={() => setShowBookingPromo(false)}
            aria-label="Close promotion"
          >
            ×
          </button>
        </div>
      )}

      <div className="sh-service-list">
        {filteredServices.length > 0 ? (
          filteredServices.map(service => (
            <div key={service.id} className="sh-service-card">
              <div className="sh-service-header">
                <div className="sh-service-type">
                  <FaTools className="sh-service-icon" />
                  <h3>{service.serviceType}</h3>
                </div>
                <div className="sh-service-status">
                  {getStatusIcon(service.status)}
                  <span className={`sh-status-text sh-${service.status}`}>
                    {service.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
              
              <div className="sh-service-details">
                <div className="sh-detail-row">
                  <FaCalendarAlt className="sh-detail-icon" />
                  <span>{new Date(service.date).toLocaleDateString()}</span>
                </div>
                <div className="sh-detail-row">
                  <FaCar className="sh-detail-icon" />
                  <span>{service.vehicle}</span>
                </div>
                <div className="sh-detail-row">
                  <span className="sh-detail-label">Location:</span>
                  <span>{service.location}</span>
                </div>
                <div className="sh-detail-row">
                  <span className="sh-detail-label">Duration:</span>
                  <span>{service.duration}</span>
                </div>
                <div className="sh-detail-row">
                  <span className="sh-detail-label">Cost:</span>
                  <span className="sh-service-cost">BDT {service.cost.toLocaleString()}</span>
                </div>
              </div>
            
             
            </div>
          ))
        ) : (
          <div className="sh-no-services">
            <p>No services found matching your filter</p>
            <Link to="/services" className="sh-book-service-btn">
              Book a Service Now
            </Link>
          </div>
        )}
      </div>

      {/* Commented out quick book section as requested */}
      {/*
      <div className="sh-quick-book-section">
        <h3>Quick Book</h3>
        <p>Schedule your next service in just a few clicks</p>
        <div className="sh-quick-book-options">
          <Link to="/services/oil-change" className="sh-quick-book-option">
            <FaTools className="sh-option-icon" />
            <span>Oil Change</span>
          </Link>
          <Link to="/services/tire-rotation" className="sh-quick-book-option">
            <FaCar className="sh-option-icon" />
            <span>Tire Rotation</span>
          </Link>
          <Link to="/services/brake-service" className="sh-quick-book-option">
            <FaTools className="sh-option-icon" />
            <span>Brake Service</span>
          </Link>
        </div>
      </div>
      */}
    </div>
  );
};

export default ServiceHistory;