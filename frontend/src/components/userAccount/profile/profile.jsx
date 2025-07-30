import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaSave, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './profile.css';

const Profile = () => {
  // Initial user data
  const initialUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    joinDate: 'January 2023',
    address: '123 Automotive Road, Dhaka',
    vehicles: [
      { id: 1, make: 'Toyota', model: 'Corolla', year: '2020' },
      { id: 2, make: 'Honda', model: 'CR-V', year: '2018' }
    ]
  };

  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(initialUserData);

  const handleEdit = () => {
    setEditedData(userData);
    setIsEditing(true);
  };

  const handleSave = () => {
    setUserData(editedData);
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

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2><FaUser className="header-icon" /> Personal Information</h2>
        {!isEditing ? (
          <button onClick={handleEdit} className="edit-btn">
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <div className="edit-actions">
            <button onClick={handleSave} className="save-btn">
              <FaSave /> Save Changes
            </button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="profile-content">
        <div className="profile-details">
          <div className="detail-item">
            <label>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedData.name}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.name}</p>
            )}
          </div>

          <div className="detail-item">
            <label><FaEnvelope /> Email</label>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={editedData.email}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.email}</p>
            )}
          </div>

          <div className="detail-item">
            <label><FaPhone /> Phone Number</label>
            {isEditing ? (
              <input
                type="tel"
                name="phone"
                value={editedData.phone}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.phone}</p>
            )}
          </div>

          <div className="detail-item">
            <label><FaCalendarAlt /> Member Since</label>
            <p>{userData.joinDate}</p>
          </div>

          <div className="detail-item">
            <label>Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={editedData.address}
                onChange={handleChange}
              />
            ) : (
              <p>{userData.address}</p>
            )}
          </div>
        </div>

        <div className="profile-vehicles">
          <h3>Your Vehicles</h3>
          {userData.vehicles.length > 0 ? (
            <div className="vehicles-list">
              {userData.vehicles.map(vehicle => (
                <div key={vehicle.id} className="vehicle-card">
                  <div className="vehicle-make">{vehicle.make}</div>
                  <div className="vehicle-model">{vehicle.model}</div>
                  <div className="vehicle-year">{vehicle.year}</div>
                  <Link to="/services" className="service-link">Schedule Service</Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-vehicles">
              <p>You haven't added any vehicles yet</p>
              <Link to="/add-vehicle" className="add-vehicle-btn">Add Vehicle</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;