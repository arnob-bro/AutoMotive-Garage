import React, { useState, useEffect } from 'react';
import { 
  FaBoxes, FaPlus, FaEdit, FaSearch, 
  FaFilter, FaWarehouse, FaDollarSign 
} from 'react-icons/fa';
import './AdminPartsInventory.css';

const AdminPartsInventory = () => {
  // Sample parts data
  const initialParts = [
    {
      id: 1,
      name: 'Premium Brake Pads',
      shortDescription: 'High-performance ceramic brake pads',
      longDescription: 'Premium ceramic brake pads designed for all weather conditions. Provides excellent stopping power and reduced brake dust. Fits most modern vehicles.',
      price: 5999,
      stock: 42,
      category: 'Brakes',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 2,
      name: 'Performance Air Filter',
      shortDescription: 'High-flow reusable air filter',
      longDescription: 'Performance air filter that increases airflow to your engine while providing excellent filtration. Washable and reusable design saves money over time.',
      price: 3999,
      stock: 28,
      category: 'Engine',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1590856029826-c7a1a7954a3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 3,
      name: 'Synthetic Motor Oil 5W-30',
      shortDescription: 'Full synthetic engine oil 5qt',
      longDescription: 'Advanced full synthetic motor oil that provides superior engine protection and performance. Reduces engine wear and improves fuel efficiency. Suitable for all modern vehicles.',
      price: 3499,
      stock: 75,
      category: 'Fluids',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 4,
      name: 'LED Headlight Bulbs',
      shortDescription: 'Ultra-bright LED conversion kit',
      longDescription: 'Direct replacement LED headlight bulbs that provide brighter, whiter light than standard halogen bulbs. Easy plug-and-play installation with no modifications required.',
      price: 8999,
      stock: 15,
      category: 'Lighting',
      status: 'Inactive',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    },
    {
      id: 5,
      name: 'Car Battery',
      shortDescription: 'High-performance automotive battery',
      longDescription: 'Premium car battery with high cold cranking amps (CCA) for reliable starts in all weather conditions. Maintenance-free design with long service life.',
      price: 12999,
      stock: 8,
      category: 'Electrical',
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&h=200&q=80'
    }
  ];

  const [parts, setParts] = useState(initialParts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState(null);
  const [partForm, setPartForm] = useState({
    name: '',
    shortDescription: '',
    longDescription: '',
    price: '',
    stock: '',
    category: 'Brakes',
    status: 'Active',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

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

  const categories = ['all', ...new Set(parts.map(part => part.category))];
  const statusOptions = ['all', 'Active', 'Inactive', 'Deleted'];

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         part.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || part.category === filterCategory;
    const matchesStock = filterStock === 'all' || 
                        (filterStock === 'low' && part.stock < 10) || 
                        (filterStock === 'medium' && part.stock >= 10 && part.stock < 30) ||
                        (filterStock === 'high' && part.stock >= 30);
    const matchesStatus = filterStatus === 'all' || part.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStock && matchesStatus;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartForm({
      ...partForm,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPartForm({
        ...partForm,
        image: file
      });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openAddPartModal = () => {
    setPartForm({
      name: '',
      shortDescription: '',
      longDescription: '',
      price: '',
      stock: '',
      category: 'Brakes',
      status: 'Active',
      image: null
    });
    setImagePreview(null);
    setIsAddModalOpen(true);
  };

  const openEditPartModal = (part) => {
    setCurrentPart(part);
    setPartForm({
      name: part.name,
      shortDescription: part.shortDescription,
      longDescription: part.longDescription,
      price: part.price,
      stock: part.stock,
      category: part.category,
      status: part.status,
      image: null
    });
    setImagePreview(part.image);
    setIsEditModalOpen(true);
  };

  const openDetailModal = (part) => {
    setCurrentPart(part);
    setIsDetailModalOpen(true);
  };

  const handlePartSubmit = (e) => {
    e.preventDefault();
    
    if (isEditModalOpen) {
      const updatedParts = parts.map(part => 
        part.id === currentPart.id ? { 
          ...partForm, 
          id: currentPart.id,
          image: imagePreview || currentPart.image
        } : part
      );
      setParts(updatedParts);
    } else {
      const newPart = {
        ...partForm,
        id: parts.length > 0 ? Math.max(...parts.map(p => p.id)) + 1 : 1,
        image: imagePreview || 'https://via.placeholder.com/300x200?text=No+Image'
      };
      setParts([...parts, newPart]);
    }
    
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setPartForm({
      name: '',
      shortDescription: '',
      longDescription: '',
      price: '',
      stock: '',
      category: 'Brakes',
      status: 'Active',
      image: null
    });
    setImagePreview(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="apm-dashboard-container">
      <div className="apm-dashboard-header">
        <h1>
          <FaBoxes className="apm-header-icon" />
          Parts Inventory Management
        </h1>
        <p>Manage your auto parts inventory efficiently</p>
      </div>

      <div className="apm-controls">
        <div className="apm-search-filters">
          <div className="apm-search-box">
            <FaSearch className="apm-search-icon" />
            <input
              type="text"
              placeholder="Search parts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="apm-filter-group">
            <div className="apm-filter-dropdown">
              <FaFilter className="apm-filter-icon" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.filter(c => c !== 'all').map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="apm-filter-dropdown">
              <FaWarehouse className="apm-filter-icon" />
              <select
                value={filterStock}
                onChange={(e) => setFilterStock(e.target.value)}
              >
                <option value="all">All Stock Levels</option>
                <option value="low">Low Stock (&lt; 10)</option>
                <option value="medium">Medium Stock (10-29)</option>
                <option value="high">High Stock (30+)</option>
              </select>
            </div>

            <div className="apm-filter-dropdown">
              <FaFilter className="apm-filter-icon" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
        <button
          className="apm-add-btn"
          onClick={openAddPartModal}
        >
          <FaPlus /> Add Part
        </button>
      </div>

      <div className="apm-inventory-stats">
        <div className="apm-stat-card">
          <div className="apm-stat-icon apm-total">
            <FaBoxes />
          </div>
          <div className="apm-stat-info">
            <h3>{parts.length}</h3>
            <p>Total Parts</p>
          </div>
        </div>
        
        <div className="apm-stat-card">
          <div className="apm-stat-icon apm-low">
            <FaBoxes />
          </div>
          <div className="apm-stat-info">
            <h3>{parts.filter(p => p.stock < 10).length}</h3>
            <p>Low Stock</p>
          </div>
        </div>
        
        <div className="apm-stat-card">
          <div className="apm-stat-icon apm-value">
            <FaDollarSign />
          </div>
          <div className="apm-stat-info">
            <h3>{formatPrice(parts.reduce((sum, part) => sum + (part.price * part.stock), 0))}</h3>
            <p>Total Inventory Value</p>
          </div>
        </div>
      </div>

      <div className="apm-table-container">
        {filteredParts.length > 0 ? (
          <table className="apm-data-table">
            <thead>
              <tr>
                <th>Part</th>
                <th>Short Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParts.map(part => (
                <tr key={part.id} onClick={() => openDetailModal(part)}>
                  <td className="apm-part-name">
                    <div className="apm-part-image">
                      <img src={part.image} alt={part.name} />
                    </div>
                    {part.name}
                  </td>
                  <td>{part.shortDescription}</td>
                  <td>{part.category}</td>
                  <td>{formatPrice(part.price)}</td>
                  <td className={part.stock < 10 ? 'apm-low-stock' : part.stock < 30 ? 'apm-medium-stock' : 'apm-high-stock'}>
                    {part.stock}
                  </td>
                  <td>
                    <span className={`apm-status-badge apm-status-${part.status.toLowerCase()}`}>
                      {part.status}
                    </span>
                  </td>
                  <td className="apm-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="apm-edit-btn"
                      onClick={() => openEditPartModal(part)}
                    >
                      <FaEdit />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="apm-no-results">
            <p>No parts found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Part Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="apm-modal-overlay">
          <div className="apm-modal-container">
            <div className="apm-modal-header">
              <h3>
                <FaBoxes /> {isEditModalOpen ? 'Edit Part' : 'Add New Part'}
              </h3>
            </div>
            <div className="apm-modal-body">
              <form onSubmit={handlePartSubmit}>
                <div className="apm-form-row">
                  <div className="apm-form-group">
                    <label>Part Name</label>
                    <input
                      type="text"
                      name="name"
                      className="apm-form-control"
                      value={partForm.name}
                      onChange={handleInputChange}
                      required
                      maxLength="100"
                    />
                  </div>
                  <div className="apm-form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      className="apm-form-control"
                      value={partForm.category}
                      onChange={handleInputChange}
                    >
                      <option value="Brakes">Brakes</option>
                      <option value="Engine">Engine</option>
                      <option value="Fluids">Fluids</option>
                      <option value="Lighting">Lighting</option>
                      <option value="Electrical">Electrical</option>
                      <option value="Tires">Tires</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                </div>
                
                <div className="apm-form-group">
                  <label>Short Description (max 100 characters)</label>
                  <input
                    type="text"
                    name="shortDescription"
                    className="apm-form-control"
                    value={partForm.shortDescription}
                    onChange={handleInputChange}
                    required
                    maxLength="100"
                  />
                </div>
                
                <div className="apm-form-group">
                  <label>Long Description (max 500 characters)</label>
                  <textarea
                    name="longDescription"
                    className="apm-form-control"
                    value={partForm.longDescription}
                    onChange={handleInputChange}
                    required
                    maxLength="500"
                    rows="4"
                  />
                </div>
                
                <div className="apm-form-row">
                  <div className="apm-form-group">
                    <label>Price (BDT)</label>
                    <input
                      type="number"
                      name="price"
                      className="apm-form-control"
                      min="0"
                      value={partForm.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="apm-form-group">
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      name="stock"
                      className="apm-form-control"
                      min="0"
                      value={partForm.stock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="apm-form-group">
                    <label>Status</label>
                    <select
                      name="status"
                      className="apm-form-control"
                      value={partForm.status}
                      onChange={handleInputChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Deleted">Deleted</option>
                    </select>
                  </div>
                </div>
                
                <div className="apm-form-group">
                  <label>Part Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="apm-form-control"
                  />
                  {imagePreview && (
                    <div className="apm-image-preview">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="apm-modal-footer">
              <button
                type="button"
                className="apm-cancel-btn"
                onClick={() => {
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                }}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="apm-submit-btn"
                onClick={handlePartSubmit}
              >
                {isEditModalOpen ? 'Update Part' : 'Add Part'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Part Detail Modal */}
      {isDetailModalOpen && currentPart && (
        <div className="apm-modal-overlay" onClick={() => setIsDetailModalOpen(false)}>
          <div className="apm-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="apm-modal-header">
              <h3>Part Details: {currentPart.name}</h3>
            </div>
            <div className="apm-modal-body">
              <div className="apm-detail-grid">
                <div className="apm-detail-image">
                  <img src={currentPart.image} alt={currentPart.name} />
                </div>
                <div className="apm-detail-info">
                  <div className="apm-detail-row">
                    <span className="apm-detail-label">Category:</span>
                    <span className="apm-detail-value">{currentPart.category}</span>
                  </div>
                  <div className="apm-detail-row">
                    <span className="apm-detail-label">Price:</span>
                    <span className="apm-detail-value">{formatPrice(currentPart.price)}</span>
                  </div>
                  <div className="apm-detail-row">
                    <span className="apm-detail-label">Stock:</span>
                    <span className={`apm-detail-value ${currentPart.stock < 10 ? 'apm-low-stock' : currentPart.stock < 30 ? 'apm-medium-stock' : 'apm-high-stock'}`}>
                      {currentPart.stock}
                    </span>
                  </div>
                  <div className="apm-detail-row">
                    <span className="apm-detail-label">Status:</span>
                    <span className={`apm-status-badge apm-status-${currentPart.status.toLowerCase()}`}>
                      {currentPart.status}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="apm-detail-description">
                <h4>Description</h4>
                <p>{currentPart.longDescription}</p>
              </div>
            </div>
            <div className="apm-modal-footer">
              <button 
                className="apm-close-btn"
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

export default AdminPartsInventory;