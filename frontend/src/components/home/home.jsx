import React, { useState, useEffect } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [currentOffer, setCurrentOffer] = useState(0);
  const [isOfferVisible, setIsOfferVisible] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [testimonialScroll, setTestimonialScroll] = useState(0);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Offers data
  const offers = [
    "🔥 Summer Special: 20% off on AC servicing! 🔥",
    "🛠️ Free brake inspection with any full service 🛠️",
    "🎉 New customer discount: 15% off your first service 🎉"
  ];

  // Auto-scroll offers
  useEffect(() => {
    const offerInterval = setInterval(() => {
      setIsOfferVisible(false);
      setTimeout(() => {
        setCurrentOffer((prev) => (prev === offers.length - 1 ? 0 : prev + 1));
        setIsOfferVisible(true);
      }, 500);
    }, 3000);
    return () => clearInterval(offerInterval);
  }, []);

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      rating: 5,
      text: "The team at AutoMotive Garage saved me thousands by identifying an issue my previous mechanic missed. Professional service and fair pricing!",
      name: "Rahim Khan",
      location: "Dhaka",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 2,
      rating: 5,
      text: "Fast, reliable service. My car was ready sooner than promised and runs better than ever. Highly recommended!",
      name: "Fatima Ahmed",
      location: "Chittagong",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 3,
      rating: 4.5,
      text: "Honest mechanics are hard to find. These guys told me exactly what needed fixing and what could wait. No upselling!",
      name: "Jamal Uddin",
      location: "Sylhet",
      image: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    {
      id: 4,
      rating: 5,
      text: "Excellent service! They fixed my car's electrical issues that others couldn't figure out. Will definitely come back.",
      name: "Nusrat Jahan",
      location: "Khulna",
      image: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  // Educational content with detailed articles
  const educationalContents = [
    {
      id: 1,
      title: "Basic Car Maintenance Tips",
      description: "Learn essential maintenance tasks every car owner should know.",
      image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d",
      article: `
        <h2>Basic Car Maintenance Every Owner Should Know</h2>
        <p>Regular maintenance is key to keeping your vehicle running smoothly and avoiding costly repairs. Here are essential tasks you should perform:</p>
        <h3>1. Oil Changes</h3>
        <p>Change your engine oil every 5,000-7,500 km or as recommended in your owner's manual. Fresh oil lubricates engine components and prevents overheating.</p>
        <h3>2. Tire Care</h3>
        <p>Check tire pressure monthly and rotate tires every 10,000 km. Proper inflation improves fuel efficiency and extends tire life.</p>
        <h3>3. Battery Maintenance</h3>
        <p>Clean corrosion from terminals and check connections. Most batteries last 3-5 years - replace before failure.</p>
        <h3>4. Fluid Checks</h3>
        <p>Regularly inspect levels of coolant, brake fluid, power steering fluid, and windshield washer fluid.</p>
      `
    },
    {
      id: 2,
      title: "Understanding Warning Lights",
      description: "Decode your dashboard warning lights and know when to seek help.",
      image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785",
      article: `
        <h2>Dashboard Warning Lights Explained</h2>
        <p>Your car's dashboard lights are its way of communicating problems. Here's what they mean:</p>
        <h3>Red Lights - Immediate Attention Needed</h3>
        <p><strong>Check Engine Light:</strong> Could indicate anything from a loose gas cap to serious engine trouble.</p>
        <p><strong>Oil Pressure Light:</strong> Stop driving immediately - low oil pressure can destroy your engine.</p>
        <h3>Yellow/Orange Lights - Schedule Service Soon</h3>
        <p><strong>ABS Light:</strong> Anti-lock brake system issue - standard brakes still work but get checked.</p>
        <p><strong>Tire Pressure Light:</strong> One or more tires are underinflated.</p>
        <h3>Blue/Green Lights - Information Only</h3>
        <p>These typically indicate systems are operating (like headlights being on).</p>
      `
    },
    {
      id: 3,
      title: "Seasonal Car Care Guide",
      description: "Prepare your vehicle for different weather conditions.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70",
      article: `
        <h2>Seasonal Car Maintenance Guide</h2>
        <h3>Summer Preparation</h3>
        <p>• Check AC system performance</p>
        <p>• Inspect cooling system and hoses</p>
        <p>• Test battery (heat kills batteries)</p>
        <h3>Monsoon Readiness</h3>
        <p>• Replace wiper blades</p>
        <p>• Check tire tread depth</p>
        <p>• Test all lights and signals</p>
        <h3>Winter Preparation</h3>
        <p>• Check antifreeze mixture</p>
        <p>• Inspect battery and terminals</p>
        <p>• Pack emergency winter kit</p>
      `
    }
  ];

  const openModal = (content) => {
    setSelectedContent(content);
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };

  const scrollTestimonials = (direction) => {
    const container = document.querySelector('.home-testimonials-grid');
    const scrollAmount = 300;
    if (direction === 'left') {
      container.scrollLeft -= scrollAmount;
    } else {
      container.scrollLeft += scrollAmount;
    }
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero-section">
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
      </section>
      
      {/* Offers Banner */}
      <div className={`home-offers-banner ${isOfferVisible ? 'visible' : ''}`}>
        <div className="home-offer-content">
          <i className="fas fa-tag"></i>
          <span>{offers[currentOffer]}</span>
          <i className="fas fa-tag"></i>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="home-features-section">
        <div className="home-section-container">
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
      </section>
      
      {/* About Section */}
      <section className="home-about-section">
        <div className="home-section-container">
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
      </section>
      
      {/* Educational Content Section */}
      <section className="home-education-section">
        <div className="home-section-container">
          <div className="home-section-header">
            <h6 className="home-section-subtitle">Learn More</h6>
            <h2 className="home-section-title">Educational Resources</h2>
            <p className="home-section-description">
              Expand your automotive knowledge with our helpful guides and tips.
            </p>
          </div>
          
          <div className="home-education-grid">
            {educationalContents.map(content => (
              <article 
                className="home-education-card" 
                key={content.id}
                onClick={() => openModal(content)}
              >
                <div className="home-education-image">
                  <img src={content.image} alt={content.title} />
                </div>
                <div className="home-education-content">
                  <h3>{content.title}</h3>
                  <p>{content.description}</p>
                  <div className="home-btn home-secondary-btn">Read More</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="home-testimonials-section">
        <div className="home-section-container">
          <div className="home-section-header">
            <h6 className="home-section-subtitle">Client Feedback</h6>
            <h2 className="home-section-title">What Our Clients Say</h2>
            <p className="home-section-description">
              Hear from our satisfied customers about their experiences with AutoMotive Garage.
            </p>
          </div>
          
          <div className="home-testimonials-wrapper">
            <button 
              className="home-scroll-button home-scroll-left" 
              onClick={() => scrollTestimonials('left')}
              aria-label="Scroll testimonials left"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            
            <div className="home-testimonials-grid">
              {testimonials.map(testimonial => (
                <div className="home-testimonial-card" key={testimonial.id}>
                  <div className="home-testimonial-content">
                    <div className="home-rating">
                      {[...Array(5)].map((_, i) => (
                        <i 
                          key={i} 
                          className={`fas ${i < Math.floor(testimonial.rating) ? 'fa-star' : (i === Math.floor(testimonial.rating) && testimonial.rating % 1 !== 0 ? 'fa-star-half-alt' : 'fa-star-o')}`}
                          aria-hidden="true"
                        ></i>
                      ))}
                    </div>
                    <p className="home-testimonial-text">"{testimonial.text}"</p>
                    <div className="home-client-info">
                      <img src={testimonial.image} alt={`${testimonial.name}`} className="home-client-img" />
                      <div>
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="home-scroll-button home-scroll-right" 
              onClick={() => scrollTestimonials('right')}
              aria-label="Scroll testimonials right"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="home-faq-section">
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
              <button className="home-faq-question" onClick={() => toggleFAQ(0)} aria-expanded={activeIndex === 0}>
                What types of vehicles do you service?
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="home-faq-answer" aria-hidden={activeIndex !== 0}>
                <p>
                  We service all makes and models of cars, SUVs, and light trucks. Our technicians 
                  are certified to work on both domestic and imported vehicles.
                </p>
              </div>
            </div>
            
            <div className={`home-faq-item ${activeIndex === 1 ? 'home-active' : ''}`}>
              <button className="home-faq-question" onClick={() => toggleFAQ(1)} aria-expanded={activeIndex === 1}>
                How often should I get my vehicle serviced?
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="home-faq-answer" aria-hidden={activeIndex !== 1}>
                <p>
                  We recommend following your manufacturer's maintenance schedule, typically every 
                  5,000-10,000 km or every 6 months, whichever comes first.
                </p>
              </div>
            </div>
            
            <div className={`home-faq-item ${activeIndex === 2 ? 'home-active' : ''}`}>
              <button className="home-faq-question" onClick={() => toggleFAQ(2)} aria-expanded={activeIndex === 2}>
                Do you offer warranties on your services?
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="home-faq-answer" aria-hidden={activeIndex !== 2}>
                <p>
                  Yes! All our repairs come with a 12-month/20,000 km warranty (whichever comes first). 
                  Parts are covered by their manufacturer's warranty.
                </p>
              </div>
            </div>
            
            <div className={`home-faq-item ${activeIndex === 3 ? 'home-active' : ''}`}>
              <button className="home-faq-question" onClick={() => toggleFAQ(3)} aria-expanded={activeIndex === 3}>
                Can I get a quote before authorizing repairs?
                <i className="fas fa-chevron-down"></i>
              </button>
              <div className="home-faq-answer" aria-hidden={activeIndex !== 3}>
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
      </section>
      
      {/* Contact Section */}
      <section className="home-contact-section">
        <div className="home-section-container">
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
                  <input type="tel" placeholder="Your Phone Number" required />
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
      </section>
      
      {/* Footer */}
      <footer className="home-footer">
        <div className="home-section-container">
          <div className="home-footer-container">
            <div className="home-footer-logo">
              <h2>AutoMotive Garage</h2>
              <p>Your trusted automotive partner in Bangladesh</p>
            </div>
            
            <div className="home-footer-links">
              <div className="home-footer-column">
                <h4>Quick Links</h4>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/about">About Us</Link></li>
                  <li><Link to="/services">Services</Link></li>
                  <li><Link to="/contact">Contact</Link></li>
                </ul>
              </div>
              
              <div className="home-footer-column">
                <h4>Services</h4>
                <ul>
                  <li><Link to="/services/repairs">Auto Repairs</Link></li>
                  <li><Link to="/services/maintenance">Maintenance</Link></li>
                  <li><Link to="/services/diagnostics">Diagnostics</Link></li>
                  <li><Link to="/services/parts">Parts Supply</Link></li>
                </ul>
              </div>
              
              <div className="home-footer-column">
                <h4>Contact Info</h4>
                <ul>
                  <li><i className="fas fa-map-marker-alt"></i> 123 Automotive Road, Dhaka</li>
                  <li><i className="fas fa-phone-alt"></i> +880 1234 567890</li>
                  <li><i className="fas fa-envelope"></i> info@automotivegarage.com</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="home-footer-bottom">
            <p>&copy; {new Date().getFullYear()} AutoMotive Garage. All Rights Reserved.</p>
            <div className="home-footer-social">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Education Modal */}
      {showModal && selectedContent && (
        <div className="home-education-modal">
          <div className="home-modal-overlay" onClick={closeModal}></div>
          <div className="home-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="home-modal-close" onClick={closeModal} aria-label="Close modal">
              <i className="fas fa-times"></i>
            </button>
            <div className="home-modal-header">
              <h2>{selectedContent.title}</h2>
              <p className="home-modal-subtitle">Educational Resource</p>
            </div>
            <div className="home-modal-body">
              <div className="home-modal-article-image">
                <img src={selectedContent.image} alt={selectedContent.title} />
              </div>
              <div 
                className="home-modal-article-content"
                dangerouslySetInnerHTML={{ __html: selectedContent.article }}
              ></div>
            </div>
            <div className="home-modal-footer">
              <button className="home-modal-close-btn" onClick={closeModal}>
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;