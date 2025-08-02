import React, { useState } from 'react';
import { 
  FaUser, FaEnvelope, FaPhone, FaCalendarAlt, 
  FaSearch, FaEdit, FaFilter, FaEllipsisV,
  FaTools, FaMoneyBillWave, FaCar, FaInfoCircle
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
      phone: '+880 1712 345678',
      joinDate: '2022-01-15',
      lastLogin: '2023-06-10 09:45 AM',
      address: '123 Road, Dhaka 1212, Bangladesh',
      vehicles: ['Toyota Corolla 2020', 'Honda CR-V 2018'],
      services: [
        { id: 'SRV-101', date: '2023-01-10', type: 'Oil Change', cost: 'BDT 89.99', status: 'completed' },
        { id: 'SRV-102', date: '2023-04-15', type: 'Tire Rotation', cost: 'BDT 49.99', status: 'completed' }
      ],
      parts: [
        { id: 'PRT-201', date: '2023-02-20', name: 'Air Filter', cost: 'BDT 24.99', status: 'delivered' },
        { id: 'PRT-202', date: '2023-05-05', name: 'Brake Pads', cost: 'BDT 79.99', status: 'delivered' }
      ],
      payments: [
        { id: 'PAY-301', date: '2023-01-10', amount: 'BDT 89.99', method: 'SSL Commerz' },
        { id: 'PAY-302', date: '2023-02-20', amount: 'BDT 24.99', method: 'Cash on Delivery' }
      ]
    },
    {
      id: 2,
      userId: 'USR-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+880 1812 345678',
      joinDate: '2022-03-22',
      lastLogin: '2023-06-10 02:30 PM',
      address: '456 Avenue, Chittagong 4000, Bangladesh',
      vehicles: ['Ford F-150 2021'],
      services: [
        { id: 'SRV-103', date: '2023-03-18', type: 'Full Service', cost: 'BDT 249.99', status: 'completed' }
      ],
      parts: [],
      payments: [
        { id: 'PAY-303', date: '2023-03-18', amount: 'BDT 249.99', method: 'SSL Commerz' }
      ]
    },
    {
      id: 3,
      userId: 'USR-003',
      name: 'Michael Chen',
      email: 'michael.c@example.com',
      phone: '+880 1912 345678',
      joinDate: '2022-05-10',
      lastLogin: '2023-06-10 11:15 AM',
      address: '789 Lane, Sylhet 3100, Bangladesh',
      vehicles: ['Tesla Model 3 2022', 'BMW X5 2020'],
      services: [
        { id: 'SRV-104', date: '2023-01-25', type: 'Battery Check', cost: 'BDT 39.99', status: 'completed' },
        { id: 'SRV-105', date: '2023-05-20', type: 'Wheel Alignment', cost: 'BDT 89.99', status: 'completed' }
      ],
      parts: [
        { id: 'PRT-203', date: '2023-05-20', name: 'Wheel Bearings', cost: 'BDT 129.99', status: 'delivered' }
      ],
      payments: [
        { id: 'PAY-304', date: '2023-01-25', amount: 'BDT 39.99', method: 'SSL Commerz' },
        { id: 'PAY-305', date: '2023-05-20', amount: 'BDT 219.98', method: 'Cash on Delivery' }
      ]
    },
    {
      id: 4,
      userId: 'USR-004',
      name: 'Robert Williams',
      email: 'robert.w@example.com',
      phone: '+880 1612 345678',
      joinDate: '2022-07-18',
      lastLogin: '2023-05-05 03:00 PM',
      address: '321 Street, Khulna 9000, Bangladesh',
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
      phone: '+880 1512 345678',
      joinDate: '2022-09-05',
      lastLogin: '2023-06-08 08:30 AM',
      address: '654 Boulevard, Rajshahi 6000, Bangladesh',
      vehicles: ['Chevrolet Silverado 2020'],
      services: [],
      parts: [
        { id: 'PRT-204', date: '2023-04-10', name: 'Oil Filter', cost: 'BDT 19.99', status: 'delivered' }
      ],
      payments: [
        { id: 'PAY-306', date: '2023-04-10', amount: 'BDT 19.99', method: 'Cash on Delivery' }
      ]
    }
  ];

  const [users, setUsers] = useState(allUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActivity, setSelectedActivity] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Available activity filters
  const activityOptions = ['has-services', 'has-parts', 'no-activity'];

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
    
    if (selectedActivity.length > 0) {
      filtered = filtered.filter(user => {
        if (selectedActivity.includes('has-services') && user.services.length === 0) return false;
        if (selectedActivity.includes('has-parts') && user.parts.length === 0) return false;
        if (selectedActivity.includes('no-activity') && (user.services.length > 0 || user.parts.length > 0)) return false;
        return true;
      });
    }
    
    return filtered;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleActivityFilter = (filter) => {
    setSelectedActivity(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditedUser({
      name: user.name,
      email: user.email,
      phone: user.phone
    });
    setShowEditModal(true);
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
          <div className="aum-search-filters">
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
            
            <div className="aum-filter-group">
              <div className="aum-filter-dropdown">
                <FaFilter className="aum-filter-icon" />
                <select
                  value={selectedActivity}
                  onChange={(e) => handleActivityFilter(e.target.value)}
                  multiple={false}
                  className="aum-filter-select"
                >
                  <option value="">Filter by Activity</option>
                  {activityOptions.map(activity => (
                    <option key={activity} value={activity}>
                      {activity === 'has-services' ? 'With Services' : 
                       activity === 'has-parts' ? 'With Parts' : 'No Activity'}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="aum-users-table-container">
          <table className="aum-users-table">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Activity</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterUsers().length > 0 ? (
                filterUsers().map(user => (
                  <tr key={user.id} onClick={() => openDetailsModal(user)}>
                    <td className="aum-user-id">{user.userId}</td>
                    <td>
                      <div className="aum-user-name">{user.name}</div>
                      <div className="aum-user-email">{user.email}</div>
                    </td>
                    <td>{user.phone}</td>
                    <td>
                      <div className={`aum-activity-badge aum-${getActivityStatus(user).toLowerCase().replace(' ', '-')}`}>
                        {getActivityStatus(user)}
                      </div>
                    </td>
                    <td>{user.joinDate}</td>
                    <td className="aum-actions" onClick={(e) => e.stopPropagation()}>
                      <div className="aum-action-menu">
                        <button 
                          className="aum-menu-toggle"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedUser(user);
                          }}
                        >
                          <FaEllipsisV />
                        </button>
                        <div className="aum-menu-dropdown">
                          <button onClick={() => openDetailsModal(user)}>
                            <FaInfoCircle /> Details
                          </button>
                          <button onClick={() => openEditModal(user)}>
                            <FaEdit /> Edit
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="aum-no-users">
                  <td colSpan="6">
                    <p>No customers found matching your criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
                      <span>Joined: {selectedUser.joinDate}</span>
                    </div>
                    <div className="aum-user-address">
                      {selectedUser.address}
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