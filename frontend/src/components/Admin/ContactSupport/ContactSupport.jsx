import React, { useState, useEffect } from 'react';
import { 
  FaSearch, FaFilter, FaEnvelope, FaReply, 
  FaCheckCircle, FaTimesCircle, FaEye, FaChevronDown, FaChevronUp 
} from 'react-icons/fa';
import './ContactSupport.css';
import ContactApi from '../../../apis/contactApi';
const contactApi = new ContactApi();

const ContactSupport = () => {
  const [messages, setMessages] = useState([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [searchEmail, setSearchEmail] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const messagesPerPage = 10;

  // Fetch messages from API with server-side pagination
  const fetchMessages = async (page = 1) => {
    try {
      const result = await contactApi.getInquiries({
        page,
        limit: messagesPerPage,
        email: searchEmail || "",
        status: statusFilter || "",
      });

      setMessages(result.inquiries || []);
      console.log(result.inquiries);
      setTotalPages(result.pagination?.totalPages || 1);
      setTotalMessages(result.pagination?.total || 0);
    } catch (err) {
      console.error("Failed to fetch inquiries", err);
      setMessages([]);
      setTotalPages(1);
      setTotalMessages(0);
    }
  };


  useEffect(() => {
    fetchMessages(currentPage);
  }, [currentPage, searchEmail, statusFilter]);

  // Open modal
  const openModal = async (message) => {
    console.log(message.contactform_id);
    const result = await contactApi.getReplyByContactFormId(message.contactform_id);
    console.log(result.reply);
    const messageWithReply = {
      ...message,
      reply: result.reply
    };

    setSelectedMessage(messageWithReply);
    setIsViewModalOpen(true);
  };

  // Reply to message
  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedMessage) return;

    try {
      const result = await contactApi.sendReply(selectedMessage.contactform_id, 
        replyMessage
      );
      if(!result.success) throw new Error("reply failed");

      // const updatedMessages = messages.map(msg =>
      //   msg.contactform_id === selectedMessage.contactform_id
      //     ? { ...msg, status: 'Replied', replies: [...(msg.replies || []), result.reply] }
      //     : msg
      // );

      // setMessages(updatedMessages);
      // setSelectedMessage(prev => ({
      //   ...prev,
      //   status: 'Replied',
      //   replies: [...(prev.replies || []), result.reply]
      // }));
      // setReplyMessage('');
      window.location.reload();

      setIsViewModalOpen(false);

    } catch (err) {
      console.error("Failed to send reply", err);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const getStatusInfo = (status) => {
    switch(status) {
      case 'Replied':
        return { icon: <FaCheckCircle />, color: 'var(--success)', text: 'Replied' };
      case 'Unread':
        return { icon: <FaTimesCircle />, color: 'var(--danger)', text: 'Not Replied' };
      default:
        return { icon: null, color: '', text: '' };
    }
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
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
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
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">All Statuses</option>
                    <option value="Replied">Replied</option>
                    <option value="Unread">Unread</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="contacts-table-container">
        {messages.length > 0 ? (
          <table className="contacts-table">
            <thead>
              <tr>
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
              {messages.map(contact => (
                <tr key={contact.contactform_id}>
                  <td className="customer">
                    <div className="customer-info">
                      <span className="customer-name">{contact.name}</span>
                    </div>
                  </td>
                  <td className="email">{contact.email}</td>
                  <td className="phone">{contact.phone}</td>
                  <td className="created-at">{formatDate(contact.created_at)}</td>
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
                      onClick={(e) => { e.stopPropagation(); openModal(contact); }}
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
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? "active" : ""}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            >
              Next
            </button>
          </div>
        )}

      </div>

      {/* Modal */}
      {isViewModalOpen && selectedMessage && (
        <div className="modal-overlay" onClick={() => setIsViewModalOpen(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Support Request: {selectedMessage.contactform_id}</h3>
              <button className="close-modal" onClick={() => setIsViewModalOpen(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="detail-grid">
                <div className="detail-row">
                  <span className="detail-label">Customer ID:</span>
                  <span className="detail-value">{selectedMessage.contactform_id}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{selectedMessage.name}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Email:</span>
                  <span className="detail-value">{selectedMessage.email}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-value">{selectedMessage.phone}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Created At:</span>
                  <span className="detail-value">{formatDate(selectedMessage.created_at)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Subject:</span>
                  <span className="detail-value">{selectedMessage.subject}</span>
                </div>
              </div>

              <div className="message-section">
                <h4>Customer Message:</h4>
                <div className="message-content">{selectedMessage.message}</div>
              </div>

              {selectedMessage.reply && (
                <div className="replies-section">
                  <h4>Reply:</h4>
                  
                    <div className="reply-item">
                      <div className="reply-header">
                        <span className="reply-admin">{selectedMessage.reply.admin}</span>
                        <span className="reply-date">{formatDate(selectedMessage.reply.created_at)}</span>
                      </div>
                      <div className="reply-content">{selectedMessage.reply.message}</div>
                    </div>
                </div>
              )}

              {!selectedMessage.reply &&
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

              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSupport;
