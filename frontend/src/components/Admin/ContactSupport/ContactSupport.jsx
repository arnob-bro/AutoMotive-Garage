import React, { useState, useEffect } from 'react';
import { 
  FaSearch, FaFilter, FaEnvelope, FaReply, 
  FaCheckCircle, FaTimesCircle, FaEye, FaChevronDown, FaChevronUp 
} from 'react-icons/fa';
import './ContactSupport.css';

const ContactSupport = () => {
  // Sample contact support data
  const initialContacts = [
    {
      id: 'CT-1001',
      customerId: 'CUS-2023-001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+8801712345678',
      createdAt: '2023-08-20T14:32:45',
      subject: 'Issue with recent service',
      message: 'I had my car serviced last week and now I\'m hearing a strange noise from the engine. Can you help?',
      status: 'replied',
      replies: [
        {
          id: 'RPL-1001',
          admin: 'Admin User',
          message: 'We\'re sorry to hear about this issue. Please bring your car back for a free inspection. We\'ll check what\'s causing the noise.',
          createdAt: '2023-08-21T10:15:22'
        }
      ]
    },
    {
      id: 'CT-1002',
      customerId: 'CUS-2023-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+8801812345678',
      createdAt: '2023-08-18T09:15:22',
      subject: 'Question about pricing',
      message: 'Could you provide me with a detailed price list for your regular maintenance services?',
      status: 'replied',
      replies: [
        {
          id: 'RPL-1002',
          admin: 'Admin User',
          message: 'Thank you for your inquiry. I\'ve attached our current price list for all maintenance services. Let us know if you have any further questions.',
          createdAt: '2023-08-18T11:30:45'
        }
      ]
    },
    {
      id: 'CT-1003',
      customerId: 'CUS-2023-003',
      name: 'Michael Brown',
      email: 'michael.b@example.com',
      phone: '+8801912345678',
      createdAt: '2023-08-15T16:45:10',
      subject: 'Appointment cancellation',
      message: 'I need to cancel my appointment for tomorrow. How can I do this?',
      status: 'replied',
      replies: [
        {
          id: 'RPL-1003',
          admin: 'Admin User',
          message: 'Your appointment has been cancelled as requested. You can reschedule anytime through our online booking system.',
          createdAt: '2023-08-15T17:20:33'
        }
      ]
    },
    {
      id: 'CT-1004',
      customerId: 'CUS-2023-004',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '+8801612345678',
      createdAt: '2023-08-10T10:05:18',
      subject: 'Parts availability',
      message: 'Do you have brake pads for a Toyota Corolla 2018 model in stock?',
      status: 'not replied',
      replies: []
    },
    {
      id: 'CT-1005',
      customerId: 'CUS-2023-005',
      name: 'Robert Wilson',
      email: 'robert.w@example.com',
      phone: '+8801512345678',
      createdAt: '2023-08-05T13:10:05',
      subject: 'Compliment about service',
      message: 'I just wanted to say how pleased I was with the service I received last week. The mechanic was very professional!',
      status: 'not replied',
      replies: []
    }
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter contacts based on search and filters
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || contact.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Get status icon and color
  const getStatusInfo = (status) => {
    switch(status) {
      case 'replied':
        return { icon: <FaCheckCircle />, color: 'var(--success)', text: 'Replied' };
      case 'not replied':
        return { icon: <FaTimesCircle />, color: 'var(--danger)', text: 'Not Replied' };
      default:
        return { icon: null, color: '', text: '' };
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Open contact details modal
  const openModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  // Handle reply submission
  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    const newReply = {
      id: `RPL-${Date.now()}`,
      admin: 'Admin User', // In a real app, this would be the logged-in admin's name
      message: replyMessage,
      createdAt: new Date().toISOString()
    };

    // Update the contact with the new reply
    const updatedContacts = contacts.map(contact => {
      if (contact.id === selectedContact.id) {
        return {
          ...contact,
          status: 'replied',
          replies: [...contact.replies, newReply]
        };
      }
      return contact;
    });

    setContacts(updatedContacts);
    setSelectedContact({
      ...selectedContact,
      status: 'replied',
      replies: [...selectedContact.replies, newReply]
    });
    setReplyMessage('');

    // In a real app, you would send the reply to the customer's email here
    console.log(`Email sent to ${selectedContact.email} with message: ${replyMessage}`);
  };

  return (
    <div className="contact-support">
      <div className="support-header">
        <h1><FaEnvelope /> Contact Support</h1>
        <p>Manage customer inquiries and support requests</p>
      </div>

      <div className="support-controls">
        <div className="search-filters">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <button 
              className="filter-btn"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <FaFilter /> Filters {isFilterOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            
            {isFilterOpen && (
              <div className="filter-dropdown">
                <div className="filter-option">
                  <label>Status:</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="replied">Replied</option>
                    <option value="not replied">Not Replied</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="contacts-table-container">
        {filteredContacts.length > 0 ? (
          <table className="contacts-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Created At</th>
                <th>Subject</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map(contact => (
                <tr key={contact.id} onClick={() => openModal(contact)}>
                  <td className="contact-id">{contact.id}</td>
                  <td className="customer">
                    <div className="customer-info">
                      <span className="customer-name">{contact.name}</span>
                      <span className="customer-id">{contact.customerId}</span>
                    </div>
                  </td>
                  <td className="email">{contact.email}</td>
                  <td className="phone">{contact.phone}</td>
                  <td className="created-at">{formatDate(contact.createdAt)}</td>
                  <td className="subject">{contact.subject}</td>
                  <td className="status">
                    <div className="status-badge" style={{ backgroundColor: getStatusInfo(contact.status).color }}>
                      {getStatusInfo(contact.status).icon}
                      {getStatusInfo(contact.status).text}
                    </div>
                  </td>
                  <td className="actions">
                    <button 
                      className="view-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(contact);
                      }}
                    >
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-contacts">
            <p>No support requests found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Contact Detail Modal */}
      {isModalOpen && selectedContact && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Support Request: {selectedContact.id}</h3>
              <button 
                className="close-modal"
                onClick={() => setIsModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-row">
                  <span className="detail-label">Customer ID:</span>
                  <span className="detail-value">{selectedContact.customerId}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{selectedContact.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedContact.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{selectedContact.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Created At:</span>
                  <span className="detail-value">{formatDate(selectedContact.createdAt)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Subject:</span>
                  <span className="detail-value">{selectedContact.subject}</span>
                </div>
              </div>
              
              <div className="message-section">
                <h4>Customer Message:</h4>
                <div className="message-content">
                  {selectedContact.message}
                </div>
              </div>
              
              {selectedContact.replies.length > 0 && (
                <div className="replies-section">
                  <h4>Replies:</h4>
                  {selectedContact.replies.map(reply => (
                    <div key={reply.id} className="reply-item">
                      <div className="reply-header">
                        <span className="reply-admin">{reply.admin}</span>
                        <span className="reply-date">{formatDate(reply.createdAt)}</span>
                      </div>
                      <div className="reply-content">
                        {reply.message}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <form className="reply-form" onSubmit={handleReplySubmit}>
                <h4>Reply to Customer:</h4>
                <textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply here..."
                  rows="4"
                  required
                ></textarea>
                <button type="submit" className="submit-reply">
                  <FaReply /> Send Reply
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSupport;