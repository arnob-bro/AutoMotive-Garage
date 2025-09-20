import React, { useState, useEffect } from 'react';
import { 
  FaWrench, FaPlus, FaEdit, FaSearch, 
  FaFilter, FaBox, FaMoneyBillWave, FaClock 
} from 'react-icons/fa';
import ServiceApi from '../../../apis/serviceApi'; // Adjust the import path as needed
import './AdminServices.css';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
    status: 'Active'
  });

  // Initialize ServiceApi
  const serviceApi = new ServiceApi();

  const statusOptions = ['all', 'Active', 'Inactive', 'Deleted'];

  // Fetch services from API
  const fetchServices = async (page = 1, searchTerm = '', status = 'all') => {
    try {
      setLoading(true);
      setError('');
      
      const response = await serviceApi.getServices({
        page,
        limit: pagination.limit,
        searchTerm,
        status: status === 'all' ? '' : status
      });

      if (response.success) {
        setServices(response.services || []);
        setPagination(response.pagination || {});
      } else {
        setError('Failed to fetch services');
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err.error || 'Failed to fetch services');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  // Load services on component mount and when search/filter changes
  useEffect(() => {
    fetchServices(1, searchTerm, filterStatus);
  }, [searchTerm, filterStatus]);

  // Prevent background scrolling when modals are open
  useEffect(() => {
    if (isAddModalOpen || isEditModalOpen || isDetailModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAddModalOpen, isEditModalOpen, isDetailModalOpen]);

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setServiceForm({
      ...serviceForm,
      [name]: value
    });
  };

  const openAddServiceModal = () => {
    setServiceForm({
      name: '',
      description: '',
      duration: '',
      price: '',
      status: 'Active'
    });
    setIsAddModalOpen(true);
  };

  const openEditServiceModal = (service) => {
    setCurrentItem(service);
    setServiceForm({
      name: service.name,
      description: service.description,
      duration: service.duration,
      price: service.price.toString(),
      status: service.status
    });
    setIsEditModalOpen(true);
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError('');

      const serviceData = {
        name: serviceForm.name,
        description: serviceForm.description,
        duration: serviceForm.duration,
        price: parseFloat(serviceForm.price),
        status: serviceForm.status
      };

      if (isEditModalOpen) {
        // Update existing service
        await serviceApi.updateService(currentItem.service_id, serviceData);
        setIsEditModalOpen(false);
      } else {
        // Create new service
        await serviceApi.createService(serviceData);
        setIsAddModalOpen(false);
      }

      // Reset form
      setServiceForm({
        name: '',
        description: '',
        duration: '',
        price: '',
        status: 'Active'
      });

      // Refresh services list
      await fetchServices(pagination.page, searchTerm, filterStatus);
      
    } catch (err) {
      console.error('Error saving service:', err);
      setError(err.error || 'Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Active': return 'as-status-active';
      case 'Inactive': return 'as-status-inactive';
      case 'Deleted': return 'as-status-deleted';
      default: return '';
    }
  };

  const openDetailModal = (item) => {
    setCurrentItem(item);
    setIsDetailModalOpen(true);
  };

  const closeModals = () => {
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setIsDetailModalOpen(false);
    setCurrentItem(null);
    setError('');
  };

  return (
    <div className="as-dashboard-container">
      <div className="as-dashboard-header">
        <h1>
          <FaWrench className="as-header-icon" />
          Manage Services
        </h1>
      </div>

      {error && (
        <div className="as-error-message" style={{
          backgroundColor: '#fee', 
          color: '#c33', 
          padding: '10px', 
          borderRadius: '4px', 
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <div className="as-controls">
        <div className="as-search-filter">
          <div className="as-search-box">
            <FaSearch className="as-search-icon" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="as-search-input"
            />
          </div>

          <div className="as-filter-dropdown">
            <FaFilter className="as-filter-icon" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="as-filter-select"
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          className="as-add-btn"
          onClick={openAddServiceModal}
          disabled={loading}
        >
          <FaPlus /> Add Service
        </button>
      </div>

      <div className="as-table-container">
        {loading ? (
          <div className="as-loading" style={{textAlign: 'center', padding: '20px'}}>
            Loading services...
          </div>
        ) : services.length > 0 ? (
          <table className="as-data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Duration</th>
                <th>Price (BDT)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.service_id} onClick={() => openDetailModal(service)}>
                  <td>{service.name}</td>
                  <td>{service.duration}</td>
                  <td>{parseFloat(service.price).toFixed(2)}</td>
                  <td>
                    <span className={`as-status-badge ${getStatusClass(service.status)}`}>
                      {service.status}
                    </span>
                  </td>
                  <td className="as-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="as-edit-btn"
                      onClick={() => openEditServiceModal(service)}
                      disabled={loading}
                    >
                      <FaEdit /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="as-no-results">
            <p>No services found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="as-pagination" style={{
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '10px', 
          marginTop: '20px'
        }}>
          <button 
            onClick={() => fetchServices(pagination.page - 1, searchTerm, filterStatus)}
            disabled={pagination.page <= 1 || loading}
            style={{padding: '8px 12px'}}
          >
            Previous
          </button>
          <span>Page {pagination.page} of {pagination.totalPages}</span>
          <button 
            onClick={() => fetchServices(pagination.page + 1, searchTerm, filterStatus)}
            disabled={pagination.page >= pagination.totalPages || loading}
            style={{padding: '8px 12px'}}
          >
            Next
          </button>
        </div>
      )}

      {/* Service Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="as-modal-overlay">
          <div className="as-modal-container">
            <div className="as-modal-header">
              <h3>
                <FaWrench /> {isEditModalOpen ? 'Edit Service' : 'Add New Service'}
              </h3>
            </div>
            <div className="as-modal-body">
              <form onSubmit={handleServiceSubmit}>
                <div className="as-form-group">
                  <label>Service Name</label>
                  <input
                    type="text"
                    name="name"
                    className="as-form-control"
                    value={serviceForm.name}
                    onChange={handleServiceInputChange}
                    required
                  />
                </div>
                <div className="as-form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="as-form-control"
                    value={serviceForm.description}
                    onChange={handleServiceInputChange}
                    required
                  />
                </div>
                <div className="as-form-row">
                  <div className="as-form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      name="duration"
                      className="as-form-control"
                      value={serviceForm.duration}
                      onChange={handleServiceInputChange}
                      placeholder="e.g., 2 hours, 30 min"
                      required
                    />
                  </div>
                  <div className="as-form-group">
                    <label>Price (BDT)</label>
                    <input
                      type="number"
                      name="price"
                      className="as-form-control"
                      min="0"
                      step="0.01"
                      value={serviceForm.price}
                      onChange={handleServiceInputChange}
                      required
                    />
                  </div>
                  
                  <div className="as-form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      className="as-form-control"
                      value={serviceForm.status}
                      onChange={handleServiceInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Deleted">Deleted</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="as-modal-footer">
              <button
                type="button"
                className="as-cancel-btn"
                onClick={closeModals}
                disabled={loading}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="as-submit-btn"
                onClick={handleServiceSubmit}
                disabled={loading}
              >
                {loading ? 'Saving...' : (isEditModalOpen ? 'Update Service' : 'Add Service')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isDetailModalOpen && currentItem && (
        <div className="as-modal-overlay" onClick={closeModals}>
          <div className="as-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="as-modal-header">
              <h3>{currentItem.name} Details</h3>
              <button 
                className="as-close-modal"
                onClick={closeModals}
              >
                ×
              </button>
            </div>
            
            <div className="as-modal-body">
              <div className="as-detail-grid">
                <div className="as-detail-row">
                  <span className="as-detail-label">Name:</span>
                  <span className="as-detail-value">{currentItem.name}</span>
                </div>
                <div className="as-detail-row">
                  <span className="as-detail-label">Description:</span>
                  <span className="as-detail-value">{currentItem.description}</span>
                </div>
                <div className="as-detail-row">
                  <span className="as-detail-label">Duration:</span>
                  <span className="as-detail-value">{currentItem.duration}</span>
                </div>
                <div className="as-detail-row">
                  <span className="as-detail-label">Price:</span>
                  <span className="as-detail-value">BDT {parseFloat(currentItem.price).toFixed(2)}</span>
                </div>
                <div className="as-detail-row">
                  <span className="as-detail-label">Status:</span>
                  <span className="as-detail-value">
                    <span className={`as-status-badge ${getStatusClass(currentItem.status)}`}>
                      {currentItem.status}
                    </span>
                  </span>
                </div>
                <div className="as-detail-row">
                  <span className="as-detail-label">Created:</span>
                  <span className="as-detail-value">
                    {new Date(currentItem.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="as-detail-row">
                  <span className="as-detail-label">Last Updated:</span>
                  <span className="as-detail-value">
                    {new Date(currentItem.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="as-modal-footer">
              <button 
                className="as-close-btn"
                onClick={closeModals}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;