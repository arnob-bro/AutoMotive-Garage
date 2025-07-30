import React, { useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="home-hero-section">
        <div className="home-hero-content">
          <h6 className="home-hero-subtitle">Premium Auto Services</h6>
          <h1 className="home-hero-title">Your Trusted Automotive <span>Garage</span> in Bangladesh</h1>
          <p className="home-hero-description">
            Professional vehicle maintenance, repair, and parts supply with certified mechanics 
            and state-of-the-art equipment.
          </p>
          <div className="home-hero-buttons">
            <Link to="/services" className="home-btn home-primary-btn">Our Services</Link>
            <Link to="/contact" className="home-btn home-secondary-btn">Contact Us</Link>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="home-features-section">
        <div className="home-features-container">
          <div className="home-feature-card">
            <div className="home-feature-icon">
              <i className="fas fa-tools"></i>
            </div>
            <h3>Quality Repairs</h3>
            <p>Our certified technicians provide top-notch repair services using genuine parts.</p>
          </div>
          
          <div className="home-feature-card">
            <div className="home-feature-icon">
              <i className="fas fa-car"></i>
            </div>
            <h3>All Makes & Models</h3>
            <p>We service all vehicle types from compact cars to SUVs and trucks.</p>
          </div>
          
          <div className="home-feature-card">
            <div className="home-feature-icon">
              <i className="fas fa-clock"></i>
            </div>
            <h3>Quick Service</h3>
            <p>Efficient service with minimal downtime to get you back on the road fast.</p>
          </div>
        </div>
      </div>
      
      {/* About Section */}
      <div className="home-about-section">
        <div className="home-about-container">
          <div className="home-about-image">
            <img src="https://images.unsplash.com/photo-1600861195091-690c92f1d2cc" alt="Auto Garage" />
          </div>
          <div className="home-about-content">
            <h6 className="home-section-subtitle">About Our Garage</h6>
            <h2 className="home-section-title">20+ Years of Automotive Excellence</h2>
            <p>
              AutoMotive Garage has been serving Bangladesh's automotive needs since 2002. 
              Our team of ASE-certified technicians brings unparalleled expertise to every 
              repair and maintenance job.
            </p>
            <ul className="home-about-list">
              <li><i className="fas fa-check-circle"></i> Certified & Experienced Technicians</li>
              <li><i className="fas fa-check-circle"></i> Genuine Parts Guarantee</li>
              <li><i className="fas fa-check-circle"></i> 12-Month Service Warranty</li>
              <li><i className="fas fa-check-circle"></i> 24/7 Roadside Assistance</li>
            </ul>
            <Link to="/about" className="home-btn home-primary-btn">Learn More</Link>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="home-testimonials-section">
        <div className="home-section-container">
          <div className="home-section-header">
            <h6 className="home-section-subtitle">Client Feedback</h6>
            <h2 className="home-section-title">What Our Clients Say</h2>
            <p className="home-section-description">
              Hear from our satisfied customers about their experiences with AutoMotive Garage.
            </p>
          </div>
          
          <div className="home-testimonials-grid">
            <div className="home-testimonial-card">
              <div className="home-testimonial-content">
                <div className="home-rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="home-testimonial-text">
                  "The team at AutoMotive Garage saved me thousands by identifying an issue my 
                  previous mechanic missed. Professional service and fair pricing!"
                </p>
                <div className="home-client-info">
                  <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Client" className="home-client-img" />
                  <div>
                    <h4>Rahim Khan</h4>
                    <p>Dhaka</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="home-testimonial-card">
              <div className="home-testimonial-content">
                <div className="home-rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <p className="home-testimonial-text">
                  "Fast, reliable service. My car was ready sooner than promised and runs better 
                  than ever. Highly recommended!"
                </p>
                <div className="home-client-info">
                  <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Client" className="home-client-img" />
                  <div>
                    <h4>Fatima Ahmed</h4>
                    <p>Chittagong</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="home-testimonial-card">
              <div className="home-testimonial-content">
                <div className="home-rating">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star-half-alt"></i>
                </div>
                <p className="home-testimonial-text">
                  "Honest mechanics are hard to find. These guys told me exactly what needed fixing 
                  and what could wait. No upselling!"
                </p>
                <div className="home-client-info">
                  <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Client" className="home-client-img" />
                  <div>
                    <h4>Jamal Uddin</h4>
                    <p>Sylhet</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="home-faq-section">
        <div className="home-section-container">
          <div className="home-section-header">
            <h6 className="home-section-subtitle">Have Questions?</h6>
            <h2 className="home-section-title">Frequently Asked Questions</h2>
            <p className="home-section-description">
              Find answers to common questions about our services and policies.
            </p>
          </div>
          
          <div className="home-faq-grid">
            <div className={`home-faq-item ${activeIndex === 0 ? 'home-active' : ''}`}>
              <button className="home-faq-question" onClick={() => toggleFAQ(0)}>
                What types of vehicles do you service?
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="home-faq-answer">
                <p>
                  We service all makes and models of cars, SUVs, and light trucks. Our technicians 
                  are certified to work on both domestic and imported vehicles.
                </p>
              </div>
            </div>
            
            <div className={`home-faq-item ${activeIndex === 1 ? 'home-active' : ''}`}>
              <button className="home-faq-question" onClick={() => toggleFAQ(1)}>
                How often should I get my vehicle serviced?
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="home-faq-answer">
                <p>
                  We recommend following your manufacturer's maintenance schedule, typically every 
                  5,000-10,000 km or every 6 months, whichever comes first.
                </p>
              </div>
            </div>
            
            <div className={`home-faq-item ${activeIndex === 2 ? 'home-active' : ''}`}>
              <button className="home-faq-question" onClick={() => toggleFAQ(2)}>
                Do you offer warranties on your services?
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="home-faq-answer">
                <p>
                  Yes! All our repairs come with a 12-month/20,000 km warranty (whichever comes first). 
                  Parts are covered by their manufacturer's warranty.
                </p>
              </div>
            </div>
            
            <div className={`home-faq-item ${activeIndex === 3 ? 'home-active' : ''}`}>
              <button className="home-faq-question" onClick={() => toggleFAQ(3)}>
                Can I get a quote before authorizing repairs?
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="home-faq-answer">
                <p>
                  Absolutely. We provide free, no-obligation estimates after diagnosing your vehicle. 
                  We'll never proceed with repairs without your approval.
                </p>
              </div>
            </div>
          </div>
          
          <div className="home-faq-cta">
            <p>Still have questions?</p>
            <Link to="/contact" className="home-btn home-primary-btn">Contact Us</Link>
          </div>
        </div>
      </div>
      
      {/* Contact Section */}
      <div className="home-contact-section">
        <div className="home-contact-container">
          <div className="home-contact-info">
            <h6 className="home-section-subtitle">Get In Touch</h6>
            <h2 className="home-section-title">Contact AutoMotive Garage</h2>
            <p className="home-contact-text">
              Have questions or need to schedule service? Reach out to our team today.
            </p>
            
            <div className="home-contact-details">
              <div className="home-contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h4>Our Location</h4>
                  <p>123 Automotive Road, Dhaka 1205, Bangladesh</p>
                </div>
              </div>
              
              <div className="home-contact-item">
                <i className="fas fa-phone-alt"></i>
                <div>
                  <h4>Call Us</h4>
                  <p>+880 1234 567890</p>
                  <p>+880 9876 543210</p>
                </div>
              </div>
              
              <div className="home-contact-item">
                <i className="fas fa-envelope"></i>
                <div>
                  <h4>Email Us</h4>
                  <p>info@automotivegarage.com</p>
                  <p>support@automotivegarage.com</p>
                </div>
              </div>
              
              <div className="home-contact-item">
                <i className="fas fa-clock"></i>
                <div>
                  <h4>Working Hours</h4>
                  <p>Monday - Saturday: 8:00 AM - 8:00 PM</p>
                  <p>Sunday: 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="home-contact-form">
            <form>
              <div className="home-form-group">
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="home-form-group">
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="home-form-group">
                <input type="text" placeholder="Subject" required />
              </div>
              <div className="home-form-group">
                <textarea placeholder="Your Message" rows="5" required></textarea>
              </div>
              <button type="submit" className="home-btn home-primary-btn">Send Message</button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <div className="home-newsletter-section">
        <div className="home-section-container">
          <div className="home-newsletter-content">
            <h2>Subscribe to Our Newsletter</h2>
            <p>
              Get the latest updates, special offers, and maintenance tips delivered to your inbox.
            </p>
          </div>
          <form className="home-newsletter-form">
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="home-btn home-primary-btn">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;