import React, { useState } from 'react';
import { 
  FaQuestionCircle, FaChevronDown, FaChevronUp, 
  FaSearch, FaPlus, FaEdit, FaTrash, FaFilter,
  FaTimes, FaCheck
} from 'react-icons/fa';
import './FAQManagement.css';

const FAQManagement = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [filterCategory, setFilterCategory] = useState('all');
  
  // Sample FAQ data
  const initialFAQs = [
    {
      id: 1,
      question: "How do I schedule a service appointment?",
      answer: "You can schedule an appointment through our online booking system, by calling our service center, or by visiting us in person. Online booking is available 24/7 for your convenience.",
      category: "booking",
      status: "active",
      lastUpdated: "2023-08-15"
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and cash. We also offer financing options for major repairs.",
      category: "payment",
      status: "active",
      lastUpdated: "2023-08-10"
    },
    {
      id: 3,
      question: "Do you offer warranties on your services?",
      answer: "Yes, most of our services come with a warranty. The duration and terms depend on the specific service performed. Our team will provide you with warranty information before any work begins.",
      category: "services",
      status: "active",
      lastUpdated: "2023-07-28"
    },
    {
      id: 4,
      question: "Can I bring my own parts for installation?",
      answer: "While we prefer to use our own quality-tested parts, we can install customer-provided parts in most cases. However, warranty coverage may be limited for customer-provided parts.",
      category: "parts",
      status: "inactive",
      lastUpdated: "2023-07-20"
    },
    {
      id: 5,
      question: "How often should I get my vehicle serviced?",
      answer: "We recommend following your manufacturer's maintenance schedule, typically every 5,000-10,000 km or every 6 months, whichever comes first. Severe driving conditions may require more frequent service.",
      category: "maintenance",
      status: "active",
      lastUpdated: "2023-07-15"
    }
  ];

  const [faqs, setFaqs] = useState(initialFAQs);
  const [newFAQ, setNewFAQ] = useState({
    question: '',
    answer: '',
    category: 'general',
    status: 'active'
  });

  // FAQ categories
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'general', name: 'General' },
    { id: 'booking', name: 'Booking' },
    { id: 'payment', name: 'Payment' },
    { id: 'services', name: 'Services' },
    { id: 'parts', name: 'Parts' },
    { id: 'maintenance', name: 'Maintenance' }
  ];

  // Status options
  const statusOptions = [
    { id: 'all', name: 'All Statuses' },
    { id: 'active', name: 'Active' },
    { id: 'inactive', name: 'Inactive' }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Filter FAQs based on search and filters
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || faq.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddFAQ = () => {
    const newId = Math.max(...faqs.map(f => f.id)) + 1;
    const today = new Date().toISOString().split('T')[0];
    
    setFaqs([...faqs, {
      ...newFAQ,
      id: newId,
      lastUpdated: today
    }]);
    
    setNewFAQ({
      question: '',
      answer: '',
      category: 'general',
      status: 'active'
    });
    
    setIsAddModalOpen(false);
  };

  const handleEditFAQ = () => {
    const today = new Date().toISOString().split('T')[0];
    
    setFaqs(faqs.map(faq => 
      faq.id === selectedFAQ.id ? { ...selectedFAQ, lastUpdated: today } : faq
    ));
    
    setIsEditModalOpen(false);
  };

  const handleDeleteFAQ = () => {
    setFaqs(faqs.filter(faq => faq.id !== selectedFAQ.id));
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (faq) => {
    setSelectedFAQ(faq);
    setIsEditModalOpen(true);
  };

  const openDeleteModal = (faq) => {
    setSelectedFAQ(faq);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="faq-management-container">
      <div className="faq-management-header">
        <h1><FaQuestionCircle /> FAQ Management</h1>
        <p>Manage frequently asked questions for your customers</p>
      </div>

      <div className="faq-management-controls">
        <div className="faq-search-filter">
          <div className="faq-search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="faq-filter-group">
            <div className="faq-filter-dropdown">
              <FaFilter className="filter-icon" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <button 
          className="faq-add-btn"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FaPlus /> Add FAQ
        </button>
      </div>

      <div className="faq-list-container">
        {filteredFAQs.length > 0 ? (
          <div className="faq-list">
            {filteredFAQs.map((faq, index) => (
              <div 
                key={faq.id} 
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
              >
                <div className="faq-question-row">
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
                  
                  <div className="faq-actions">
                    <span className={`faq-status ${faq.status}`}>
                      {faq.status === 'active' ? <FaCheck /> : <FaTimes />}
                      {faq.status}
                    </span>
                    <span className="faq-category">
                      {categories.find(c => c.id === faq.category)?.name}
                    </span>
                    <button 
                      className="faq-edit-btn"
                      onClick={() => openEditModal(faq)}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="faq-delete-btn"
                      onClick={() => openDeleteModal(faq)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                  <div className="faq-meta">
                    <span>Last updated: {faq.lastUpdated}</span>
                    <span>ID: #{faq.id}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-faqs-found">
            <p>No FAQs found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Add FAQ Modal */}
      {isAddModalOpen && (
        <div className="faq-modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="faq-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="faq-modal-header">
              <h3>Add New FAQ</h3>
              <button 
                className="close-modal"
                onClick={() => setIsAddModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="faq-modal-body">
              <div className="form-group">
                <label>Question</label>
                <input
                  type="text"
                  value={newFAQ.question}
                  onChange={(e) => setNewFAQ({...newFAQ, question: e.target.value})}
                  placeholder="Enter question..."
                />
              </div>
              
              <div className="form-group">
                <label>Answer</label>
                <textarea
                  value={newFAQ.answer}
                  onChange={(e) => setNewFAQ({...newFAQ, answer: e.target.value})}
                  placeholder="Enter answer..."
                  rows="5"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newFAQ.category}
                    onChange={(e) => setNewFAQ({...newFAQ, category: e.target.value})}
                  >
                    {categories.filter(c => c.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newFAQ.status}
                    onChange={(e) => setNewFAQ({...newFAQ, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="faq-modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={handleAddFAQ}
                disabled={!newFAQ.question || !newFAQ.answer}
              >
                Add FAQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit FAQ Modal */}
      {isEditModalOpen && selectedFAQ && (
        <div className="faq-modal-overlay" onClick={() => setIsEditModalOpen(false)}>
          <div className="faq-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="faq-modal-header">
              <h3>Edit FAQ</h3>
              <button 
                className="close-modal"
                onClick={() => setIsEditModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="faq-modal-body">
              <div className="form-group">
                <label>Question</label>
                <input
                  type="text"
                  value={selectedFAQ.question}
                  onChange={(e) => setSelectedFAQ({...selectedFAQ, question: e.target.value})}
                  placeholder="Enter question..."
                />
              </div>
              
              <div className="form-group">
                <label>Answer</label>
                <textarea
                  value={selectedFAQ.answer}
                  onChange={(e) => setSelectedFAQ({...selectedFAQ, answer: e.target.value})}
                  placeholder="Enter answer..."
                  rows="5"
                />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={selectedFAQ.category}
                    onChange={(e) => setSelectedFAQ({...selectedFAQ, category: e.target.value})}
                  >
                    {categories.filter(c => c.id !== 'all').map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={selectedFAQ.status}
                    onChange={(e) => setSelectedFAQ({...selectedFAQ, status: e.target.value})}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="faq-modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="submit-btn"
                onClick={handleEditFAQ}
                disabled={!selectedFAQ.question || !selectedFAQ.answer}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedFAQ && (
        <div className="faq-modal-overlay" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="faq-delete-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="faq-modal-header">
              <h3>Delete FAQ</h3>
              <button 
                className="close-modal"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="faq-modal-body">
              <p>Are you sure you want to delete this FAQ?</p>
              <div className="faq-to-delete">
                <h4>{selectedFAQ.question}</h4>
                <p>{selectedFAQ.answer.substring(0, 100)}...</p>
              </div>
            </div>
            
            <div className="faq-modal-footer">
              <button 
                className="cancel-btn"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="delete-btn"
                onClick={handleDeleteFAQ}
              >
                Delete FAQ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQManagement;