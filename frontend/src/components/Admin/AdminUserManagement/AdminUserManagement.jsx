import React, { useState } from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaCalendarAlt, 
  FaSearch, FaEdit, FaTrash, FaFilter,
  FaUserTie, FaUserCircle, FaInfoCircle,
  FaCar, FaTools, FaMoneyBillWave
} from 'react-icons/fa';
import './AdminUserManagement.css';

const AdminUserManagement = () => {
  // Sample user data with service and parts history
  const allUsers = [
    {
      id: 1,
      userId: 'USR-001',
      name: 'John Smith',
      email: 'john.smith@example.com',
      phone: '(555) 123-4567',
      role: 'customer',
      joinDate: '2022-01-15',
      lastLogin: '2023-06-10 09:45 AM',
      vehicles: ['Toyota Corolla 2020', 'Honda CR-V 2018'],
      services: [
        { id: 'SRV-101', date: '2023-01-10', type: 'Oil Change', cost: '$89.99', status: 'completed' },
        { id: 'SRV-102', date: '2023-04-15', type: 'Tire Rotation', cost: '$49.99', status: 'completed' }
      ],
      parts: [
        { id: 'PRT-201', date: '2023-02-20', name: 'Air Filter', cost: '$24.99', status: 'delivered' },
        { id: 'PRT-202', date: '2023-05-05', name: 'Brake Pads', cost: '$79.99', status: 'delivered' }
      ],
      payments: [
        { id: 'PAY-301', date: '2023-01-10', amount: '$89.99', method: 'Credit Card' },
        { id: 'PAY-302', date: '2023-02-20', amount: '$24.99', method: 'Credit Card' }
      ]
    },
    {
      id: 2,
      userId: 'USR-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '(555) 987-6543',
      role: 'premium',
      joinDate: '2022-03-22',
      lastLogin: '2023-06-10 02:30 PM',
      vehicles: ['Ford F-150 2021'],
      services: [
        { id: 'SRV-103', date: '2023-03-18', type: 'Full Service', cost: '$249.99', status: 'completed' }
      ],
      parts: [],
      payments: [
        { id: 'PAY-303', date: '2023-03-18', amount: '$249.99', method: 'PayPal' }
      ]
    },
    {
      id: 3,
      userId: 'USR-003',
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      phone: '(555) 456-7890',
      role: 'premium',
      joinDate: '2022-05-10',
      lastLogin: '2023-06-10 11:15 AM',
      vehicles: ['Tesla Model 3 2022', 'BMW X5 2020'],
      services: [
        { id: 'SRV-104', date: '2023-01-25', type: 'Battery Check', cost: '$39.99', status: 'completed' },
        { id: 'SRV-105', date: '2023-05-20', type: 'Wheel Alignment', cost: '$89.99', status: 'completed' }
      ],
      parts: [
        { id: 'PRT-203', date: '2023-05-20', name: 'Wheel Bearings', cost: '$129.99', status: 'delivered' }
      ],
      payments: [
        { id: 'PAY-304', date: '2023-01-25', amount: '$39.99', method: 'Credit Card' },
        { id: 'PAY-305', date: '2023-05-20', amount: '$219.98', method: 'Credit Card' }
      ]
    },
    {
      id: 4,
      userId: 'USR-004',
      name: 'Robert Williams',
      email: 'robert.w@example.com',
      phone: '(555) 789-0123',
      role: 'customer',
      joinDate: '2022-07-18',
      lastLogin: '2023-05-05 03:00 PM',
      vehicles: [],
      services: [],
      parts: [],
      payments: []
    },
    {
      id: 5,
      userId: 'USR-005',
      name: 'Emily Davis',
      email: 'emily.d@example.com',
      phone: '(555) 234-5678',
      role: 'customer',
      joinDate: '2022-09-05',
      lastLogin: '2023-06-08 08:30 AM',
      vehicles: ['Chevrolet Silverado 2020'],
      services: [],
      parts: [
        { id: 'PRT-204', date: '2023-04-10', name: 'Oil Filter', cost: '$19.99', status: 'delivered' }
      ],
      payments: [
        { id: 'PAY-306', date: '2023-04-10', amount: '$19.99', method: 'Debit Card' }
      ]
    }
  ];

  const [users, setUsers] = useState(allUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer'
  });

  // Available roles (removed 'admin' as per requirement)
  const roles = ['customer', 'premium'];
  
  // Available filters for services/parts
  const filters = ['all', 'has-services', 'has-parts', 'no-activity'];

  // Filter users based on search and filters
  const filterUsers = () => {
    let filtered = allUsers;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(user => 
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.userId.toLowerCase().includes(term) ||
        user.phone.toLowerCase().includes(term)
      );
    }
    
    if (selectedRole !== 'all') {
      filtered = filtered.filter(user => user.role === selectedRole);
    }
    
    if (selectedFilter !== 'all') {
      switch(selectedFilter) {
        case 'has-services':
          filtered = filtered.filter(user => user.services.length > 0);
          break;
        case 'has-parts':
          filtered = filtered.filter(user => user.parts.length > 0);
          break;
        case 'no-activity':
          filtered = filtered.filter(user => user.services.length === 0 && user.parts.length === 0);
          break;
        default:
          break;
      }
    }
    
    return filtered;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
  };

  const handleActivityFilter = (filter) => {
    setSelectedFilter(filter);
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditedUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const openDetailsModal = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const updateUser = () => {
    const updatedUsers = allUsers.map(u => 
      u.id === selectedUser.id ? { ...u, ...editedUser } : u
    );
    
    setUsers(updatedUsers);
    setShowEditModal(false);
  };

  const deleteUser = () => {
    const updatedUsers = allUsers.filter(u => u.id !== selectedUser.id);
    setUsers(updatedUsers);
    setShowDeleteModal(false);
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'premium':
        return <FaUserTie className="aum-role-icon" />;
      default:
        return <FaUserCircle className="aum-role-icon" />;
    }
  };

  const getActivityStatus = (user) => {
    if (user.services.length > 0 && user.parts.length > 0) {
      return 'Services & Parts';
    } else if (user.services.length > 0) {
      return 'Services';
    } else if (user.parts.length > 0) {
      return 'Parts';
    } else {
      return 'No Activity';
    }
  };

  return (
    <div className="aum-page-container">
      <div className="aum-content-container">
        <div className="aum-header">
          <h2 className="aum-title">Customer Management</h2>
          <p className="aum-subtitle">Manage all registered customers and their activity</p>
        </div>

        <div className="aum-controls">
          <div className="aum-filters">
            <div className="aum-filter-group">
              <label>Filter by Role:</label>
              <div className="aum-filter-buttons">
                <button 
                  className={`aum-filter-btn ${selectedRole === 'all' ? 'active' : ''}`}
                  onClick={() => handleRoleFilter('all')}
                >
                  All Roles
                </button>
                {roles.map(role => (
                  <button
                    key={role}
                    className={`aum-filter-btn ${selectedRole === role ? 'active' : ''}`}
                    onClick={() => handleRoleFilter(role)}
                  >
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="aum-filter-group">
              <label>Filter by Activity:</label>
              <div className="aum-filter-buttons">
                <button 
                  className={`aum-filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
                  onClick={() => handleActivityFilter('all')}
                >
                  All Customers
                </button>
                <button
                  className={`aum-filter-btn ${selectedFilter === 'has-services' ? 'active' : ''}`}
                  onClick={() => handleActivityFilter('has-services')}
                >
                  With Services
                </button>
                <button
                  className={`aum-filter-btn ${selectedFilter === 'has-parts' ? 'active' : ''}`}
                  onClick={() => handleActivityFilter('has-parts')}
                >
                  With Parts
                </button>
                <button
                  className={`aum-filter-btn ${selectedFilter === 'no-activity' ? 'active' : ''}`}
                  onClick={() => handleActivityFilter('no-activity')}
                >
                  No Activity
                </button>
              </div>
            </div>
          </div>

          <div className="aum-search">
            <div className="aum-search-box">
              <FaSearch className="aum-search-icon" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={handleSearch}
                className="aum-search-input"
              />
            </div>
          </div>
        </div>

        <div className="aum-users-table-container">
          <div className="aum-users-table">
            <div className="aum-table-header">
              <div className="aum-table-row">
                <div className="aum-table-col aum-col-id">Customer ID</div>
                <div className="aum-table-col aum-col-name">Name</div>
                <div className="aum-table-col aum-col-contact">Contact</div>
                <div className="aum-table-col aum-col-role">Role</div>
                <div className="aum-table-col aum-col-vehicles">Vehicles</div>
                <div className="aum-table-col aum-col-activity">Activity</div>
                <div className="aum-table-col aum-col-join-date">Join Date</div>
                <div className="aum-table-col aum-col-actions">Actions</div>
              </div>
            </div>
            
            <div className="aum-table-body">
              {filterUsers().length > 0 ? (
                filterUsers().map(user => (
                  <div key={user.id} className="aum-table-row">
                    <div className="aum-table-col aum-col-id">
                      <span className="aum-user-id">{user.userId}</span>
                    </div>
                    <div className="aum-table-col aum-col-name">
                      <div className="aum-user-name">{user.name}</div>
                      <div className="aum-user-email">{user.email}</div>
                    </div>
                    <div className="aum-table-col aum-col-contact">
                      {user.phone}
                    </div>
                    <div className="aum-table-col aum-col-role">
                      <div className="aum-role-badge">
                        {getRoleIcon(user.role)}
                        <span>{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                      </div>
                    </div>
                    <div className="aum-table-col aum-col-vehicles">
                      <div className="aum-vehicles-list">
                        {user.vehicles.length > 0 ? (
                          user.vehicles.map((vehicle, index) => (
                            <span key={index} className="aum-vehicle-badge">
                              {vehicle}
                            </span>
                          ))
                        ) : (
                          <span className="aum-no-vehicles">No vehicles</span>
                        )}
                      </div>
                    </div>
                    <div className="aum-table-col aum-col-activity">
                      <div className={`aum-activity-badge aum-${getActivityStatus(user).toLowerCase().replace(' ', '-')}`}>
                        {getActivityStatus(user)}
                      </div>
                    </div>
                    <div className="aum-table-col aum-col-join-date">
                      {user.joinDate}
                    </div>
                    <div className="aum-table-col aum-col-actions">
                      <button 
                        className="aum-action-btn aum-details-btn"
                        onClick={() => openDetailsModal(user)}
                      >
                        <FaInfoCircle className="aum-action-icon" />
                        Details
                      </button>
                      <button 
                        className="aum-action-btn aum-edit-btn"
                        onClick={() => openEditModal(user)}
                      >
                        <FaEdit className="aum-action-icon" />
                        Edit
                      </button>
                      <button 
                        className="aum-action-btn aum-delete-btn"
                        onClick={() => openDeleteModal(user)}
                      >
                        <FaTrash className="aum-action-icon" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="aum-no-users">
                  <p>No customers found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Edit User Modal */}
        {showEditModal && selectedUser && (
          <div className="aum-modal-overlay">
            <div className="aum-modal">
              <div className="aum-modal-header">
                <h3>Edit Customer</h3>
                <button 
                  className="aum-modal-close"
                  onClick={() => setShowEditModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="aum-modal-body">
                <div className="aum-user-info">
                  <p><strong>Customer ID:</strong> {selectedUser.userId}</p>
                  <p><strong>Last Login:</strong> {selectedUser.lastLogin}</p>
                </div>
                <div className="aum-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editedUser.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="aum-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={editedUser.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="aum-form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={editedUser.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="aum-form-group">
                  <label>Role</label>
                  <select
                    name="role"
                    value={editedUser.role}
                    onChange={handleInputChange}
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="aum-modal-footer">
                <button 
                  className="aum-btn aum-cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="aum-btn aum-confirm-btn"
                  onClick={updateUser}
                  disabled={!editedUser.name || !editedUser.email}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedUser && (
          <div className="aum-modal-overlay">
            <div className="aum-modal aum-delete-modal">
              <div className="aum-modal-header">
                <h3>Confirm Deletion</h3>
                <button 
                  className="aum-modal-close"
                  onClick={() => setShowDeleteModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="aum-modal-body">
                <p>Are you sure you want to delete this customer?</p>
                <div className="aum-user-to-delete">
                  <p><strong>Name:</strong> {selectedUser.name}</p>
                  <p><strong>Role:</strong> {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}</p>
                  <p><strong>Activity:</strong> {getActivityStatus(selectedUser)}</p>
                </div>
                <p className="aum-delete-warning">
                  This action cannot be undone. All customer data will be permanently removed.
                </p>
              </div>
              <div className="aum-modal-footer">
                <button 
                  className="aum-btn aum-cancel-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="aum-btn aum-delete-confirm-btn"
                  onClick={deleteUser}
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Customer Details Modal */}
        {showDetailsModal && selectedUser && (
          <div className="aum-modal-overlay">
            <div className="aum-modal aum-details-modal">
              <div className="aum-modal-header">
                <h3>Customer Details</h3>
                <button 
                  className="aum-modal-close"
                  onClick={() => setShowDetailsModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="aum-modal-body">
                <div className="aum-details-header">
                  <div className="aum-details-user">
                    <h4>{selectedUser.name}</h4>
                    <p>{selectedUser.email} | {selectedUser.phone}</p>
                    <div className="aum-details-meta">
                      <span className="aum-user-id">{selectedUser.userId}</span>
                      <span className="aum-role-badge">
                        {getRoleIcon(selectedUser.role)}
                        {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                      </span>
                      <span>Joined: {selectedUser.joinDate}</span>
                    </div>
                  </div>
                </div>

                <div className="aum-details-section">
                  <h4>
                    <FaCar className="aum-details-icon" />
                    Vehicles ({selectedUser.vehicles.length})
                  </h4>
                  {selectedUser.vehicles.length > 0 ? (
                    <ul className="aum-details-list">
                      {selectedUser.vehicles.map((vehicle, index) => (
                        <li key={index}>{vehicle}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="aum-no-data">No vehicles registered</p>
                  )}
                </div>

                <div className="aum-details-section">
                  <h4>
                    <FaTools className="aum-details-icon" />
                    Services ({selectedUser.services.length})
                  </h4>
                  {selectedUser.services.length > 0 ? (
                    <div className="aum-details-table">
                      <div className="aum-details-table-header">
                        <div className="aum-details-table-col">Service ID</div>
                        <div className="aum-details-table-col">Date</div>
                        <div className="aum-details-table-col">Type</div>
                        <div className="aum-details-table-col">Cost</div>
                        <div className="aum-details-table-col">Status</div>
                      </div>
                      {selectedUser.services.map(service => (
                        <div key={service.id} className="aum-details-table-row">
                          <div className="aum-details-table-col">{service.id}</div>
                          <div className="aum-details-table-col">{service.date}</div>
                          <div className="aum-details-table-col">{service.type}</div>
                          <div className="aum-details-table-col">{service.cost}</div>
                          <div className="aum-details-table-col">
                            <span className={`aum-status-badge aum-${service.status}`}>
                              {service.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="aum-no-data">No services recorded</p>
                  )}
                </div>

                <div className="aum-details-section">
                  <h4>
                    <FaTools className="aum-details-icon" />
                    Parts Purchased ({selectedUser.parts.length})
                  </h4>
                  {selectedUser.parts.length > 0 ? (
                    <div className="aum-details-table">
                      <div className="aum-details-table-header">
                        <div className="aum-details-table-col">Part ID</div>
                        <div className="aum-details-table-col">Date</div>
                        <div className="aum-details-table-col">Name</div>
                        <div className="aum-details-table-col">Cost</div>
                        <div className="aum-details-table-col">Status</div>
                      </div>
                      {selectedUser.parts.map(part => (
                        <div key={part.id} className="aum-details-table-row">
                          <div className="aum-details-table-col">{part.id}</div>
                          <div className="aum-details-table-col">{part.date}</div>
                          <div className="aum-details-table-col">{part.name}</div>
                          <div className="aum-details-table-col">{part.cost}</div>
                          <div className="aum-details-table-col">
                            <span className={`aum-status-badge aum-${part.status}`}>
                              {part.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="aum-no-data">No parts purchased</p>
                  )}
                </div>

                <div className="aum-details-section">
                  <h4>
                    <FaMoneyBillWave className="aum-details-icon" />
                    Payment History ({selectedUser.payments.length})
                  </h4>
                  {selectedUser.payments.length > 0 ? (
                    <div className="aum-details-table">
                      <div className="aum-details-table-header">
                        <div className="aum-details-table-col">Payment ID</div>
                        <div className="aum-details-table-col">Date</div>
                        <div className="aum-details-table-col">Amount</div>
                        <div className="aum-details-table-col">Method</div>
                      </div>
                      {selectedUser.payments.map(payment => (
                        <div key={payment.id} className="aum-details-table-row">
                          <div className="aum-details-table-col">{payment.id}</div>
                          <div className="aum-details-table-col">{payment.date}</div>
                          <div className="aum-details-table-col">{payment.amount}</div>
                          <div className="aum-details-table-col">{payment.method}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="aum-no-data">No payment history</p>
                  )}
                </div>
              </div>
              <div className="aum-modal-footer">
                <button 
                  className="aum-btn aum-cancel-btn"
                  onClick={() => setShowDetailsModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUserManagement;