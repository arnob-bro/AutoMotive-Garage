import React, { useState, useEffect } from 'react';
import ServiceApi from '../../apis/serviceApi'; // Adjust the import path as needed
import './services.css';

const Services = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [servicesList, setServicesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Initialize ServiceApi
  const serviceApi = new ServiceApi();

  // Available time slots
  const availableTimes = [
    '08:00 AM', '09:30 AM', '11:00 AM', 
    '12:30 PM', '02:00 PM', '03:30 PM', '05:00 PM'
  ];

  // Fetch services from API
  const fetchServices = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await serviceApi.getServices({
        page: 1,
        limit: 50, // Get more services for user selection
        searchTerm: '',
        status: 'Active' // Only show active services to users
      });

      if (response.success) {
        // Transform the services data to match the component's expected format
        const transformedServices = response.services.map(service => ({
          id: service.service_id,
          name: service.name,
          description: service.description,
          duration: service.duration,
          price: parseFloat(service.price) * 100 // Convert to paisa/cents for consistency with original format
        }));
        
        setServicesList(transformedServices);
      } else {
        setError('Failed to fetch services');
        setServicesList([]);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err.error || 'Failed to fetch services');
      setServicesList([]);
    } finally {
      setLoading(false);
    }
  };

  // Load services on component mount
  useEffect(() => {
    fetchServices();
  }, []);

  const toggleService = (service) => {
    if (selectedServices.some(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleBooking = async () => {
    if (selectedServices.length === 0) {
      alert('Please select at least one service');
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }

    const bookingDetails = {
      services: selectedServices,
      date: selectedDate,
      time: selectedTime,
      total: selectedServices.reduce((sum, service) => sum + service.price, 0),
      estimatedDuration: calculateTotalDuration()
    };

    try {
      // Here you would typically send the booking to your backend
      // For now, we'll just show the confirmation
      console.log('Booking Details:', bookingDetails);
      
      alert(`Booking Confirmed!\n\nDate: ${selectedDate}\nTime: ${selectedTime}\n\nServices:\n${selectedServices.map(s => `- ${s.name} (৳${(s.price / 100).toLocaleString('en-BD')})`).join('\n')}\n\nTotal: ৳${(bookingDetails.total / 100).toLocaleString('en-BD')}\nEstimated Duration: ${bookingDetails.estimatedDuration}`);

      // Clear the form after booking
      setSelectedServices([]);
      setSelectedDate('');
      setSelectedTime('');
      
      // TODO: Implement actual booking API call here
      // await bookingApi.createBooking(bookingDetails);
      
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  const calculateTotalDuration = () => {
    const totalMinutes = selectedServices.reduce((sum, service) => {
      const timeStr = service.duration;
      let minutes = 0;
      
      if (timeStr.includes('hour')) {
        const hours = parseFloat(timeStr);
        minutes = hours * 60;
        if (timeStr.includes('.5')) {
          minutes += 30;
        }
      } else if (timeStr.includes('min')) {
        minutes = parseInt(timeStr) || 30;
      } else {
        // Default to 30 minutes if format is unclear
        minutes = 30;
      }
      
      return sum + minutes;
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${minutes > 0 ? ` ${minutes} mins` : ''}` : `${minutes} mins`;
  };

  const formatPrice = (price) => {
    return (price / 100).toLocaleString('en-BD'); // Convert from paisa/cents to main currency
  };

  if (loading) {
    return (
      <div className="services-page">
        <div className="services-header">
          <h1>Our Automotive Services</h1>
          <p>Loading services...</p>
        </div>
        <div className="loading-spinner" style={{
          textAlign: 'center',
          padding: '50px',
          fontSize: '18px'
        }}>
          Loading our latest services for you...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="services-page">
        <div className="services-header">
          <h1>Our Automotive Services</h1>
          <p>We're having trouble loading services right now</p>
        </div>
        <div className="error-message" style={{
          textAlign: 'center',
          padding: '50px',
          color: '#e74c3c',
          fontSize: '18px'
        }}>
          {error}
          <br />
          <button 
            onClick={fetchServices}
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
    );
  }

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Our Automotive Services</h1>
        <p>Select multiple services and book your appointment at our Dhaka garage</p>
      </div>

      <div className={`services-layout ${selectedServices.length > 0 ? 'with-booking' : ''}`}>
        <div className={`services-container ${selectedServices.length > 0 ? 'with-booking' : ''}`}>
          {servicesList.length > 0 ? (
            servicesList.map(service => (
              <div 
                key={service.id} 
                className={`service-card ${selectedServices.some(s => s.id === service.id) ? 'selected' : ''}`}
                onClick={() => toggleService(service)}
              >
                <h3>{service.name}</h3>
                <p>{service.description}</p>
                <div className="service-meta">
                  <span className="duration">⏱️ {service.duration}</span>
                  <span className="price">৳{formatPrice(service.price)}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-services" style={{
              textAlign: 'center',
              padding: '50px',
              fontSize: '18px',
              color: '#666'
            }}>
              No services available at the moment. Please check back later.
            </div>
          )}
        </div>

        <div className="booking-section">
          <h2>Your Selected Services ({selectedServices.length})</h2>
          
          {selectedServices.length > 0 ? (
            <>
              <div className="selected-services">
                <h3>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Service Summary
                </h3>
                <ul>
                  {selectedServices.map(service => (
                    <li key={service.id}>
                      <div className="service-info">
                        <span className="service-name">{service.name}</span>
                        <span className="service-details">৳{formatPrice(service.price)} • {service.duration}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleService(service);
                        }}
                        className="remove-service"
                        aria-label={`Remove ${service.name}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
                
                <div className="total-price">
                  <span>Total Amount:</span>
                  <span>৳{formatPrice(selectedServices.reduce((sum, service) => sum + service.price, 0))}</span>
                </div>
                
                <div className="estimated-duration">
                  <span>Estimated Duration:</span>
                  <span>{calculateTotalDuration()}</span>
                </div>
              </div>

              <div className="booking-form">
                <div className="form-group">
                  <label htmlFor="booking-date">📅 Select Date:</label>
                  <input 
                    id="booking-date"
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    className="form-control"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="booking-time">⏰ Preferred Time:</label>
                  <select 
                    id="booking-time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    required
                    className="form-control"
                  >
                    <option value="">Select a time slot</option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <button 
                  onClick={handleBooking}
                  className="book-now-btn"
                  disabled={!selectedDate || !selectedTime}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Book Now (৳{formatPrice(selectedServices.reduce((sum, service) => sum + service.price, 0))})
                </button>
              </div>
            </>
          ) : (
            <div className="empty-state">
              <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3>No Services Selected</h3>
              <p>Click on services to add them to your booking</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;