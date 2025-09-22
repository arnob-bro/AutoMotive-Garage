import React, { useEffect, useState } from 'react';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendarAlt,
  FaSave,
  FaEdit,
  FaTrash,
  FaPlus
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './profile.css';
import AuthApi from "../../../apis/authApi";

const authApi = new AuthApi();

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [editedUserData, setEditedUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch user data from API
  const fetchUser = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await authApi.getProfile();
      
      // Adjust for backend response structure
      const user = response?.user || response;
      if (!user) throw new Error("Invalid profile response");
      
      // Ensure vehicles is always an array
      const userWithVehicles = {
        ...user,
        vehicles: Array.isArray(user.vehicles) ? user.vehicles : []
      };
      
      setUserData(userWithVehicles);
      setEditedUserData(JSON.parse(JSON.stringify(userWithVehicles)));
    } catch (err) {
      console.error("Failed to fetch user data:", err);
      setError(err.message || "Failed to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEdit = () => {
    setEditedUserData(JSON.parse(JSON.stringify(userData || {})));
    setIsEditing(true);
    setError("");
    setSuccess("");
  };

  const handleCancel = () => {
    setEditedUserData(JSON.parse(JSON.stringify(userData || {})));
    setIsEditing(false);
    setError("");
    setSuccess("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVehicleChange = (index, field, value) => {
    setEditedUserData((prev) => {
      const vehicles = Array.isArray(prev?.vehicles) ? [...prev.vehicles] : [];
      if (!vehicles[index]) {
        vehicles[index] = { vehicle_id: null, brand: "", model: "", year: "" };
      }
      vehicles[index] = { ...vehicles[index], [field]: value };
      return { ...prev, vehicles };
    });
  };

  const addNewVehicle = () => {
    setEditedUserData((prev) => {
      const vehicles = Array.isArray(prev?.vehicles) ? [...prev.vehicles] : [];
      vehicles.push({ vehicle_id: null, brand: "", model: "", year: "" });
      return { ...prev, vehicles };
    });
  };

  const deleteVehicle = (index) => {
    setEditedUserData((prev) => {
      const vehicles = Array.isArray(prev?.vehicles) ? [...prev.vehicles] : [];
      vehicles.splice(index, 1);
      return { ...prev, vehicles };
    });
  };

// In your handleSave function
const handleSave = async () => {
  setError("");
  setSuccess("");
  
  try {
    const payload = {
      name: editedUserData.name,
      email: editedUserData.email,
      phone: editedUserData.phone || "",
      address: editedUserData.address || "",
      vehicles: (editedUserData.vehicles || []).map((v) => ({
        vehicle_id: v.vehicle_id || null,
        brand: v.brand,
        model: v.model,
        year: v.year ? v.year.toString() : "" // Ensure year is string
      }))
    };

    console.log("Payload being sent:", payload);
    const response = await authApi.updateProfile(payload);
    
    if (response.success) {
      setSuccess("Profile updated successfully!");
      await fetchUser();
      setIsEditing(false);
    } else {
      setError(response.message || "Failed to update profile");
    }
  } catch (err) {
    console.error("Failed to save user data:", err);
    setError(err.response?.data?.error || err.message || "Failed to save user data");
  }
};

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  if (loading) return <div className="auto-loading">Loading user data...</div>;
  if (!userData) return <div className="auto-error">User data not found</div>;

  return (
    <div className="auto-profile-container">
      {/* Header & Personal Info */}
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

      {error && <div className="auto-error">{error}</div>}
      {success && <div className="auto-success">{success}</div>}

      <div className="auto-profile-content">
        <div className="auto-profile-details">
          <div className="auto-detail-item">
            <label>Full Name</label>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={editedUserData?.name || ""}
                onChange={handleChange}
                className="auto-edit-input"
                required
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
                value={editedUserData?.email || ""}
                onChange={handleChange}
                className="auto-edit-input"
                required
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
                value={editedUserData?.phone || ""}
                onChange={handleChange}
                className="auto-edit-input"
                placeholder="Enter phone number"
              />
            ) : (
              <p className="auto-detail-text">{userData.phone || "Not provided"}</p>
            )}
          </div>
          <div className="auto-detail-item">
            <label><FaCalendarAlt /> Member Since</label>
            <p className="auto-detail-text">{formatDate(userData.created_at)}</p>
          </div>
          <div className="auto-detail-item">
            <label>Address</label>
            {isEditing ? (
              <input
                type="text"
                name="address"
                value={editedUserData?.address || ""}
                onChange={handleChange}
                className="auto-edit-input"
                placeholder="Enter your address"
              />
            ) : (
              <p className="auto-detail-text">{userData.address || "Not provided"}</p>
            )}
          </div>
        </div>

        {/* Vehicles Section */}
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
            (editedUserData?.vehicles?.length > 0) ? (
              <div className="auto-vehicles-list">
                {editedUserData.vehicles.map((vehicle, idx) => (
                  <div key={idx} className="auto-vehicle-card editing">
                    <div className="auto-vehicle-edit-field">
                      <label>Brand</label>
                      <input
                        type="text"
                        value={vehicle.brand || ""}
                        onChange={(e) => handleVehicleChange(idx, 'brand', e.target.value)}
                        className="auto-edit-input"
                        placeholder="e.g. Toyota"
                      />
                    </div>
                    <div className="auto-vehicle-edit-field">
                      <label>Model</label>
                      <input
                        type="text"
                        value={vehicle.model || ""}
                        onChange={(e) => handleVehicleChange(idx, 'model', e.target.value)}
                        className="auto-edit-input"
                        placeholder="e.g. Corolla"
                      />
                    </div>
                    <div className="auto-vehicle-edit-field">
                      <label>Year</label>
                      <input
                        type="text"
                        value={vehicle.year || ""}
                        onChange={(e) => handleVehicleChange(idx, 'year', e.target.value)}
                        className="auto-edit-input"
                        placeholder="e.g. 2020"
                      />
                    </div>
                    <div className="auto-vehicle-actions">
                      <button
                        onClick={() => deleteVehicle(idx)}
                        className="auto-delete-vehicle-btn"
                        aria-label="Delete vehicle"
                        type="button"
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="auto-no-vehicles">No vehicles added yet</p>
            )
          ) : (
            (userData?.vehicles?.length > 0) ? (
              <div className="auto-vehicles-list">
                {userData.vehicles.map((vehicle, index) => (
                  <div key={index} className="auto-vehicle-card">
                    <div className="auto-vehicle-make">{vehicle.brand}</div>
                    <div className="auto-vehicle-model">{vehicle.model}</div>
                    <div className="auto-vehicle-year">{vehicle.year}</div>
                    <Link to="/services" className="auto-service-link">Schedule Service</Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="auto-no-vehicles">You haven't added any vehicles yet</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;