import React, { useState } from 'react';
import { 
  FaStar, FaCalendarAlt, FaSearch, FaEye
} from 'react-icons/fa';
import './ManageReview.css';

const ManageReview = () => {
  // Sample review data
  const initialReviews = [
    {
      id: 'REV-1001',
      customerId: 'CUS-2023-081',
      customerName: 'John Smith',
      type: 'service',
      serviceName: 'Oil Change Service',
      rating: 5,
      comment: 'Excellent service! The staff was very professional and the work was done quickly. Will definitely come back.',
      createdAt: '2023-08-22 14:32:45'
    },
    {
      id: 'REV-1002',
      customerId: 'CUS-2023-072',
      customerName: 'Sarah Johnson',
      type: 'parts',
      partName: 'Premium Brake Pads',
      rating: 4,
      comment: 'Great quality parts. Installation was smooth and they work perfectly. Only giving 4 stars because the price was a bit high.',
      createdAt: '2023-08-18 09:15:22'
    },
    {
      id: 'REV-1003',
      customerId: 'CUS-2023-063',
      customerName: 'Michael Brown',
      type: 'service',
      serviceName: 'Brake Inspection',
      rating: 3,
      comment: 'Service was okay but took longer than expected. The technician was knowledgeable though.',
      createdAt: '2023-07-30 16:45:10'
    }
  ];

  const [reviews] = useState(initialReviews);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [selectedReview, setSelectedReview] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Review type options for filtering
  const typeOptions = ['all', 'service', 'parts'];
  
  // Date range options for filtering
  const dateOptions = ['all', 'today', 'week', 'month', 'quarter'];

  // Filter reviews based on search and filters
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.customerId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || review.type === filterType;
    
    const now = new Date();
    const reviewDate = new Date(review.createdAt);
    const matchesDate = filterDate === 'all' ||
                      (filterDate === 'today' && reviewDate.toDateString() === now.toDateString()) ||
                      (filterDate === 'week' && (now - reviewDate) <= 7 * 24 * 60 * 60 * 1000) ||
                      (filterDate === 'month' && reviewDate.getMonth() === now.getMonth() && reviewDate.getFullYear() === now.getFullYear()) ||
                      (filterDate === 'quarter' && Math.floor(reviewDate.getMonth() / 3) === Math.floor(now.getMonth() / 3) && reviewDate.getFullYear() === now.getFullYear());
    
    return matchesSearch && matchesType && matchesDate;
  });

  // Render star rating
  const renderStars = (rating) => {
    return (
      <div className="review-star-rating">
        {[...Array(5)].map((_, i) => (
          <FaStar 
            key={i} 
            color={i < rating ? "#ffc107" : "#e4e5e9"} 
            size={16}
          />
        ))}
      </div>
    );
  };

  // Open review details modal
  const openDetailModal = (review) => {
    setSelectedReview(review);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="review-admin-container">
      <div className="review-header">
        <h1><FaStar /> Review Management</h1>
        <p>View and manage all customer reviews</p>
      </div>

      <div className="review-controls">
        <div className="review-search-container">
          <div className="review-search-box">
            <FaSearch className="review-search-icon" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="review-search-input"
            />
          </div>
          
          <div className="review-filter-container">
            <div className="review-filter-group">
              <div className="review-filter-dropdown">
                <label className="review-filter-label">
                  <FaStar className="review-filter-icon" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="review-filter-select"
                  >
                    <option value="all">All Types</option>
                    {typeOptions.filter(t => t !== 'all').map(type => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              
              <div className="review-filter-dropdown">
                <label className="review-filter-label">
                  <FaCalendarAlt className="review-filter-icon" />
                  <select
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="review-filter-select"
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="quarter">This Quarter</option>
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="review-table-wrapper">
        {filteredReviews.length > 0 ? (
          <table className="review-table">
            <thead>
              <tr>
                <th>Review ID</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Rating</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map(review => (
                <tr key={review.id} className="review-table-row">
                  <td className="review-id">{review.id}</td>
                  <td className="review-customer-cell">
                    <div className="review-customer-name">{review.customerName}</div>
                    <div className="review-customer-id">{review.customerId}</div>
                  </td>
                  <td className="review-type-cell">
                    <div className="review-item-name">
                      {review.type === 'service' ? review.serviceName : review.partName}
                    </div>
                    <div className="review-type-badge">{review.type}</div>
                  </td>
                  <td className="review-rating-cell">
                    {renderStars(review.rating)}
                    <div className="review-rating-value">{review.rating}/5</div>
                  </td>
                  <td className="review-date-cell">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </td>
                  <td className="review-actions-cell">
                    <button 
                      className="review-view-btn"
                      onClick={() => openDetailModal(review)}
                    >
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="review-empty-state">
            <p>No reviews found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Review Detail Modal */}
      {isDetailModalOpen && selectedReview && (
        <div className="review-modal-overlay">
          <div className="review-modal-container">
            <div className="review-modal-header">
              <h3>Review Details: {selectedReview.id}</h3>
              <button 
                className="review-modal-close"
                onClick={() => setIsDetailModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="review-modal-body">
              <div className="review-detail-grid">
                <div className="review-detail-row">
                  <span className="review-detail-label">Customer:</span>
                  <span className="review-detail-value">
                    {selectedReview.customerName} ({selectedReview.customerId})
                  </span>
                </div>
                <div className="review-detail-row">
                  <span className="review-detail-label">Type:</span>
                  <span className="review-detail-value">
                    {selectedReview.type === 'service' ? 'Service' : 'Part'}
                  </span>
                </div>
                <div className="review-detail-row">
                  <span className="review-detail-label">Item:</span>
                  <span className="review-detail-value">
                    {selectedReview.type === 'service' ? selectedReview.serviceName : selectedReview.partName}
                  </span>
                </div>
                <div className="review-detail-row">
                  <span className="review-detail-label">Rating:</span>
                  <span className="review-detail-value">
                    <div className="review-modal-rating">
                      {renderStars(selectedReview.rating)}
                      <span>({selectedReview.rating}/5)</span>
                    </div>
                  </span>
                </div>
                <div className="review-detail-row">
                  <span className="review-detail-label">Date:</span>
                  <span className="review-detail-value">
                    {new Date(selectedReview.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="review-detail-row review-detail-row-full">
                  <span className="review-detail-label">Comment:</span>
                  <div className="review-comment-box">
                    {selectedReview.comment}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="review-modal-footer">
              <button 
                className="review-modal-button"
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

export default ManageReview;