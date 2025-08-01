import React, { useState } from 'react';
import { 
    FaUserPlus, FaSearch, FaEdit, 
    FaTrash, FaUserShield, FaUserTie,
    FaUser, FaRegClock, FaCheckCircle,
    FaTimesCircle, FaFilter, FaTools // Add FaTools here
  } from 'react-icons/fa';
import './AdminEmployeeManagement.css';

const AdminEmployeeManagement = () => {
  // Sample employee data
  const allEmployees = [
    {
      id: 1,
      employeeId: 'EMP-001',
      name: 'John Smith',
      email: 'john.smith@garagepro.com',
      phone: '(555) 123-4567',
      role: 'Mechanic',
      status: 'active',
      joinDate: '2022-01-15',
      lastActive: '2023-06-10 09:45 AM',
      specialization: ['Engine', 'Transmission']
    },
    {
      id: 2,
      employeeId: 'EMP-002',
      name: 'Sarah Johnson',
      email: 'sarah.j@garagepro.com',
      phone: '(555) 987-6543',
      role: 'Mechanic',
      status: 'active',
      joinDate: '2022-03-22',
      lastActive: '2023-06-10 02:30 PM',
      specialization: ['Electrical', 'AC Systems']
    },
    {
      id: 3,
      employeeId: 'EMP-003',
      name: 'Michael Chen',
      email: 'michael.c@garagepro.com',
      phone: '(555) 456-7890',
      role: 'Service Advisor',
      status: 'active',
      joinDate: '2022-05-10',
      lastActive: '2023-06-10 11:15 AM',
      specialization: ['Customer Service']
    },
    {
      id: 4,
      employeeId: 'EMP-004',
      name: 'Robert Williams',
      email: 'robert.w@garagepro.com',
      phone: '(555) 789-0123',
      role: 'Mechanic',
      status: 'on-leave',
      joinDate: '2022-07-18',
      lastActive: '2023-06-05 03:00 PM',
      specialization: ['Brakes', 'Suspension']
    },
    {
      id: 5,
      employeeId: 'EMP-005',
      name: 'Emily Davis',
      email: 'emily.d@garagepro.com',
      phone: '(555) 234-5678',
      role: 'Admin',
      status: 'active',
      joinDate: '2022-09-05',
      lastActive: '2023-06-10 08:30 AM',
      specialization: ['Management']
    },
    {
      id: 6,
      employeeId: 'EMP-006',
      name: 'David Wilson',
      email: 'david.w@garagepro.com',
      phone: '(555) 345-6789',
      role: 'Mechanic',
      status: 'inactive',
      joinDate: '2022-11-30',
      lastActive: '2023-05-20 04:15 PM',
      specialization: ['Diagnostics', 'Hybrid/Electric']
    }
  ];

  const [employees, setEmployees] = useState(allEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Mechanic',
    status: 'active',
    specialization: []
  });
  const [tempSpecialization, setTempSpecialization] = useState('');

  // Available roles
  const roles = ['Mechanic', 'Service Advisor', 'Admin', 'Manager'];
  
  // Available statuses
  const statuses = ['active', 'on-leave', 'inactive'];

  // Filter employees based on search and filters
  const filterEmployees = () => {
    let filtered = allEmployees;
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(employee => 
        employee.name.toLowerCase().includes(term) ||
        employee.email.toLowerCase().includes(term) ||
        employee.employeeId.toLowerCase().includes(term) ||
        employee.phone.toLowerCase().includes(term)
      );
    }
    
    if (selectedRole !== 'all') {
      filtered = filtered.filter(employee => employee.role === selectedRole);
    }
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(employee => employee.status === selectedStatus);
    }
    
    return filtered;
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
  };

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const openAddModal = () => {
    setNewEmployee({
      name: '',
      email: '',
      phone: '',
      role: 'Mechanic',
      status: 'active',
      specialization: []
    });
    setShowAddModal(true);
  };

  const openEditModal = (employee) => {
    setSelectedEmployee(employee);
    setNewEmployee({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      role: employee.role,
      status: employee.status,
      specialization: [...employee.specialization]
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (employee) => {
    setSelectedEmployee(employee);
    setShowDeleteModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addSpecialization = () => {
    if (tempSpecialization.trim() && !newEmployee.specialization.includes(tempSpecialization.trim())) {
      setNewEmployee(prev => ({
        ...prev,
        specialization: [...prev.specialization, tempSpecialization.trim()]
      }));
      setTempSpecialization('');
    }
  };

  const removeSpecialization = (spec) => {
    setNewEmployee(prev => ({
      ...prev,
      specialization: prev.specialization.filter(s => s !== spec)
    }));
  };

  const addEmployee = () => {
    // In a real app, you would call an API here
    const newId = allEmployees.length + 1;
    const employeeId = `EMP-${String(newId).padStart(3, '0')}`;
    
    const employeeToAdd = {
      id: newId,
      employeeId,
      ...newEmployee,
      joinDate: new Date().toISOString().split('T')[0],
      lastActive: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };
    
    setEmployees([...allEmployees, employeeToAdd]);
    setShowAddModal(false);
  };

  const updateEmployee = () => {
    // In a real app, you would call an API here
    const updatedEmployees = allEmployees.map(emp => 
      emp.id === selectedEmployee.id ? { ...emp, ...newEmployee } : emp
    );
    
    setEmployees(updatedEmployees);
    setShowEditModal(false);
  };

  const deleteEmployee = () => {
    // In a real app, you would call an API here
    const updatedEmployees = allEmployees.filter(emp => emp.id !== selectedEmployee.id);
    setEmployees(updatedEmployees);
    setShowDeleteModal(false);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active':
        return <FaCheckCircle className="aem-status-icon aem-active" />;
      case 'on-leave':
        return <FaRegClock className="aem-status-icon aem-on-leave" />;
      case 'inactive':
        return <FaTimesCircle className="aem-status-icon aem-inactive" />;
      default:
        return <FaUser className="aem-status-icon" />;
    }
  };

  const getRoleIcon = (role) => {
    switch(role) {
      case 'Mechanic':
        return <FaTools className="aem-role-icon" />;
      case 'Service Advisor':
        return <FaUserTie className="aem-role-icon" />;
      case 'Admin':
      case 'Manager':
        return <FaUserShield className="aem-role-icon" />;
      default:
        return <FaUser className="aem-role-icon" />;
    }
  };

  return (
    <div className="aem-page-container">
      <div className="aem-content-container">
        <div className="aem-header">
          <h2 className="aem-title">Team Management</h2>
          <p className="aem-subtitle">Manage your team members and their roles</p>
        </div>

        <div className="aem-controls">
          <div className="aem-filters">
            <div className="aem-filter-group">
              <label>Filter by Role:</label>
              <div className="aem-filter-buttons">
                <button 
                  className={`aem-filter-btn ${selectedRole === 'all' ? 'active' : ''}`}
                  onClick={() => handleRoleFilter('all')}
                >
                  All Roles
                </button>
                {roles.map(role => (
                  <button
                    key={role}
                    className={`aem-filter-btn ${selectedRole === role ? 'active' : ''}`}
                    onClick={() => handleRoleFilter(role)}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            <div className="aem-filter-group">
              <label>Filter by Status:</label>
              <div className="aem-filter-buttons">
                <button 
                  className={`aem-filter-btn ${selectedStatus === 'all' ? 'active' : ''}`}
                  onClick={() => handleStatusFilter('all')}
                >
                  All Statuses
                </button>
                {statuses.map(status => (
                  <button
                    key={status}
                    className={`aem-filter-btn ${selectedStatus === status ? 'active' : ''}`}
                    onClick={() => handleStatusFilter(status)}
                  >
                    {status.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="aem-search-add">
            <div className="aem-search-box">
              <FaSearch className="aem-search-icon" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={handleSearch}
                className="aem-search-input"
              />
            </div>
            <button className="aem-add-btn" onClick={openAddModal}>
              <FaUserPlus className="aem-add-icon" />
              Add Employee
            </button>
          </div>
        </div>

        <div className="aem-employees-table-container">
          <div className="aem-employees-table">
            <div className="aem-table-header">
              <div className="aem-table-row">
                <div className="aem-table-col aem-col-id">Employee ID</div>
                <div className="aem-table-col aem-col-name">Name</div>
                <div className="aem-table-col aem-col-contact">Contact</div>
                <div className="aem-table-col aem-col-role">Role</div>
                <div className="aem-table-col aem-col-specialization">Specialization</div>
                <div className="aem-table-col aem-col-status">Status</div>
                <div className="aem-table-col aem-col-join-date">Join Date</div>
                <div className="aem-table-col aem-col-actions">Actions</div>
              </div>
            </div>
            
            <div className="aem-table-body">
              {filterEmployees().length > 0 ? (
                filterEmployees().map(employee => (
                  <div key={employee.id} className="aem-table-row">
                    <div className="aem-table-col aem-col-id">
                      <span className="aem-employee-id">{employee.employeeId}</span>
                    </div>
                    <div className="aem-table-col aem-col-name">
                      <div className="aem-employee-name">{employee.name}</div>
                      <div className="aem-employee-email">{employee.email}</div>
                    </div>
                    <div className="aem-table-col aem-col-contact">
                      {employee.phone}
                    </div>
                    <div className="aem-table-col aem-col-role">
                      <div className="aem-role-badge">
                        {getRoleIcon(employee.role)}
                        <span>{employee.role}</span>
                      </div>
                    </div>
                    <div className="aem-table-col aem-col-specialization">
                      <div className="aem-specialization-list">
                        {employee.specialization.map((spec, index) => (
                          <span key={index} className="aem-specialization-badge">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="aem-table-col aem-col-status">
                      <div className={`aem-status-badge aem-${employee.status}`}>
                        {getStatusIcon(employee.status)}
                        <span>{employee.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                    <div className="aem-table-col aem-col-join-date">
                      {employee.joinDate}
                    </div>
                    <div className="aem-table-col aem-col-actions">
                      <button 
                        className="aem-action-btn aem-edit-btn"
                        onClick={() => openEditModal(employee)}
                      >
                        <FaEdit className="aem-action-icon" />
                        Edit
                      </button>
                      <button 
                        className="aem-action-btn aem-delete-btn"
                        onClick={() => openDeleteModal(employee)}
                      >
                        <FaTrash className="aem-action-icon" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="aem-no-employees">
                  <p>No employees found matching your criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Add Employee Modal */}
        {showAddModal && (
          <div className="aem-modal-overlay">
            <div className="aem-modal">
              <div className="aem-modal-header">
                <h3>Add New Employee</h3>
                <button 
                  className="aem-modal-close"
                  onClick={() => setShowAddModal(false)}
                >
                  <FaTimesCircle />
                </button>
              </div>
              <div className="aem-modal-body">
                <div className="aem-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newEmployee.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="aem-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="aem-form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={newEmployee.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="aem-form-group">
                  <label>Role</label>
                  <select
                    name="role"
                    value={newEmployee.role}
                    onChange={handleInputChange}
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div className="aem-form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={newEmployee.status}
                    onChange={handleInputChange}
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="aem-form-group">
                  <label>Specialization</label>
                  <div className="aem-specialization-input">
                    <input
                      type="text"
                      value={tempSpecialization}
                      onChange={(e) => setTempSpecialization(e.target.value)}
                      placeholder="Add specialization"
                    />
                    <button 
                      className="aem-add-spec-btn"
                      onClick={addSpecialization}
                      disabled={!tempSpecialization.trim()}
                    >
                      Add
                    </button>
                  </div>
                  <div className="aem-specialization-tags">
                    {newEmployee.specialization.map((spec, index) => (
                      <span key={index} className="aem-specialization-tag">
                        {spec}
                        <button 
                          className="aem-remove-spec"
                          onClick={() => removeSpecialization(spec)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="aem-modal-footer">
                <button 
                  className="aem-btn aem-cancel-btn"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="aem-btn aem-confirm-btn"
                  onClick={addEmployee}
                  disabled={!newEmployee.name || !newEmployee.email}
                >
                  Add Employee
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Employee Modal */}
        {showEditModal && selectedEmployee && (
          <div className="aem-modal-overlay">
            <div className="aem-modal">
              <div className="aem-modal-header">
                <h3>Edit Employee</h3>
                <button 
                  className="aem-modal-close"
                  onClick={() => setShowEditModal(false)}
                >
                  <FaTimesCircle />
                </button>
              </div>
              <div className="aem-modal-body">
                <div className="aem-employee-info">
                  <p><strong>Employee ID:</strong> {selectedEmployee.employeeId}</p>
                  <p><strong>Last Active:</strong> {selectedEmployee.lastActive}</p>
                </div>
                <div className="aem-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newEmployee.name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                  />
                </div>
                <div className="aem-form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="aem-form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={newEmployee.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="aem-form-group">
                  <label>Role</label>
                  <select
                    name="role"
                    value={newEmployee.role}
                    onChange={handleInputChange}
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
                <div className="aem-form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={newEmployee.status}
                    onChange={handleInputChange}
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status.replace('-', ' ')}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="aem-form-group">
                  <label>Specialization</label>
                  <div className="aem-specialization-input">
                    <input
                      type="text"
                      value={tempSpecialization}
                      onChange={(e) => setTempSpecialization(e.target.value)}
                      placeholder="Add specialization"
                    />
                    <button 
                      className="aem-add-spec-btn"
                      onClick={addSpecialization}
                      disabled={!tempSpecialization.trim()}
                    >
                      Add
                    </button>
                  </div>
                  <div className="aem-specialization-tags">
                    {newEmployee.specialization.map((spec, index) => (
                      <span key={index} className="aem-specialization-tag">
                        {spec}
                        <button 
                          className="aem-remove-spec"
                          onClick={() => removeSpecialization(spec)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="aem-modal-footer">
                <button 
                  className="aem-btn aem-cancel-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="aem-btn aem-confirm-btn"
                  onClick={updateEmployee}
                  disabled={!newEmployee.name || !newEmployee.email}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && selectedEmployee && (
          <div className="aem-modal-overlay">
            <div className="aem-modal aem-delete-modal">
              <div className="aem-modal-header">
                <h3>Confirm Deletion</h3>
                <button 
                  className="aem-modal-close"
                  onClick={() => setShowDeleteModal(false)}
                >
                  <FaTimesCircle />
                </button>
              </div>
              <div className="aem-modal-body">
                <p>Are you sure you want to delete this employee?</p>
                <div className="aem-employee-to-delete">
                  <p><strong>Name:</strong> {selectedEmployee.name}</p>
                  <p><strong>Role:</strong> {selectedEmployee.role}</p>
                  <p><strong>Status:</strong> {selectedEmployee.status.replace('-', ' ')}</p>
                </div>
                <p className="aem-delete-warning">
                  This action cannot be undone. All associated data will be removed.
                </p>
              </div>
              <div className="aem-modal-footer">
                <button 
                  className="aem-btn aem-cancel-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button 
                  className="aem-btn aem-delete-confirm-btn"
                  onClick={deleteEmployee}
                >
                  Delete Permanently
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEmployeeManagement;