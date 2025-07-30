import React, { useState } from 'react';
import { 
  FaShoppingBag, FaFilter, FaCalendarAlt, 
  FaCheckCircle, FaTruck, FaClock, 
  FaExclamationTriangle, FaArrowRight, FaStar
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './PartsPurchase.css';

const PartsPurchase = () => {
  // Sample parts purchase data
  const allPurchases = [
    {
      id: 1,
      date: '2023-08-15',
      partName: 'Premium Brake Pads',
      partImage: 'https://via.placeholder.com/300x200?text=Brake+Pads',
      vehicle: 'Toyota Corolla 2020',
      status: 'delivered',
      cost: 59.99,
      quantity: 2,
      trackingNumber: 'TRK12345678',
      rating: 5
    },
    {
      id: 2,
      date: '2023-07-22',
      partName: 'Performance Air Filter',
      partImage: 'https://via.placeholder.com/300x200?text=Air+Filter',
      vehicle: 'Toyota Corolla 2020',
      status: 'shipped',
      cost: 39.99,
      quantity: 1,
      trackingNumber: 'TRK87654321',
      rating: null
    },
    {
      id: 3,
      date: '2023-06-10',
      partName: 'Synthetic Motor Oil 5W-30',
      partImage: 'https://via.placeholder.com/300x200?text=Motor+Oil',
      vehicle: 'Toyota Corolla 2020',
      status: 'processing',
      cost: 34.99,
      quantity: 3,
      trackingNumber: null,
      rating: null
    },
    {
      id: 4,
      date: '2023-05-05',
      partName: 'LED Headlight Bulbs',
      partImage: 'https://via.placeholder.com/300x200?text=LED+Bulbs',
      vehicle: 'Toyota Corolla 2020',
      status: 'delivered',
      cost: 89.99,
      quantity: 1,
      trackingNumber: 'TRK13579246',
      rating: 4
    },
    {
      id: 5,
      date: '2023-04-18',
      partName: 'Car Battery',
      partImage: 'https://via.placeholder.com/300x200?text=Battery',
      vehicle: 'Toyota Corolla 2020',
      status: 'delivered',
      cost: 129.99,
      quantity: 1,
      trackingNumber: 'TRK24681357',
      rating: 3
    }
  ];

  const [filter, setFilter] = useState('all');
  const [showPromo, setShowPromo] = useState(true);

  // Sort purchases by date in descending order (most recent first)
  const sortedPurchases = [...allPurchases].sort((a, b) => new Date(b.date) - new Date(a.date));

  const filteredPurchases = filter === 'all' 
    ? sortedPurchases 
    : sortedPurchases.filter(purchase => purchase.status === filter);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'delivered':
        return <FaCheckCircle className="status-icon delivered" />;
      case 'shipped':
        return <FaTruck className="status-icon shipped" />;
      case 'processing':
        return <FaClock className="status-icon processing" />;
      default:
        return <FaExclamationTriangle className="status-icon unknown" />;
    }
  };

  const statusCounts = {
    all: allPurchases.length,
    delivered: allPurchases.filter(p => p.status === 'delivered').length,
    shipped: allPurchases.filter(p => p.status === 'shipped').length,
    processing: allPurchases.filter(p => p.status === 'processing').length
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'processing': return 'Processing';
      default: return 'Unknown';
    }
  };

  return (
    <div className="parts-purchase-container">
      <div className="parts-purchase-header">
        <h2><FaShoppingBag /> Parts Purchase History</h2>
        <div className="filter-controls">
          <div className="filter-buttons">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({statusCounts.all})
            </button>
            <button 
              className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`}
              onClick={() => setFilter('delivered')}
            >
              Delivered ({statusCounts.delivered})
            </button>
            <button 
              className={`filter-btn ${filter === 'shipped' ? 'active' : ''}`}
              onClick={() => setFilter('shipped')}
            >
              Shipped ({statusCounts.shipped})
            </button>
            <button 
              className={`filter-btn ${filter === 'processing' ? 'active' : ''}`}
              onClick={() => setFilter('processing')}
            >
              Processing ({statusCounts.processing})
            </button>
          </div>
        </div>
      </div>

      {showPromo && (
        <div className="parts-promo-card">
          <div className="promo-content">
            <h3>Need More Parts?</h3>
            <p>Get 15% off your next order when you spend $100 or more!</p>
            <div className="promo-highlights">
              <div className="highlight-item">
                <FaCheckCircle className="highlight-icon" />
                <span>Genuine OEM and aftermarket parts</span>
              </div>
              <div className="highlight-item">
                <FaCheckCircle className="highlight-icon" />
                <span>Fast nationwide shipping</span>
              </div>
              <div className="highlight-item">
                <FaCheckCircle className="highlight-icon" />
                <span>Easy returns within 30 days</span>
              </div>
            </div>
            <Link to="/parts" className="promo-cta-btn">
              Shop Now <FaArrowRight />
            </Link>
          </div>
          <div className="promo-image">
            <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785" alt="Auto Parts" />
          </div>
          <button 
            className="close-promo-btn"
            onClick={() => setShowPromo(false)}
          >
            ×
          </button>
        </div>
      )}

      <div className="purchase-list">
        {filteredPurchases.length > 0 ? (
          filteredPurchases.map(purchase => (
            <div key={purchase.id} className="purchase-card">
              <div className="purchase-image">
                <img src={purchase.partImage} alt={purchase.partName} />
              </div>
              
              <div className="purchase-details">
                <div className="purchase-header">
                  <h3>{purchase.partName}</h3>
                  <div className="purchase-status">
                    {getStatusIcon(purchase.status)}
                    <span className={`status-text ${purchase.status}`}>
                      {getStatusText(purchase.status)}
                    </span>
                  </div>
                </div>
                
                <div className="detail-row">
                  <FaCalendarAlt className="detail-icon" />
                  <span>{new Date(purchase.date).toLocaleDateString()}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Vehicle:</span>
                  <span>{purchase.vehicle}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Quantity:</span>
                  <span>{purchase.quantity}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Total:</span>
                  <span className="purchase-cost">${(purchase.cost * purchase.quantity).toFixed(2)}</span>
                </div>
                
                {purchase.trackingNumber && (
                  <div className="detail-row">
                    <span className="detail-label">Tracking #:</span>
                    <span className="tracking-number">{purchase.trackingNumber}</span>
                  </div>
                )}
                
                {purchase.status === 'delivered' && (
                  <div className="purchase-actions">
                    {purchase.rating ? (
                      <div className="rating-display">
                        <FaStar className="rating-star" />
                        <span>{purchase.rating}/5</span>
                      </div>
                    ) : (
                      <button className="review-btn">
                        Rate This Product
                      </button>
                    )}
                    <button className="reorder-btn">
                      Reorder
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="no-purchases">
            <p>No purchases found matching your filter</p>
            <Link to="/parts" className="shop-parts-btn">
              Shop Parts
            </Link>
          </div>
        )}
      </div>

      <div className="quick-links-section">
        <h3>Quick Links</h3>
        <div className="quick-links">
          <Link to="/parts/brakes" className="quick-link">
            Brake Parts
          </Link>
          <Link to="/parts/engine" className="quick-link">
            Engine Components
          </Link>
          <Link to="/parts/lighting" className="quick-link">
            Lighting
          </Link>
          <Link to="/parts/tools" className="quick-link">
            Tools & Equipment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PartsPurchase;