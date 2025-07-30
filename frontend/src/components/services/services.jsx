import React, { useState } from 'react';
import './services.css';

const Services = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // Available time slots
  const availableTimes = [
    '08:00 AM', '09:30 AM', '11:00 AM', 
    '12:30 PM', '02:00 PM', '03:30 PM', '05:00 PM'
  ];

  // Complete list of services
  const servicesList = [
    {
      id: 1,
      name: 'Premium Oil Change',
      description: 'Full synthetic oil change with OEM filter replacement',
      duration: '30 mins',
      price: 69.99
    },
    {
      id: 2,
      name: 'Complete Tire Service',
      description: 'Rotation, balancing and pressure check for all tires',
      duration: '45 mins',
      price: 39.99
    },
    {
      id: 3,
      name: 'Brake System Overhaul',
      description: 'Full inspection with pad/disc replacement if needed',
      duration: '2 hours',
      price: 149.99
    },
    {
      id: 4,
      name: 'Advanced Diagnostic Scan',
      description: 'Computer diagnostic with detailed report',
      duration: '1 hour',
      price: 99.99
    },
    {
      id: 5,
      name: 'Battery Service',
      description: 'Testing, replacement and terminal cleaning',
      duration: '30 mins',
      price: 139.99
    },
    {
      id: 6,
      name: 'AC Performance Check',
      description: 'System diagnostic and refrigerant recharge',
      duration: '1 hour',
      price: 119.99
    },
    {
      id: 7,
      name: 'Transmission Flush',
      description: 'Complete fluid replacement with filter change',
      duration: '1.5 hours',
      price: 179.99
    },
    {
      id: 8,
      name: 'Engine Tune-Up',
      description: 'Spark plugs replacement and engine optimization',
      duration: '2 hours',
      price: 199.99
    },
    {
      id: 9,
      name: 'Full Detailing',
      description: 'Interior and exterior deep cleaning',
      duration: '3 hours',
      price: 249.99
    }
  ];

  const toggleService = (service) => {
    if (selectedServices.some(s => s.id === service.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleBooking = () => {
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

    console.log('Booking Details:', bookingDetails);
    alert(`Booking Preview:\n\nDate: ${selectedDate}\nTime: ${selectedTime}\n\nServices:\n${selectedServices.map(s => `- ${s.name} ($${s.price.toFixed(2)})`).join('\n')}\n\nTotal: $${bookingDetails.total.toFixed(2)}\nEstimated Duration: ${bookingDetails.estimatedDuration}`);
  };

  const calculateTotalDuration = () => {
    // Simple duration calculation (in real app, you'd need more complex logic)
    const totalMinutes = selectedServices.reduce((sum, service) => {
      const mins = parseInt(service.duration);
      return sum + (isNaN(mins) ? 30 : mins); // Default to 30 mins if parsing fails
    }, 0);
    
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} ${minutes} mins` : `${minutes} mins`;
  };

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Our Automotive Services</h1>
        <p>Select multiple services and book your appointment</p>
      </div>

      <div className="services-container">
        {servicesList.map(service => (
          <div 
            key={service.id} 
            className={`service-card ${selectedServices.some(s => s.id === service.id) ? 'selected' : ''}`}
            onClick={() => toggleService(service)}
          >
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <div className="service-meta">
              <span>⏱️ {service.duration}</span>
              <span>💲{service.price.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedServices.length > 0 && (
        <div className="booking-section">
          <h2>Your Selected Services ({selectedServices.length})</h2>
          
          <div className="selected-services">
            <ul>
              {selectedServices.map(service => (
                <li key={service.id}>
                  <span>
                    {service.name} - ${service.price.toFixed(2)} ({service.duration})
                  </span>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleService(service);
                    }}
                    className="remove-service"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            
            <p className="total-price">
              Total: ${selectedServices.reduce((sum, service) => sum + service.price, 0).toFixed(2)}
            </p>
          </div>

          <div className="booking-form">
            <div className="form-group">
              <label>📅 Select Date:</label>
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>

            <div className="form-group">
              <label>⏰ Preferred Time:</label>
              <select 
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
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
              🚗 Book Now (${selectedServices.reduce((sum, service) => sum + service.price, 0).toFixed(2)})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;