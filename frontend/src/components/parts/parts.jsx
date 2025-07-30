import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './parts.css';

const Parts = () => {
  const navigate = useNavigate();
  const [parts] = useState([
    {
      id: 1,
      name: 'Premium Brake Pads',
      description: 'High-performance ceramic brake pads for all weather conditions',
      price: 59.99,
      category: 'Brakes',
      image: 'https://via.placeholder.com/300x200?text=Brake+Pads',
      details: 'Ceramic compound, low dust, quiet operation, fits most sedans and SUVs'
    },
    {
      id: 2,
      name: 'Performance Air Filter',
      description: 'High-flow reusable air filter',
      price: 39.99,
      category: 'Engine',
      image: 'https://via.placeholder.com/300x200?text=Air+Filter',
      details: 'Washable and reusable, increases airflow by 50%, fits most models'
    },
    {
      id: 3,
      name: 'Synthetic Motor Oil 5W-30',
      description: 'Full synthetic engine oil 5qt',
      price: 34.99,
      category: 'Fluids',
      image: 'https://via.placeholder.com/300x200?text=Motor+Oil',
      details: '5-quart bottle, 5W-30 viscosity, extends engine life'
    },
    {
      id: 4,
      name: 'All-Season Tires',
      description: 'Set of 4 premium all-season tires',
      price: 599.99,
      category: 'Tires',
      image: 'https://via.placeholder.com/300x200?text=Tires',
      details: '65,000 mile warranty, excellent wet/dry traction, 225/55R17'
    },
    {
      id: 5,
      name: 'Car Battery',
      description: 'High-performance automotive battery',
      price: 129.99,
      category: 'Electrical',
      image: 'https://via.placeholder.com/300x200?text=Battery',
      details: '750 CCA, 36-month warranty, fits most vehicles'
    },
    {
      id: 6,
      name: 'LED Headlight Bulbs',
      description: 'Ultra-bright LED conversion kit',
      price: 89.99,
      category: 'Lighting',
      image: 'https://via.placeholder.com/300x200?text=LED+Bulbs',
      details: '6000K white light, plug-and-play installation, 50,000 hour lifespan'
    },
    {
      id: 7,
      name: 'Car Cover',
      description: 'Premium outdoor car cover',
      price: 149.99,
      category: 'Accessories',
      image: 'https://via.placeholder.com/300x200?text=Car+Cover',
      details: 'Weatherproof, UV protection, fits midsize sedans'
    },
    {
      id: 8,
      name: 'Diagnostic Scanner',
      description: 'OBD2 code reader and scanner',
      price: 99.99,
      category: 'Tools',
      image: 'https://via.placeholder.com/300x200?text=Scanner',
      details: 'Reads/clears codes, live data, smog check readiness'
    }
  ]);

  const [cart, setCart] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCart, setShowCart] = useState(false);

  const categories = ['All', 'Brakes', 'Engine', 'Fluids', 'Tires', 'Electrical', 'Lighting', 'Accessories', 'Tools'];

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const filteredParts = parts.filter(part => 
    part.price >= priceRange[0] && 
    part.price <= priceRange[1] &&
    (selectedCategory === 'All' || part.category === selectedCategory)
  );

  const addToCart = (part) => {
    setCart([...cart, part]);
  };

  const removeFromCart = (partId) => {
    setCart(cart.filter(item => item.id !== partId));
  };

  const openDetails = (part) => {
    setSelectedPart(part);
    setShowModal(true);
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="parts-page">
      <button 
        className={`cart-toggle-btn ${cart.length > 0 ? 'has-items' : ''}`}
        onClick={() => setShowCart(!showCart)}
      >
        {showCart ? 'Hide Cart' : `View Cart (${cart.length})`}
      </button>

      <div className="parts-header">
        <h1>Auto Parts & Accessories</h1>
        <p>Quality parts for your vehicle at competitive prices</p>
      </div>

      <div className="parts-controls">
        <div className="price-filter">
          <label>Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
          <input 
            type="range" 
            min="0" 
            max="1000" 
            value={priceRange[1]} 
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
        </div>

        <div className="category-filter">
          <label>Category:</label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="parts-container">
        {filteredParts.map(part => (
          <div key={part.id} className="part-card">
            <div className="part-image">
              <img src={part.image} alt={part.name} />
            </div>
            <div className="part-info">
              <h3>{part.name}</h3>
              <p>{part.description}</p>
              <div className="part-meta">
                <span className="part-category">{part.category}</span>
                <span className="part-price">${part.price.toFixed(2)}</span>
              </div>
              <div className="part-actions">
                <button 
                  className="details-btn"
                  onClick={() => openDetails(part)}
                >
                  Details
                </button>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => {
                    addToCart(part);
                    setShowCart(true);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`cart-sidebar ${showCart ? 'active' : ''}`}>
        <div className="cart-header">
          <h3>Your Cart ({cart.length})</h3>
          <button 
            className="close-cart"
            onClick={() => setShowCart(false)}
          >
            ×
          </button>
        </div>
        <div className="cart-items">
          {cart.length > 0 ? (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <button 
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p className="empty-cart">Your cart is empty</p>
          )}
        </div>
        {cart.length > 0 && (
          <>
            <div className="cart-total">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              className="checkout-btn"
              onClick={proceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>

      {showModal && selectedPart && (
        <div className="part-modal">
          <div className="modal-content">
            <button 
              className="close-modal"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <div className="modal-image">
              <img src={selectedPart.image} alt={selectedPart.name} />
            </div>
            <div className="modal-info">
              <h2>{selectedPart.name}</h2>
              <p className="modal-category">{selectedPart.category}</p>
              <p className="modal-price">${selectedPart.price.toFixed(2)}</p>
              <p className="modal-description">{selectedPart.description}</p>
              <div className="modal-details">
                <h4>Product Details:</h4>
                <p>{selectedPart.details}</p>
              </div>
              <button 
                className="modal-add-to-cart"
                onClick={() => {
                  addToCart(selectedPart);
                  setShowModal(false);
                  setShowCart(true);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Parts;