import React, { useState, useEffect } from 'react';
import { 
  FaBoxes, FaPlus, FaEdit, FaTrash, FaSearch, 
  FaFilter, FaCar, FaDollarSign, FaWarehouse 
} from 'react-icons/fa';
import './AdminPartsInventory.css';

const AdminPartsInventory = () => {
  // Sample parts data
  const initialParts = [
    {
      id: 1,
      name: 'Premium Brake Pads',
      description: 'High-performance ceramic brake pads for all weather conditions',
      price: 59.99,
      stock: 42,
      category: 'Brakes',
      compatibleVehicles: ['Toyota Corolla 2015-2020', 'Honda Civic 2016-2021'],
      image: 'https://via.placeholder.com/300x200?text=Brake+Pads'
    },
    {
      id: 2,
      name: 'Performance Air Filter',
      description: 'High-flow reusable air filter',
      price: 39.99,
      stock: 28,
      category: 'Engine',
      compatibleVehicles: ['Toyota Corolla 2015-2020', 'Honda Civic 2016-2021', 'Ford F-150 2018-2022'],
      image: 'https://via.placeholder.com/300x200?text=Air+Filter'
    },
    {
      id: 3,
      name: 'Synthetic Motor Oil 5W-30',
      description: 'Full synthetic engine oil 5qt',
      price: 34.99,
      stock: 75,
      category: 'Fluids',
      compatibleVehicles: ['All Vehicles'],
      image: 'https://via.placeholder.com/300x200?text=Motor+Oil'
    },
    {
      id: 4,
      name: 'LED Headlight Bulbs',
      description: 'Ultra-bright LED conversion kit',
      price: 89.99,
      stock: 15,
      category: 'Lighting',
      compatibleVehicles: ['Toyota Corolla 2015-2020', 'Honda Civic 2016-2021'],
      image: 'https://via.placeholder.com/300x200?text=LED+Bulbs'
    },
    {
      id: 5,
      name: 'Car Battery',
      description: 'High-performance automotive battery',
      price: 129.99,
      stock: 8,
      category: 'Electrical',
      compatibleVehicles: ['Toyota Corolla 2015-2020', 'Honda Civic 2016-2021', 'Ford F-150 2018-2022'],
      image: 'https://via.placeholder.com/300x200?text=Battery'
    }
  ];

  const [parts, setParts] = useState(initialParts);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStock, setFilterStock] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentPart, setCurrentPart] = useState(null);
  
  const [partForm, setPartForm] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'Brakes',
    compatibleVehicles: [],
    image: ''
  });

  const [newVehicle, setNewVehicle] = useState('');

  // Prevent background scrolling when modals are open
  useEffect(() => {
    if (isAddModalOpen || isEditModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isAddModalOpen, isEditModalOpen]);

  const categories = ['all', ...new Set(parts.map(part => part.category))];

  const filteredParts = parts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         part.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || part.category === filterCategory;
    const matchesStock = filterStock === 'all' || 
                        (filterStock === 'low' && part.stock < 10) || 
                        (filterStock === 'medium' && part.stock >= 10 && part.stock < 30) ||
                        (filterStock === 'high' && part.stock >= 30);
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPartForm({
      ...partForm,
      [name]: value
    });
  };

  const handleVehicleAdd = () => {
    if (newVehicle.trim() && !partForm.compatibleVehicles.includes(newVehicle.trim())) {
      setPartForm({
        ...partForm,
        compatibleVehicles: [...partForm.compatibleVehicles, newVehicle.trim()]
      });
      setNewVehicle('');
    }
  };

  const handleVehicleRemove = (vehicle) => {
    setPartForm({
      ...partForm,
      compatibleVehicles: partForm.compatibleVehicles.filter(v => v !== vehicle)
    });
  };

  const openAddPartModal = () => {
    setPartForm({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: 'Brakes',
      compatibleVehicles: [],
      image: ''
    });
    setIsAddModalOpen(true);
  };

  const openEditPartModal = (part) => {
    setCurrentPart(part);
    setPartForm({
      name: part.name,
      description: part.description,
      price: part.price,
      stock: part.stock,
      category: part.category,
      compatibleVehicles: [...part.compatibleVehicles],
      image: part.image
    });
    setIsEditModalOpen(true);
  };

  const handlePartSubmit = (e) => {
    e.preventDefault();
    
    if (isEditModalOpen) {
      const updatedParts = parts.map(part => 
        part.id === currentPart.id ? { ...partForm, id: currentPart.id } : part
      );
      setParts(updatedParts);
    } else {
      const newPart = {
        ...partForm,
        id: parts.length > 0 ? Math.max(...parts.map(p => p.id)) + 1 : 1
      };
      setParts([...parts, newPart]);
    }
    
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setPartForm({
      name: '',
      description: '',
      price: '',
      stock: '',
      category: 'Brakes',
      compatibleVehicles: [],
      image: ''
    });
  };

  const deletePart = (id) => {
    if (window.confirm('Are you sure you want to delete this part?')) {
      setParts(parts.filter(part => part.id !== id));
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>
          <FaBoxes className="header-icon" />
          Parts Inventory Management
        </h1>
        <p></p>
      </div>

      <div className="controls">
        <div className="search-filters">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search parts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="filter-group">
            <div className="filter-dropdown">
              <FaFilter className="filter-icon" />
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
            
            <div className="filter-dropdown">
              <FaWarehouse className="filter-icon" />
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
          </div>
        </div>
        
        <button
          className="add-btn"
          onClick={openAddPartModal}
        >
          <FaPlus /> Add Part
        </button>
      </div>

      <div className="inventory-stats">
        <div className="stat-card">
          <div className="stat-icon total">
            <FaBoxes />
          </div>
          <div className="stat-info">
            <h3>{parts.length}</h3>
            <p>Total Parts</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon low">
            <FaBoxes />
          </div>
          <div className="stat-info">
            <h3>{parts.filter(p => p.stock < 10).length}</h3>
            <p>Low Stock</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon value">
            <FaDollarSign />
          </div>
          <div className="stat-info">
            <h3>${parts.reduce((sum, part) => sum + (part.price * part.stock), 0).toFixed(2)}</h3>
            <p>Total Inventory Value</p>
          </div>
        </div>
      </div>

      <div className="table-container">
        {filteredParts.length > 0 ? (
          <table className="data-table">
            <thead>
              <tr>
                <th>Part</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Compatibility</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredParts.map(part => (
                <tr key={part.id}>
                  <td className="part-name">
                    <div className="part-image">
                      <img src={part.image} alt={part.name} />
                    </div>
                    {part.name}
                  </td>
                  <td>{part.description}</td>
                  <td>{part.category}</td>
                  <td>${part.price}</td>
                  <td className={part.stock < 10 ? 'low-stock' : part.stock < 30 ? 'medium-stock' : 'high-stock'}>
                    {part.stock}
                  </td>
                  <td>
                    {part.compatibleVehicles.length > 0 ? (
                      <div className="compatibility-list">
                        {part.compatibleVehicles.slice(0, 2).map((vehicle, index) => (
                          <span key={index} className="vehicle-tag">{vehicle}</span>
                        ))}
                        {part.compatibleVehicles.length > 2 && (
                          <span className="more-tag">+{part.compatibleVehicles.length - 2} more</span>
                        )}
                      </div>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => openEditPartModal(part)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => deletePart(part.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-results">
            <p>No parts found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Add/Edit Part Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3>
                <FaBoxes /> {isEditModalOpen ? 'Edit Part' : 'Add New Part'}
              </h3>
            </div>
            <div className="modal-body">
              <form onSubmit={handlePartSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Part Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={partForm.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      name="category"
                      className="form-control"
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
                
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    className="form-control"
                    value={partForm.description}
                    onChange={handleInputChange}
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
                      value={partForm.price}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock Quantity</label>
                    <input
                      type="number"
                      name="stock"
                      className="form-control"
                      min="0"
                      value={partForm.stock}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="image"
                    className="form-control"
                    value={partForm.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
                
                <div className="form-group">
                  <label>Compatible Vehicles</label>
                  <div className="vehicle-input">
                    <input
                      type="text"
                      value={newVehicle}
                      onChange={(e) => setNewVehicle(e.target.value)}
                      placeholder="Add compatible vehicle (e.g., Toyota Corolla 2015-2020)"
                    />
                    <button 
                      type="button" 
                      className="add-vehicle-btn"
                      onClick={handleVehicleAdd}
                    >
                      Add
                    </button>
                  </div>
                  
                  {partForm.compatibleVehicles.length > 0 && (
                    <div className="vehicle-tags">
                      {partForm.compatibleVehicles.map((vehicle, index) => (
                        <span key={index} className="vehicle-tag">
                          {vehicle}
                          <button 
                            type="button"
                            onClick={() => handleVehicleRemove(vehicle)}
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
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
                onClick={handlePartSubmit}
              >
                {isEditModalOpen ? 'Update Part' : 'Add Part'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPartsInventory;