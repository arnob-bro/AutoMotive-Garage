import React from 'react';
import './about.css';

const About = () => {
  const workshopImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1600861195091-690c92f1d2cc',
      alt: 'Mechanic working on car engine',
      caption: 'Engine Diagnostics'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537',
      alt: 'Car lift in workshop',
      caption: 'Undercarriage Inspection'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7',
      alt: 'Car interior service',
      caption: 'Interior Detailing'
    },
    // {
    //   id: 4,
    //   src: 'https://images.unsplash.com/photo-1494976388901-7509ad7062f4',
    //   alt: 'Sports car in workshop',
    //   caption: 'Performance Tuning'
    // },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      alt: 'Luxury car service',
      caption: 'Premium Care'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d',
      alt: 'Tire service',
      caption: 'Wheel Alignment'
    }
  ];

  return (
    <div className="about-page">
      <div className="about-hero">
        <div className="hero-content">
          <h1>About Us</h1>
          <p>20+ years of excellence in automotive care and repair</p>
        </div>
      </div>

      <div className="about-section">
        <div className="about-container">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Founded in 2003, AutoMotive Garage has grown from a small local repair shop to one of the most trusted 
              automotive service centers in the region. Our journey began with a simple mission: to provide honest, 
              high-quality auto repairs at fair prices.
            </p>
            <p>
              Today, we're proud to serve thousands of satisfied customers with our team of ASE-certified technicians 
              and state-of-the-art diagnostic equipment. We specialize in both domestic and imported vehicles, offering 
              everything from routine maintenance to complex engine repairs.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Vehicles Serviced</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Satisfaction Guarantee</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2" alt="Our workshop" />
          </div>
        </div>
      </div>

      <div className="team-section">
        <div className="section-header">
          <h2>Meet Our Expert Team</h2>
          <p>Certified professionals dedicated to your vehicle's care</p>
        </div>
        <div className="team-grid">
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a" alt="Mechanic" />
            <h3>John Smith</h3>
            <p>Master Technician</p>
            <p className="member-bio">25 years experience in engine diagnostics and repair</p>
          </div>
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" alt="Mechanic" />
            <h3>Sarah Johnson</h3>
            <p>Electrical Systems Specialist</p>
            <p className="member-bio">Expert in modern vehicle electronics and computer systems</p>
          </div>
          <div className="team-member">
            <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956" alt="Mechanic" />
            <h3>Mike Rodriguez</h3>
            <p>Transmission Specialist</p>
            <p className="member-bio">15 years focusing on transmission rebuilds and maintenance</p>
          </div>
        </div>
      </div>

      <div className="workshop-gallery">
        <div className="section-header">
          <h2>Our Workshop Gallery</h2>
          <p>Take a look inside our state-of-the-art facility</p>
        </div>
        <div className="gallery-grid">
          {workshopImages.map((image) => (
            <div key={image.id} className="gallery-item">
              <img src={image.src} alt={image.alt} />
              <div className="image-caption">{image.caption}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="values-section">
        <div className="section-header">
          <h2>Our Core Values</h2>
        </div>
        <div className="values-grid">
          <div className="value-card">
            <div className="value-icon">✓</div>
            <h3>Honesty</h3>
            <p>We provide straightforward assessments and never recommend unnecessary repairs.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">✓</div>
            <h3>Quality</h3>
            <p>We use only premium parts and stand behind all our work with warranties.</p>
          </div>
          <div className="value-card">
            <div className="value-icon">✓</div>
            <h3>Expertise</h3>
            <p>Our technicians receive ongoing training on the latest automotive technologies.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;