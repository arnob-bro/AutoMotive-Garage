import React from 'react';
import { 
  FaCar, FaWrench, FaBoxes, 
  FaDollarSign, FaCalendarAlt,
  FaShoppingCart, FaTools, FaOilCan
} from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = () => {
  // Sample data - replace with real data from your API
  const stats = [
    { id: 1, title: 'Total Services', value: 124, icon: <FaWrench />, color: '#ff5e14', trend: 'up' },
    { id: 2, title: 'Parts Inventory', value: 856, icon: <FaBoxes />, color: '#4361ee', trend: 'stable' },
    { 
      id: 3, 
      title: 'Revenue', 
      value: 'BDT 42,845', 
      icon: <FaDollarSign />, 
      color: '#f72585', 
      trend: 'up',
      filter: (
        <div className="auto-revenue-filter">
          <label>
            <input type="radio" name="revenue" defaultChecked /> Today
          </label>
          <label>
            <input type="radio" name="revenue" /> Total
          </label>
        </div>
      )
    }
  ];

  const recentBookings = [
    { id: 1, customer: 'Rahim Khan', service: 'Oil Change', vehicle: 'Toyota Corolla', time: 'Today, 10:00 AM', status: 'confirmed', payment: 'SSL Commerz' },
    { id: 2, customer: 'Fatima Begum', service: 'Brake Service', vehicle: 'Honda City', time: 'Today, 11:30 AM', status: 'confirmed', payment: 'Cash' },
    { id: 3, customer: 'Karim Ahmed', service: 'Tire Rotation', vehicle: 'Mitsubishi Pajero', time: 'Today, 2:00 PM', status: 'pending', payment: 'Pending' },
    { id: 4, customer: 'Ayesha Akter', service: 'AC Repair', vehicle: 'Toyota Premio', time: 'Tomorrow, 9:00 AM', status: 'confirmed', payment: 'SSL Commerz' },
    { id: 5, customer: 'Jamal Uddin', service: 'Transmission Check', vehicle: 'Nissan X-Trail', time: 'Tomorrow, 1:30 PM', status: 'pending', payment: 'Pending' }
  ];

  const topServices = [
    { id: 1, name: 'Oil Change', count: 42, icon: <FaOilCan /> },
    { id: 2, name: 'Brake Service', count: 28, icon: <FaTools /> },
    { id: 3, name: 'Tire Rotation', count: 19, icon: <FaCar /> },
    { id: 4, name: 'AC Repair', count: 15, icon: <FaWrench /> },
    { id: 5, name: 'Battery Replacement', count: 12, icon: <FaShoppingCart /> }
  ];

  const topParts = [
    { id: 1, name: 'Engine Oil', count: 56, icon: <FaOilCan /> },
    { id: 2, name: 'Brake Pads', count: 32, icon: <FaTools /> },
    { id: 3, name: 'Air Filter', count: 28, icon: <FaCar /> },
    { id: 4, name: 'AC Compressor', count: 18, icon: <FaWrench /> },
    { id: 5, name: 'Car Battery', count: 15, icon: <FaShoppingCart /> }
  ];

  return (
    <div className="auto-dashboard-container">
      <div className="auto-dashboard-header">
        <h1>Auto Service Dashboard</h1>
        <p>Dhaka, Bangladesh - {new Date().toLocaleDateString('en-BD')}</p>
      </div>
      
      {/* Stats Cards */}
      <div className="auto-stats-grid">
        {stats.map(stat => (
          <div key={stat.id} className="auto-stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
            <div className="auto-stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
              {stat.icon}
            </div>
            <div className="auto-stat-content">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
              {stat.filter && stat.filter}
              <span className={`auto-trend ${stat.trend}`}>
                {stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '→'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Bookings */}
      <div className="auto-dashboard-section">
        <div className="auto-section-header">
          <h2><FaCalendarAlt /> Recent Service Bookings</h2>
          <button className="auto-view-all-btn">View All</button>
        </div>
        <div className="auto-bookings-table">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Service</th>
                <th>Vehicle</th>
                <th>Time</th>
                <th>Payment</th>
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
                  <td>{booking.payment}</td>
                  <td>
                    <span className={`auto-status-badge ${booking.status}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Top Services and Parts */}
      <div className="auto-dashboard-columns">
        <div className="auto-dashboard-section">
          <div className="auto-section-header">
            <h2><FaWrench /> Top 5 Services</h2>
          </div>
          <div className="auto-services-grid">
            {topServices.map(service => (
              <div key={service.id} className="auto-service-card">
                <div className="auto-service-icon" style={{ color: '#ff5e14' }}>
                  {service.icon}
                </div>
                <div className="auto-service-info">
                  <h3>{service.name}</h3>
                  <p>{service.count} bookings</p>
                </div>
                <div className="auto-service-percentage">
                  {Math.round((service.count / 124) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="auto-dashboard-section">
          <div className="auto-section-header">
            <h2><FaBoxes /> Top 5 Parts Sold</h2>
          </div>
          <div className="auto-services-grid">
            {topParts.map(part => (
              <div key={part.id} className="auto-service-card">
                <div className="auto-service-icon" style={{ color: '#4361ee' }}>
                  {part.icon}
                </div>
                <div className="auto-service-info">
                  <h3>{part.name}</h3>
                  <p>{part.count} sold</p>
                </div>
                <div className="auto-service-percentage">
                  {Math.round((part.count / 856) * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;