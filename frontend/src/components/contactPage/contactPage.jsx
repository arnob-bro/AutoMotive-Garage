import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhoneAlt, 
  faEnvelope, 
  faClock
} from '@fortawesome/free-solid-svg-icons';
import ContactApi from '../../apis/contactApi';
import './contactPage.css';

const contactApi = new ContactApi();

const ContactPage = () => {
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInquiryData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await contactApi.makeInquiry(inquiryData);
      if (!response.success) throw new Error(response.error || "Inquiry not sent");

      setSubmitted(true);
      setInquiryData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

      // Reset submission status after 3 seconds
      setTimeout(() => setSubmitted(false), 3000);
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>Get in touch with our automotive experts</p>
        </div>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h2>Our Contact Details</h2>

          <div className="info-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="icon" />
            <div>
              <h3>Visit Us</h3>
              <p>123 Auto Service Road</p>
              <p>Dhaka 1205, Bangladesh</p>
            </div>
          </div>

          <div className="info-item">
            <FontAwesomeIcon icon={faPhoneAlt} className="icon" />
            <div>
              <h3>Call Us</h3>
              <p>+880 1234 567890</p>
              <p>+880 9876 543210</p>
            </div>
          </div>

          <div className="info-item">
            <FontAwesomeIcon icon={faEnvelope} className="icon" />
            <div>
              <h3>Email Us</h3>
              <p>info@automotivegarage.com</p>
              <p>support@automotivegarage.com</p>
            </div>
          </div>

          <div className="info-item">
            <FontAwesomeIcon icon={faClock} className="icon" />
            <div>
              <h3>Working Hours</h3>
              <p>Monday - Saturday: 8:00 AM - 8:00 PM</p>
              <p>Sunday: 10:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Send Us a Message</h2>

          {submitted && (
            <div className="success-message">
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={inquiryData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={inquiryData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={inquiryData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={inquiryData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={inquiryData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="map-section">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.105693258586!2d90.3849743154314!3d23.78086879359175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c792a0c2fb45%3A0x5a6733242167fd6!2sDhaka%201205%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactPage;
