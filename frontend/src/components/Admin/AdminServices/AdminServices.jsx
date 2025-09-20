import React, { useState, useEffect } from 'react';
import { 
  FaWrench, FaPlus, FaEdit, FaSearch, 
  FaFilter, FaBox, FaMoneyBillWave, FaClock 
} from 'react-icons/fa';
import './AdminServices.css';

const AdminServices = () => {
  // Sample services data
  const initialServices = [
    {
      id: 1,
      name: 'Oil Change',
      description: 'Full synthetic oil change with OEM filter replacement',
      duration: '2 hours',
      price: 699.99,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Brake Service',
      description: 'Full inspection with pad/disc replacement if needed',
      duration: '2 hours',
      price: 1499.99,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Tire Rotation',
      description: 'Rotation, balancing and pressure check for all tires',
      duration: '45 mins',
      price: 399.99,
      status: 'Inactive'
    },
    {
      id: 4,
      name: 'AC Performance Check',
      description: 'System diagnostic and refrigerant recharge',
      duration: '1 hour',
      price: 1199.99,
      status: 'Deleted'
    }
  ];

  

  const [services, setServices] = useState(initialServices);
  // const [packages, setPackages] = useState(initialPackages);
  const [activeTab, setActiveTab] = useState('services');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
    status: 'Active'
  });
  

  // Prevent background scrolling when modals are open
  useEffect(() => {
    if (isAddModalOpen || isEditModalOpen /*|| isPackageModalOpen*/ || isDetailModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAddModalOpen, isEditModalOpen, /*isPackageModalOpen,*/ isDetailModalOpen]);

  
  const statusOptions = ['all', 'Active', 'Inactive', 'Deleted'];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

 

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
      price: service.price,
      status: service.status
    });
    setIsEditModalOpen(true);
  };


  const handleServiceSubmit = (e) => {
    e.preventDefault();
    
    if (isEditModalOpen) {
      const updatedServices = services.map(service => 
        service.id === currentItem.id ? { ...serviceForm, id: currentItem.id } : service
      );
      setServices(updatedServices);
    } else {
      const newService = {
        ...serviceForm,
        id: services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1
      };
      setServices([...services, newService]);
    }
    
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setServiceForm({
      name: '',
      description: '',
      duration: '',
      price: '',
      status: 'Active'
    });
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

  return (
    <div className="as-dashboard-container">
      <div className="as-dashboard-header">
        <h1>
          <FaWrench className="as-header-icon" />
          Manage Services
        </h1>
        
        
      </div>

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
          onClick={openAddServiceModal}// onClick={activeTab === 'services' ? openAddServiceModal : openAddPackageModal}
        >
          <FaPlus /> Add Service
        </button>
      </div>

        <div className="as-table-container">
          {filteredServices.length > 0 ? (
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
                {filteredServices.map(service => (
                  <tr key={service.id} onClick={() => openDetailModal(service)}>
                    <td>{service.name}</td>
                    <td>{service.duration}</td>
                    <td>{service.price.toFixed(2)}</td>
                    <td>
                      <span className={`as-status-badge ${getStatusClass(service.status)}`}>
                        {service.status}
                      </span>
                    </td>
                    <td className="as-actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="as-edit-btn"
                        onClick={() => openEditServiceModal(service)}
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
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="as-submit-btn"
                onClick={handleServiceSubmit}
              >
                {isEditModalOpen ? 'Update Service' : 'Add Service'}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Detail Modal */}
      {isDetailModalOpen && currentItem && (
        <div className="as-modal-overlay" onClick={() => setIsDetailModalOpen(false)}>
          <div className="as-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="as-modal-header">
              <h3>{currentItem.name} Details</h3>
              <button 
                className="as-close-modal"
                onClick={() => setIsDetailModalOpen(false)}
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
                
                {/* Only showing service details since packages are commented out */}
                <>
                  <div className="as-detail-row">
                    <span className="as-detail-label">Duration:</span>
                    <span className="as-detail-value">{currentItem.duration}</span>
                  </div>
                  <div className="as-detail-row">
                    <span className="as-detail-label">Price:</span>
                    <span className="as-detail-value">BDT {currentItem.price.toFixed(2)}</span>
                  </div>
                  
                </>
                
                <div className="as-detail-row">
                  <span className="as-detail-label">Status:</span>
                  <span className="as-detail-value">
                    <span className={`as-status-badge ${getStatusClass(currentItem.status)}`}>
                      {currentItem.status}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            
            <div className="as-modal-footer">
              <button 
                className="as-close-btn"
                onClick={() => setIsDetailModalOpen(false)}
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