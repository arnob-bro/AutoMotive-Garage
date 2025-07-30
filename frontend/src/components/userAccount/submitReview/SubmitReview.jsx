import React, { useState } from 'react';
import { FaStar, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import './SubmitReview.css';

const SubmitReview = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [reviewType, setReviewType] = useState('service'); // 'service' or 'parts'
  const [selectedService, setSelectedService] = useState('');

  // Sample data - in a real app, this would come from props or API
  const services = [
    { id: 1, name: 'Oil Change', date: '2023-08-15' },
    { id: 2, name: 'Brake Inspection', date: '2023-07-20' },
    { id: 3, name: 'Tire Rotation', date: '2023-06-10' }
  ];

  const parts = [
    { id: 1, name: 'Premium Brake Pads', date: '2023-08-10' },
    { id: 2, name: 'Performance Air Filter', date: '2023-07-15' },
    { id: 3, name: 'Synthetic Motor Oil', date: '2023-06-05' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would submit to an API here
    console.log({
      type: reviewType,
      serviceOrPart: selectedService,
      rating,
      review: reviewText
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="submit-review-container">
        <div className="success-message">
          <FaCheckCircle className="success-icon" />
          <h2>Thank You for Your Review!</h2>
          <p>Your feedback helps us improve our services.</p>
          <Link to="/services" className="continue-btn">
            Browse Services <FaArrowRight />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="submit-review-container">
      <h2><FaStar /> Submit Review</h2>
      
      <div className="review-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Review Type</label>
            <div className="toggle-buttons">
              <button
                type="button"
                className={`toggle-btn ${reviewType === 'service' ? 'active' : ''}`}
                onClick={() => setReviewType('service')}
              >
                Service
              </button>
              <button
                type="button"
                className={`toggle-btn ${reviewType === 'parts' ? 'active' : ''}`}
                onClick={() => setReviewType('parts')}
              >
                Parts
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>
              {reviewType === 'service' ? 'Select Service' : 'Select Part'}
            </label>
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              required
            >
              <option value="">-- Please select --</option>
              {(reviewType === 'service' ? services : parts).map(item => (
                <option key={item.id} value={item.id}>
                  {item.name} ({new Date(item.date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Your Rating</label>
            <div className="star-rating">
              {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index}>
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      onClick={() => setRating(ratingValue)}
                    />
                    <FaStar
                      className="star"
                      color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                      size={30}
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(0)}
                    />
                  </label>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label>Your Review</label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder={`Tell us about your experience with this ${reviewType}...`}
              required
              rows="5"
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit Review
          </button>
        </form>

        <div className="review-guidelines">
          <h3>Review Guidelines</h3>
          <ul>
            <li>Be specific about your experience</li>
            <li>Mention any particularly helpful staff members</li>
            <li>Describe the quality of the service or part</li>
            <li>Avoid personal information</li>
            <li>Keep it honest and respectful</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubmitReview;