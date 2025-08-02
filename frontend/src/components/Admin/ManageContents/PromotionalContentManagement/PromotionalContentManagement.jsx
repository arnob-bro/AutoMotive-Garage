import React, { useState } from 'react';
import { 
  FaTag, FaPlus, FaEdit, FaSearch,
  FaFilter, FaCalendarAlt, FaChevronDown, FaChevronUp
} from 'react-icons/fa';
import './PromotionalContentManagement.css';

const PromotionalContentManagement = () => {
  // Sample promotional content data
  const initialPromotions = [
    {
      id: 'PROMO-001',
      title: 'Summer Special',
      content: '🔥 Summer Special: 20% off on AC servicing! 🔥',
      startDate: '2023-06-01',
      endDate: '2023-08-31',
      status: 'active',
      createdAt: '2023-05-15 10:30:00'
    },
    {
      id: 'PROMO-002',
      title: 'Brake Inspection',
      content: '🛠️ Free brake inspection with any full service 🛠️',
      startDate: '2023-07-01',
      endDate: '2023-07-31',
      status: 'expired',
      createdAt: '2023-06-20 14:15:00'
    },
    {
      id: 'PROMO-003',
      title: 'New Customer Discount',
      content: '🎉 New customer discount: 15% off your first service 🎉',
      startDate: '2023-08-01',
      endDate: '2023-12-31',
      status: 'active',
      createdAt: '2023-07-25 09:45:00'
    },
    {
      id: 'PROMO-004',
      title: 'Winter Tire Special',
      content: '❄️ Get 10% off winter tire installation ❄️',
      startDate: '2023-11-01',
      endDate: '2023-12-15',
      status: 'scheduled',
      createdAt: '2023-08-10 16:20:00'
    }
  ];

  const [promotions, setPromotions] = useState(initialPromotions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('startDate');
  const [sortDirection, setSortDirection] = useState('asc');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPromotion, setCurrentPromotion] = useState(null);
  const [newPromotion, setNewPromotion] = useState({
    title: '',
    content: '',
    startDate: '',
    endDate: '',
    status: 'scheduled'
  });

  // Status options for filtering
  const statusOptions = ['all', 'active', 'scheduled', 'expired'];

  // Filter promotions based on search and filters
  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = promo.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         promo.content.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || promo.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Sort promotions
  const sortedPromotions = [...filteredPromotions].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Get status color and text
  const getStatusInfo = (status) => {
    switch(status) {
      case 'active':
        return { color: 'var(--success)', text: 'Active' };
      case 'scheduled':
        return { color: 'var(--info)', text: 'Scheduled' };
      case 'expired':
        return { color: 'var(--warning)', text: 'Expired' };
      default:
        return { color: '', text: '' };
    }
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Open add modal
  const openAddModal = () => {
    setNewPromotion({
      title: '',
      content: '',
      startDate: '',
      endDate: '',
      status: 'scheduled'
    });
    setIsAddModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (promotion) => {
    setCurrentPromotion(promotion);
    setIsEditModalOpen(true);
  };

  // Handle add promotion
  const handleAddPromotion = () => {
    const newId = `PROMO-${String(promotions.length + 1).padStart(3, '0')}`;
    const addedPromotion = {
      ...newPromotion,
      id: newId,
      createdAt: new Date().toISOString()
    };
    setPromotions([...promotions, addedPromotion]);
    setIsAddModalOpen(false);
  };

  // Handle edit promotion
  const handleEditPromotion = () => {
    setPromotions(promotions.map(p => 
      p.id === currentPromotion.id ? currentPromotion : p
    ));
    setIsEditModalOpen(false);
  };

  return (
    <div className="promo-management">
      <div className="promo-header">
        <h1><FaTag /> Promotional Content Management</h1>
        <p>Create and manage promotional banners and offers</p>
      </div>

      <div className="promo-controls">
        <div className="promo-search-container">
          <div className="promo-search-box">
            <FaSearch className="promo-search-icon" />
            <input
              type="text"
              placeholder="Search promotions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="promo-search-input"
            />
          </div>
          
          <div className="promo-filter-container">
            <div className="promo-filter-group">
              <div className="promo-filter-dropdown">
                <label className="promo-filter-label">
                  <FaFilter className="promo-filter-icon" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="promo-filter-select"
                  >
                    <option value="all">All Statuses</option>
                    {statusOptions.filter(s => s !== 'all').map(status => (
                      <option key={status} value={status}>
                        {getStatusInfo(status).text}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="promo-actions">
          <button className="add-btn" onClick={openAddModal}>
            <FaPlus /> Add Promotion
          </button>
        </div>
      </div>

      <div className="promo-table-wrapper">
        {sortedPromotions.length > 0 ? (
          <table className="promo-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')}>
                  ID {sortField === 'id' && (sortDirection === 'asc' ? <FaChevronUp /> : <FaChevronDown />)}
                </th>
                <th onClick={() => handleSort('title')}>
                  Title {sortField === 'title' && (sortDirection === 'asc' ? <FaChevronUp /> : <FaChevronDown />)}
                </th>
                <th>Content</th>
                <th onClick={() => handleSort('startDate')}>
                  Start Date {sortField === 'startDate' && (sortDirection === 'asc' ? <FaChevronUp /> : <FaChevronDown />)}
                </th>
                <th onClick={() => handleSort('endDate')}>
                  End Date {sortField === 'endDate' && (sortDirection === 'asc' ? <FaChevronUp /> : <FaChevronDown />)}
                </th>
                <th onClick={() => handleSort('status')}>
                  Status {sortField === 'status' && (sortDirection === 'asc' ? <FaChevronUp /> : <FaChevronDown />)}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPromotions.map(promo => (
                <tr key={promo.id} className="promo-table-row">
                  <td className="promo-id">{promo.id}</td>
                  <td className="promo-title">{promo.title}</td>
                  <td className="promo-content">{promo.content}</td>
                  <td className="promo-date">{new Date(promo.startDate).toLocaleDateString()}</td>
                  <td className="promo-date">{new Date(promo.endDate).toLocaleDateString()}</td>
                  <td className="promo-status">
                    <div className="status-badge" style={{ backgroundColor: getStatusInfo(promo.status).color }}>
                      {getStatusInfo(promo.status).text}
                    </div>
                  </td>
                  <td className="promo-actions-cell">
                    <button 
                      className="edit-btn"
                      onClick={() => openEditModal(promo)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="promo-empty-state">
            <p>No promotions found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Add Promotion Modal */}
      {isAddModalOpen && (
        <div className="promo-modal-overlay">
          <div className="promo-modal-container">
            <div className="promo-modal-header">
              <h3>Add New Promotion</h3>
              <button 
                className="promo-modal-close"
                onClick={() => setIsAddModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="promo-modal-body">
              <div className="promo-form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={newPromotion.title}
                  onChange={(e) => setNewPromotion({...newPromotion, title: e.target.value})}
                  placeholder="Summer Special"
                />
              </div>
              
              <div className="promo-form-group">
                <label>Content</label>
                <textarea
                  value={newPromotion.content}
                  onChange={(e) => setNewPromotion({...newPromotion, content: e.target.value})}
                  placeholder="🔥 Summer Special: 20% off on AC servicing! 🔥"
                  rows="3"
                />
              </div>
              
              <div className="promo-form-row">
                <div className="promo-form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={newPromotion.startDate}
                    onChange={(e) => setNewPromotion({...newPromotion, startDate: e.target.value})}
                  />
                </div>
                
                <div className="promo-form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={newPromotion.endDate}
                    onChange={(e) => setNewPromotion({...newPromotion, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="promo-form-group">
                <label>Status</label>
                <select
                  value={newPromotion.status}
                  onChange={(e) => setNewPromotion({...newPromotion, status: e.target.value})}
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="active">Active</option>
                </select>
              </div>
            </div>
            
            <div className="promo-modal-footer">
              <button 
                className="promo-cancel-btn"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="promo-save-btn"
                onClick={handleAddPromotion}
              >
                Save Promotion
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Promotion Modal */}
      {isEditModalOpen && currentPromotion && (
        <div className="promo-modal-overlay">
          <div className="promo-modal-container">
            <div className="promo-modal-header">
              <h3>Edit Promotion: {currentPromotion.id}</h3>
              <button 
                className="promo-modal-close"
                onClick={() => setIsEditModalOpen(false)}
              >
                ×
              </button>
            </div>
            
            <div className="promo-modal-body">
              <div className="promo-form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={currentPromotion.title}
                  onChange={(e) => setCurrentPromotion({...currentPromotion, title: e.target.value})}
                />
              </div>
              
              <div className="promo-form-group">
                <label>Content</label>
                <textarea
                  value={currentPromotion.content}
                  onChange={(e) => setCurrentPromotion({...currentPromotion, content: e.target.value})}
                  rows="3"
                />
              </div>
              
              <div className="promo-form-row">
                <div className="promo-form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    value={currentPromotion.startDate}
                    onChange={(e) => setCurrentPromotion({...currentPromotion, startDate: e.target.value})}
                  />
                </div>
                
                <div className="promo-form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    value={currentPromotion.endDate}
                    onChange={(e) => setCurrentPromotion({...currentPromotion, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="promo-form-group">
                <label>Status</label>
                <select
                  value={currentPromotion.status}
                  onChange={(e) => setCurrentPromotion({...currentPromotion, status: e.target.value})}
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                </select>
              </div>
            </div>
            
            <div className="promo-modal-footer">
              <button 
                className="promo-cancel-btn"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                className="promo-save-btn"
                onClick={handleEditPromotion}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionalContentManagement;