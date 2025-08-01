import React from 'react';
import { 
  FaCar, FaWrench, FaBoxes, FaUserTie, 
  FaDollarSign, FaChartLine, FaCalendarAlt,
  FaShoppingCart, FaTools, FaOilCan
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data - replace with real data from your API
  const stats = [
    { id: 1, title: 'Total Services', value: 124, icon: <FaWrench />, color: '#ff5e14', trend: 'up' },
    { id: 2, title: 'Parts Inventory', value: 856, icon: <FaBoxes />, color: '#4361ee', trend: 'stable' },
    { id: 3, title: 'Active Bookings', value: 18, icon: <FaCalendarAlt />, color: '#3a0ca3', trend: 'up' },
    { id: 4, title: 'Employees', value: 12, icon: <FaUserTie />, color: '#7209b7', trend: 'stable' },
    { id: 5, title: 'Today\'s Revenue', value: '$2,845', icon: <FaDollarSign />, color: '#f72585', trend: 'up' },
    { id: 6, title: 'Monthly Growth', value: '+12%', icon: <FaChartLine />, color: '#4cc9f0', trend: 'up' }
  ];

  const recentBookings = [
    { id: 1, customer: 'John Smith', service: 'Oil Change', vehicle: 'Toyota Camry', time: 'Today, 10:00 AM', status: 'confirmed' },
    { id: 2, customer: 'Sarah Johnson', service: 'Brake Service', vehicle: 'Honda Accord', time: 'Today, 11:30 AM', status: 'confirmed' },
    { id: 3, customer: 'Michael Brown', service: 'Tire Rotation', vehicle: 'Ford F-150', time: 'Today, 2:00 PM', status: 'pending' },
    { id: 4, customer: 'Emily Davis', service: 'AC Repair', vehicle: 'Nissan Altima', time: 'Tomorrow, 9:00 AM', status: 'confirmed' },
    { id: 5, customer: 'Robert Wilson', service: 'Transmission Check', vehicle: 'Chevrolet Silverado', time: 'Tomorrow, 1:30 PM', status: 'pending' }
  ];

  const popularServices = [
    { id: 1, name: 'Oil Change', count: 42, icon: <FaOilCan /> },
    { id: 2, name: 'Brake Service', count: 28, icon: <FaTools /> },
    { id: 3, name: 'Tire Rotation', count: 19, icon: <FaCar /> },
    { id: 4, name: 'AC Repair', count: 15, icon: <FaWrench /> },
    { id: 5, name: 'Battery Replacement', count: 12, icon: <FaShoppingCart /> }
  ];

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p></p>
      </div>
      
      {/* Stats Cards */}
      <div className="stats-grid">
        {stats.map(stat => (
          <div key={stat.id} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
            <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              <span className={`trend ${stat.trend}`}>
                {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Bookings */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2><FaCalendarAlt /> Recent Service Bookings</h2>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="bookings-table">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Vehicle</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.customer}</td>
                  <td>{booking.service}</td>
                  <td>{booking.vehicle}</td>
                  <td>{booking.time}</td>
                  <td>
                    <span className={`status-badge ${booking.status}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Popular Services */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2><FaWrench /> Popular Services</h2>
          <button className="view-all-btn">View All</button>
        </div>
        <div className="services-grid">
          {popularServices.map(service => (
            <div key={service.id} className="service-card">
              <div className="service-icon" style={{ color: '#ff5e14' }}>
                {service.icon}
              </div>
              <div className="service-info">
                <h3>{service.name}</h3>
                <p>{service.count} bookings this month</p>
              </div>
              <div className="service-percentage">
                {Math.round((service.count / 124) * 100)}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;