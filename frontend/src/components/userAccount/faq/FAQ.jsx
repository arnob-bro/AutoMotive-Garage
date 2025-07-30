import React, { useState } from 'react';
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I schedule a service appointment?",
      answer: "You can schedule an appointment through our online booking system, by calling our service center, or by visiting us in person. Online booking is available 24/7 for your convenience."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and cash. We also offer financing options for major repairs."
    },
    {
      question: "Do you offer warranties on your services?",
      answer: "Yes, most of our services come with a warranty. The duration and terms depend on the specific service performed. Our team will provide you with warranty information before any work begins."
    },
    {
      question: "Can I bring my own parts for installation?",
      answer: "While we prefer to use our own quality-tested parts, we can install customer-provided parts in most cases. However, warranty coverage may be limited for customer-provided parts."
    },
    {
      question: "How often should I get my vehicle serviced?",
      answer: "We recommend following your manufacturer's maintenance schedule, typically every 5,000-10,000 km or every 6 months, whichever comes first. Severe driving conditions may require more frequent service."
    },
    {
      question: "What should I do if I'm not satisfied with a service?",
      answer: "Your satisfaction is our priority. Please contact our service manager immediately to discuss your concerns. We'll do everything we can to make it right."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2><FaQuestionCircle /> Frequently Asked Questions</h2>
      
      <div className="faq-search">
        <input 
          type="text" 
          placeholder="Search FAQs..." 
          className="search-input"
        />
      </div>
      
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <button 
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              {activeIndex === index ? (
                <FaChevronUp className="faq-icon" />
              ) : (
                <FaChevronDown className="faq-icon" />
              )}
            </button>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="faq-contact">
        <h3>Still have questions?</h3>
        <p>Our customer service team is happy to help with any additional questions you may have.</p>
        <button className="contact-btn">Contact Us</button>
      </div>
    </div>
  );
};

export default FAQ;