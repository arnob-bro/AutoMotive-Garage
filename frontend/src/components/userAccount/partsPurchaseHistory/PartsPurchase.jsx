import React, { useState } from 'react';
import { 
  FaShoppingBag, FaFilter, FaCalendarAlt, 
  FaCheckCircle, FaTruck, FaClock, 
  FaExclamationTriangle, FaArrowRight, FaStar
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './PartsPurchase.css';

const PartsPurchase = () => {
  // Sample parts purchase data with Bangladesh-related addresses and proper image links
  const allPurchases = [
    {
      id: 1,
      date: '2023-08-15',
      partName: 'Premium Brake Pads',
      partImage: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      vehicle: 'Toyota Corolla 2020',
      status: 'delivered',
      cost: 59.99,
      quantity: 2,
      trackingNumber: 'TRK12345678',
      rating: 5,
      address: 'House 12, Road 5, Dhanmondi, Dhaka 1205, Bangladesh'
    },
    {
      id: 2,
      date: '2023-07-22',
      partName: 'Performance Air Filter',
      partImage: 'https://images.unsplash.com/photo-1597931757101-41e31d1c5f07?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      vehicle: 'Toyota Corolla 2020',
      status: 'shipped',
      cost: 39.99,
      quantity: 1,
      trackingNumber: 'TRK87654321',
      rating: null,
      address: 'Plot 15, Block B, Bashundhara R/A, Dhaka 1229, Bangladesh'
    },
    {
      id: 3,
      date: '2023-06-10',
      partName: 'Synthetic Motor Oil 5W-30',
      partImage: 'https://images.unsplash.com/photo-1619860869602-b1ec26b5fc7e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      vehicle: 'Toyota Corolla 2020',
      status: 'processing',
      cost: 34.99,
      quantity: 3,
      trackingNumber: null,
      rating: null,
      address: 'Shop 5, Gulshan 1, Dhaka 1212, Bangladesh'
    },
    {
      id: 4,
      date: '2023-05-05',
      partName: 'LED Headlight Bulbs',
      partImage: 'https://images.unsplash.com/photo-1580300611080-9a37a5a1e8e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      vehicle: 'Toyota Corolla 2020',
      status: 'delivered',
      cost: 89.99,
      quantity: 1,
      trackingNumber: 'TRK13579246',
      rating: 4,
      address: 'House 45, Road 7, Banani, Dhaka 1213, Bangladesh'
    },
    {
      id: 5,
      date: '2023-04-18',
      partName: 'Car Battery',
      partImage: 'https://images.unsplash.com/photo-1566647387313-9fda80664848?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
      vehicle: 'Toyota Corolla 2020',
      status: 'delivered',
      cost: 129.99,
      quantity: 1,
      trackingNumber: 'TRK24681357',
      rating: 3,
      address: 'Shop 22, Mirpur 10, Dhaka 1216, Bangladesh'
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
        return <FaCheckCircle className="pp-status-icon pp-delivered" />;
      case 'shipped':
        return <FaTruck className="pp-status-icon pp-shipped" />;
      case 'processing':
        return <FaClock className="pp-status-icon pp-processing" />;
      default:
        return <FaExclamationTriangle className="pp-status-icon pp-unknown" />;
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
    <div className="pp-container">
      <div className="pp-header">
        <h2><FaShoppingBag /> Parts Purchase History</h2>
        <div className="pp-filter-controls">
          <div className="pp-filter-buttons">
            <button 
              className={`pp-filter-btn ${filter === 'all' ? 'pp-active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All ({statusCounts.all})
            </button>
            <button 
              className={`pp-filter-btn ${filter === 'delivered' ? 'pp-active' : ''}`}
              onClick={() => setFilter('delivered')}
            >
              Delivered ({statusCounts.delivered})
            </button>
            <button 
              className={`pp-filter-btn ${filter === 'shipped' ? 'pp-active' : ''}`}
              onClick={() => setFilter('shipped')}
            >
              Shipped ({statusCounts.shipped})
            </button>
            <button 
              className={`pp-filter-btn ${filter === 'processing' ? 'pp-active' : ''}`}
              onClick={() => setFilter('processing')}
            >
              Processing ({statusCounts.processing})
            </button>
          </div>
        </div>
      </div>

      {showPromo && (
        <div className="pp-promo-card">
          <div className="pp-promo-content">
            <h3>Need More Parts?</h3>
            <p>Get 15% off your next order when you spend ৳5000 or more!</p>
            <div className="pp-promo-highlights">
              <div className="pp-highlight-item">
                <FaCheckCircle className="pp-highlight-icon" />
                <span>Genuine OEM and aftermarket parts</span>
              </div>
              <div className="pp-highlight-item">
                <FaCheckCircle className="pp-highlight-icon" />
                <span>Fast nationwide shipping across Bangladesh</span>
              </div>
              <div className="pp-highlight-item">
                <FaCheckCircle className="pp-highlight-icon" />
                <span>Easy returns within 30 days</span>
              </div>
            </div>
            <Link to="/parts" className="pp-promo-cta-btn">
              Shop Now <FaArrowRight />
            </Link>
          </div>
          <div className="pp-promo-image">
            <img src="https://images.unsplash.com/photo-1601362840469-51e4d8d58785?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Auto Parts" />
          </div>
          <button 
            className="pp-close-promo-btn"
            onClick={() => setShowPromo(false)}
          >
            ×
          </button>
        </div>
      )}

      <div className="pp-purchase-list">
        {filteredPurchases.length > 0 ? (
          filteredPurchases.map(purchase => (
            <div key={purchase.id} className="pp-purchase-card">
              <div className="pp-purchase-image">
                <img src={purchase.partImage} alt={purchase.partName} />
              </div>
              
              <div className="pp-purchase-details">
                <div className="pp-purchase-header">
                  <h3>{purchase.partName}</h3>
                  <div className="pp-purchase-status">
                    {getStatusIcon(purchase.status)}
                    <span className={`pp-status-text pp-${purchase.status}`}>
                      {getStatusText(purchase.status)}
                    </span>
                  </div>
                </div>
                
                <div className="pp-detail-row">
                  <FaCalendarAlt className="pp-detail-icon" />
                  <span>{new Date(purchase.date).toLocaleDateString()}</span>
                </div>
                
                <div className="pp-detail-row">
                  <span className="pp-detail-label">Vehicle:</span>
                  <span>{purchase.vehicle}</span>
                </div>
                
                <div className="pp-detail-row">
                  <span className="pp-detail-label">Quantity:</span>
                  <span>{purchase.quantity}</span>
                </div>
                
                <div className="pp-detail-row">
                  <span className="pp-detail-label">Total:</span>
                  <span className="pp-purchase-cost">৳{(purchase.cost * purchase.quantity).toFixed(2)}</span>
                </div>
                
                <div className="pp-detail-row">
                  <span className="pp-detail-label">Address:</span>
                  <span>{purchase.address}</span>
                </div>
                
                {purchase.trackingNumber && (
                  <div className="pp-detail-row">
                    <span className="pp-detail-label">Tracking #:</span>
                    <span className="pp-tracking-number">{purchase.trackingNumber}</span>
                  </div>
                )}
                
                {/* Commented out the review portion */}
                {/* {purchase.status === 'delivered' && (
                  <div className="pp-purchase-actions">
                    {purchase.rating ? (
                      <div className="pp-rating-display">
                        <FaStar className="pp-rating-star" />
                        <span>{purchase.rating}/5</span>
                      </div>
                    ) : (
                      <button className="pp-review-btn">
                        Leave a Review
                      </button>
                    )}
                  </div>
                )} */}
              </div>
            </div>
          ))
        ) : (
          <div className="pp-no-purchases">
            <p>No purchases found matching your filter</p>
            <Link to="/parts" className="pp-shop-parts-btn">
              Shop Parts
            </Link>
          </div>
        )}
      </div>


    </div>
  );
};

export default PartsPurchase;