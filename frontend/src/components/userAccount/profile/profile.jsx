import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaSave, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './profile.css';

const Profile = () => {
  // Initial user data with Bangladesh-specific information
  const initialUserData = {
    name: 'Abdul Rahman',
    email: 'abdul.rahman@example.com',
    phone: '+880 1712 345678',
    joinDate: 'January 2023',
    address: '123 Motijheel Commercial Area, Dhaka 1000, Bangladesh',
    vehicles: []
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({
    ...initialUserData,
    vehicles: [...initialUserData.vehicles]
  });

  const handleEdit = () => {
    setEditedData({
      ...userData,
      vehicles: userData.vehicles.map(v => ({...v}))
    });
    setIsEditing(true);
  };

  const handleSave = () => {
    // Filter out any empty vehicles before saving
    const validVehicles = editedData.vehicles.filter(
      vehicle => vehicle.make.trim() && vehicle.model.trim() && vehicle.year.trim()
    );
    
    setUserData({
      ...editedData,
      vehicles: validVehicles
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVehicleChange = (id, field, value) => {
    setEditedData(prev => ({
      ...prev,
      vehicles: prev.vehicles.map(vehicle => 
        vehicle.id === id ? {...vehicle, [field]: value} : vehicle
      )
    }));
  };

  const addNewVehicle = () => {
    const newId = editedData.vehicles.length > 0 
      ? Math.max(...editedData.vehicles.map(v => v.id)) + 1 
      : 1;
    
    setEditedData(prev => ({
      ...prev,
      vehicles: [
        ...prev.vehicles,
        { id: newId, make: '', model: '', year: '' }
      ]
    }));
  };

  const deleteVehicle = (id) => {
    setEditedData(prev => ({
      ...prev,
      vehicles: prev.vehicles.filter(vehicle => vehicle.id !== id)
    }));
  };

  return (
    <div className="auto-profile-container">
      <div className="auto-profile-header">
        <h2><FaUser className="auto-header-icon" /> Personal Information</h2>
        {!isEditing ? (
          <button onClick={handleEdit} className="auto-edit-btn">
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="auto-edit-actions">
            <button onClick={handleSave} className="auto-save-btn">
              <FaSave /> Save Changes
            </button>
            <button onClick={handleCancel} className="auto-cancel-btn">
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="auto-profile-content">
        <div className="auto-profile-details">
          <div className="auto-detail-item">
            <label>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleChange}
                className="auto-edit-input"
              />
            ) : (
              <p className="auto-detail-text">{userData.name}</p>
            )}
          </div>

          <div className="auto-detail-item">
            <label><FaEnvelope /> Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleChange}
                className="auto-edit-input"
              />
            ) : (
              <p className="auto-detail-text">{userData.email}</p>
            )}
          </div>

          <div className="auto-detail-item">
            <label><FaPhone /> Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editedData.phone}
                onChange={handleChange}
                className="auto-edit-input"
              />
            ) : (
              <p className="auto-detail-text">{userData.phone}</p>
            )}
          </div>

          <div className="auto-detail-item">
            <label><FaCalendarAlt /> Member Since</label>
            <p className="auto-detail-text">{userData.joinDate}</p>
          </div>

          <div className="auto-detail-item">
            <label>Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={editedData.address}
                onChange={handleChange}
                className="auto-edit-input"
              />
            ) : (
              <p className="auto-detail-text">{userData.address}</p>
            )}
          </div>
        </div>

        <div className="auto-profile-vehicles">
          <div className="auto-vehicles-header">
            <h3>Your Vehicles</h3>
            {isEditing && (
              <button onClick={addNewVehicle} className="auto-add-vehicle-btn">
                <FaPlus /> Add Vehicle
              </button>
            )}
          </div>
          
          {isEditing ? (
            editedData.vehicles.length > 0 ? (
              <div className="auto-vehicles-list">
                {editedData.vehicles.map((vehicle) => (
                  <div key={vehicle.id} className="auto-vehicle-card">
                    <div className="auto-vehicle-edit-field">
                      <label>Make</label>
                      <input
                        type="text"
                        value={vehicle.make}
                        onChange={(e) => handleVehicleChange(vehicle.id, 'make', e.target.value)}
                        className="auto-edit-input"
                        placeholder="e.g. Toyota"
                      />
                    </div>
                    <div className="auto-vehicle-edit-field">
                      <label>Model</label>
                      <input
                        type="text"
                        value={vehicle.model}
                        onChange={(e) => handleVehicleChange(vehicle.id, 'model', e.target.value)}
                        className="auto-edit-input"
                        placeholder="e.g. Corolla"
                      />
                    </div>
                    <div className="auto-vehicle-edit-field">
                      <label>Year</label>
                      <input
                        type="text"
                        value={vehicle.year}
                        onChange={(e) => handleVehicleChange(vehicle.id, 'year', e.target.value)}
                        className="auto-edit-input"
                        placeholder="e.g. 2020"
                      />
                    </div>
                    <div className="auto-vehicle-actions">
                      <button 
                        onClick={() => deleteVehicle(vehicle.id)} 
                        className="auto-delete-vehicle-btn"
                        aria-label="Delete vehicle"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="auto-no-vehicles">
                <p>No vehicles added yet</p>
              </div>
            )
          ) : (
            userData.vehicles.length > 0 ? (
              <div className="auto-vehicles-list">
                {userData.vehicles.map(vehicle => (
                  <div key={vehicle.id} className="auto-vehicle-card">
                    <div className="auto-vehicle-make">{vehicle.make || 'Make not specified'}</div>
                    <div className="auto-vehicle-model">{vehicle.model || 'Model not specified'}</div>
                    <div className="auto-vehicle-year">{vehicle.year || 'Year not specified'}</div>
                    <Link to="/services" className="auto-service-link">Schedule Service</Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="auto-no-vehicles">
                <p>You haven't added any vehicles yet</p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;