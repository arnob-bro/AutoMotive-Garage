import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    district: '',
    zipCode: '',
    paymentMethod: 'ssl'
  });
  const [orderSuccess, setOrderSuccess] = useState(false);

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = totalPrice * 0.05; // 5% VAT
  const shipping = totalPrice > 5000 ? 0 : 300; // Free shipping over ৳5000
  const grandTotal = totalPrice + tax + shipping;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would process payment here
    console.log('Order submitted:', { ...formData, cart, total: grandTotal });
    
    // Clear cart and show success message
    localStorage.removeItem('cart');
    setOrderSuccess(true);
  };

  const removeFromCart = (partId) => {
    const updatedCart = cart.filter(item => item.id !== partId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (partId, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = cart.map(item => 
      item.id === partId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (orderSuccess) {
    return (
      <div className="order-success">
        <div className="success-container">
          <div className="success-icon">✓</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase. Your order has been received and is being processed.</p>
          <p>A confirmation email has been sent to <strong>{formData.email}</strong></p>
          <button 
            className="back-to-shop"
            onClick={() => navigate('/parts')}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your purchase of automotive parts</p>
      </div>

      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Billing Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{11}"
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="House #, Road #, Area"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                >
                  <option value="Dhaka">Dhaka</option>
                  <option value="Chittagong">Chittagong</option>
                  <option value="Sylhet">Sylhet</option>
                  <option value="Rajshahi">Rajshahi</option>
                  <option value="Khulna">Khulna</option>
                  <option value="Barishal">Barishal</option>
                  <option value="Rangpur">Rangpur</option>
                  <option value="Mymensingh">Mymensingh</option>
                </select>
              </div>
              <div className="form-group">
                <label>District</label>
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>ZIP Code</label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </div>

            <h2>Payment Method</h2>
            <div className="payment-methods">
              <label className={`payment-method ${formData.paymentMethod === 'ssl' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="ssl"
                  checked={formData.paymentMethod === 'ssl'}
                  onChange={handleInputChange}
                />
                <div className="payment-method-content">
                  <span>SSL Commerz</span>
                  <img src="https://www.sslcommerz.com/wp-content/uploads/2020/09/SSLCommerz-Logo-1.png" alt="SSL Commerz" />
                </div>
              </label>
              <label className={`payment-method ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={formData.paymentMethod === 'cod'}
                  onChange={handleInputChange}
                />
                <div className="payment-method-content">
                  <span>Cash on Delivery</span>
                  <img src="https://cdn-icons-png.flaticon.com/512/2703/2703634.png" alt="Cash on Delivery" />
                </div>
              </label>
            </div>

            <button type="submit" className="place-order-btn">
              Place Order
            </button>
          </form>
        </div>

        <div className="order-summary">
          <h2>Your Order</h2>
          <div className="order-items">
            {cart.map(item => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">{item.quantity} × ৳{item.price.toLocaleString()}</span>
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <span className="item-total">৳{(item.price * item.quantity).toLocaleString()}</span>
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="order-totals">
            <div className="total-row">
              <span>Subtotal</span>
              <span>৳{totalPrice.toLocaleString()}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `৳${shipping.toLocaleString()}`}</span>
            </div>
            <div className="total-row">
              <span>VAT (5%)</span>
              <span>৳{tax.toLocaleString()}</span>
            </div>
            <div className="total-row grand-total">
              <span>Total</span>
              <span>৳{grandTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;