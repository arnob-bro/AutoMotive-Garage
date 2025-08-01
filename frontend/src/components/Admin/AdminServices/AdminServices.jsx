import React, { useState, useEffect } from 'react';
import { 
  FaWrench, FaPlus, FaEdit, FaTrash, FaSearch, 
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
      duration: '30 mins',
      price: 69.99,
      category: 'Maintenance'
    },
    {
      id: 2,
      name: 'Brake Service',
      description: 'Full inspection with pad/disc replacement if needed',
      duration: '2 hours',
      price: 149.99,
      category: 'Repair'
    },
    {
      id: 3,
      name: 'Tire Rotation',
      description: 'Rotation, balancing and pressure check for all tires',
      duration: '45 mins',
      price: 39.99,
      category: 'Maintenance'
    },
    {
      id: 4,
      name: 'AC Performance Check',
      description: 'System diagnostic and refrigerant recharge',
      duration: '1 hour',
      price: 119.99,
      category: 'Repair'
    }
  ];

  // Sample packages data
  const initialPackages = [
    {
      id: 1,
      name: 'Basic Maintenance Package',
      services: [1, 3],
      price: 99.99,
      discount: 10,
      description: 'Essential maintenance services to keep your vehicle running smoothly'
    },
    {
      id: 2,
      name: 'Premium Care Package',
      services: [1, 2, 3],
      price: 229.99,
      discount: 15,
      description: 'Comprehensive package for complete vehicle care'
    }
  ];

  const [services, setServices] = useState(initialServices);
  const [packages, setPackages] = useState(initialPackages);
  const [activeTab, setActiveTab] = useState('services');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    duration: '',
    price: '',
    category: 'Maintenance'
  });
  
  const [packageForm, setPackageForm] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    services: []
  });

  // Prevent background scrolling when modals are open
  useEffect(() => {
    if (isAddModalOpen || isEditModalOpen || isPackageModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAddModalOpen, isEditModalOpen, isPackageModalOpen]);

  const categories = ['all', ...new Set(services.map(service => service.category))];

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredPackages = packages.filter(pkg => {
    return pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           pkg.description.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setServiceForm({
      ...serviceForm,
      [name]: value
    });
  };

  const handlePackageInputChange = (e) => {
    const { name, value } = e.target;
    setPackageForm({
      ...packageForm,
      [name]: value
    });
  };

  const handleServiceSelection = (serviceId) => {
    setPackageForm(prev => {
      if (prev.services.includes(serviceId)) {
        return {
          ...prev,
          services: prev.services.filter(id => id !== serviceId)
        };
      } else {
        return {
          ...prev,
          services: [...prev.services, serviceId]
        };
      }
    });
  };

  const openAddServiceModal = () => {
    setServiceForm({
      name: '',
      description: '',
      duration: '',
      price: '',
      category: 'Maintenance'
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
      category: service.category
    });
    setIsEditModalOpen(true);
  };

  const openAddPackageModal = () => {
    setPackageForm({
      name: '',
      description: '',
      price: '',
      discount: '',
      services: []
    });
    setIsPackageModalOpen(true);
    setCurrentItem(null);
  };

  const openEditPackageModal = (pkg) => {
    setCurrentItem(pkg);
    setPackageForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      discount: pkg.discount,
      services: pkg.services
    });
    setIsPackageModalOpen(true);
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
      category: 'Maintenance'
    });
  };

  const handlePackageSubmit = (e) => {
    e.preventDefault();
    
    if (currentItem) {
      const updatedPackages = packages.map(pkg => 
        pkg.id === currentItem.id ? { ...packageForm, id: currentItem.id } : pkg
      );
      setPackages(updatedPackages);
    } else {
      const newPackage = {
        ...packageForm,
        id: packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1
      };
      setPackages([...packages, newPackage]);
    }
    
    setIsPackageModalOpen(false);
    setCurrentItem(null);
    setPackageForm({
      name: '',
      description: '',
      price: '',
      discount: '',
      services: []
    });
  };

  const deleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id));
      setPackages(packages.map(pkg => ({
        ...pkg,
        services: pkg.services.filter(serviceId => serviceId !== id)
      })));
    }
  };

  const deletePackage = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(pkg => pkg.id !== id));
    }
  };

  const getServiceNameById = (id) => {
    const service = services.find(s => s.id === id);
    return service ? service.name : 'Unknown Service';
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>
          <FaWrench className="header-icon" />
          {activeTab === 'services' ? 'Manage Services' : 'Manage Packages'}
        </h1>
        
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === 'services' ? 'active' : ''}`}
            onClick={() => setActiveTab('services')}
          >
            <FaWrench /> Services
          </button>
          <button
            className={`tab-btn ${activeTab === 'packages' ? 'active' : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            <FaBox /> Packages
          </button>
        </div>
      </div>

      <div className="controls">
        <div className="search-filter">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {activeTab === 'services' && (
            <div className="filter-dropdown">
              <FaFilter className="filter-icon" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        
        <button
          className="add-btn"
          onClick={activeTab === 'services' ? openAddServiceModal : openAddPackageModal}
        >
          <FaPlus /> Add {activeTab === 'services' ? 'Service' : 'Package'}
        </button>
      </div>

      {activeTab === 'services' ? (
        <div className="table-container">
          {filteredServices.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map(service => (
                  <tr key={service.id}>
                    <td>{service.name}</td>
                    <td>{service.description}</td>
                    <td>{service.duration}</td>
                    <td>${service.price}</td>
                    <td>{service.category}</td>
                    <td className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => openEditServiceModal(service)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteService(service.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              <p>No services found matching your criteria.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="table-container">
          {filteredPackages.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Services Included</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPackages.map(pkg => (
                  <tr key={pkg.id}>
                    <td>{pkg.name}</td>
                    <td>{pkg.description}</td>
                    <td>
                      {pkg.services.length > 0 ? (
                        <ul className="services-list">
                          {pkg.services.map(serviceId => (
                            <li key={serviceId}>{getServiceNameById(serviceId)}</li>
                          ))}
                        </ul>
                      ) : (
                        'No services selected'
                      )}
                    </td>
                    <td>${pkg.price}</td>
                    <td>{pkg.discount}%</td>
                    <td className="actions">
                      <button
                        className="edit-btn"
                        onClick={() => openEditPackageModal(pkg)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deletePackage(pkg.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="no-results">
              <p>No packages found matching your criteria.</p>
            </div>
          )}
        </div>
      )}

      {/* Service Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>
                <FaWrench /> {isEditModalOpen ? 'Edit Service' : 'Add New Service'}
              </h3>
            </div>
            <div className="modal-body">
              <form onSubmit={handleServiceSubmit}>
                <div className="form-group">
                  <label>Service Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={serviceForm.name}
                    onChange={handleServiceInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={serviceForm.description}
                    onChange={handleServiceInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      name="duration"
                      className="form-control"
                      value={serviceForm.duration}
                      onChange={handleServiceInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      min="0"
                      step="0.01"
                      value={serviceForm.price}
                      onChange={handleServiceInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      className="form-control"
                      value={serviceForm.category}
                      onChange={handleServiceInputChange}
                    >
                      <option value="Maintenance">Maintenance</option>
                      <option value="Repair">Repair</option>
                      <option value="Diagnostic">Diagnostic</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                onClick={handleServiceSubmit}
              >
                {isEditModalOpen ? 'Update Service' : 'Add Service'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Package Modal */}
      {isPackageModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>
                <FaBox /> {currentItem ? 'Edit Package' : 'Add New Package'}
              </h3>
            </div>
            <div className="modal-body">
              <form onSubmit={handlePackageSubmit}>
                <div className="form-group">
                  <label>Package Name</label>
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={packageForm.name}
                    onChange={handlePackageInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={packageForm.description}
                    onChange={handlePackageInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price ($)</label>
                    <input
                      type="number"
                      name="price"
                      className="form-control"
                      min="0"
                      step="0.01"
                      value={packageForm.price}
                      onChange={handlePackageInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Discount (%)</label>
                    <input
                      type="number"
                      name="discount"
                      className="form-control"
                      min="0"
                      max="100"
                      value={packageForm.discount}
                      onChange={handlePackageInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Select Services</label>
                  <div className="services-checkbox-group">
                    {services.map(service => (
                      <div key={service.id} className="checkbox-item">
                        <input
                          type="checkbox"
                          id={`service-${service.id}`}
                          checked={packageForm.services.includes(service.id)}
                          onChange={() => handleServiceSelection(service.id)}
                        />
                        <label htmlFor={`service-${service.id}`}>
                          {service.name} (${service.price})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setIsPackageModalOpen(false);
                  setCurrentItem(null);
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="submit-btn"
                onClick={handlePackageSubmit}
              >
                {currentItem ? 'Update Package' : 'Add Package'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminServices;