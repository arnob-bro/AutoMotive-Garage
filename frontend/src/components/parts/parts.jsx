import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './parts.css';

const Parts = () => {
  const navigate = useNavigate();
  const [parts] = useState([
    {
      id: 1,
      name: 'Premium Brake Pads',
      shortDescription: 'High-performance ceramic brake pads',
      longDescription: 'High-performance ceramic brake pads for all weather conditions. Ceramic compound provides low dust and quiet operation. Fits most sedans and SUVs. Warranty: 2 years or 50,000 km.',
      price: 5999,
      category: 'Brakes',
      image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80',
    },
    {
      id: 2,
      name: 'Performance Air Filter',
      shortDescription: 'High-flow reusable air filter',
      longDescription: 'High-flow reusable air filter increases airflow by 50% compared to standard filters. Washable and reusable design saves money long-term. Fits most vehicle models. Improves engine performance and efficiency.',
      price: 3999,
      category: 'Engine',
      image: 'https://images.unsplash.com/photo-1558980394-4c7c9299fe96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80',
    },
    {
      id: 3,
      name: 'Synthetic Motor Oil 5W-30',
      shortDescription: 'Full synthetic engine oil 5qt',
      longDescription: 'Premium full synthetic engine oil (5-quart bottle) with 5W-30 viscosity. Provides superior engine protection, reduces wear, and extends engine life. Compatible with most modern vehicles. Change interval: 10,000 km or 6 months.',
      price: 3499,
      category: 'Fluids',
      image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80',
    },
    {
      id: 4,
      name: 'All-Season Tires',
      shortDescription: 'Set of 4 premium all-season tires',
      longDescription: 'Set of 4 premium all-season tires with 65,000 km warranty. Excellent wet and dry traction. Size: 225/55R17. Features advanced tread pattern for reduced road noise and improved handling in all weather conditions.',
      price: 59999,
      category: 'Tires',
      image: 'https://images.unsplash.com/photo-1554744512-d6c603f27c54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80',
    },
    {
      id: 5,
      name: 'Car Battery',
      shortDescription: 'High-performance automotive battery',
      longDescription: 'High-performance automotive battery with 750 cold cranking amps (CCA). 36-month warranty. Maintenance-free design. Fits most vehicles. Provides reliable starting power in extreme temperatures. Dimensions: 24.5 x 17 x 19 cm.',
      price: 12999,
      category: 'Electrical',
      image: 'https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80',
    },
    {
      id: 6,
      name: 'LED Headlight Bulbs',
      shortDescription: 'Ultra-bright LED conversion kit',
      longDescription: 'Ultra-bright LED headlight conversion kit with 6000K white light. Plug-and-play installation with no wiring modifications needed. 50,000 hour lifespan. Provides 300% more light than standard halogen bulbs. Includes cooling fan for heat dissipation.',
      price: 8999,
      category: 'Lighting',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80',
    },
    {
      id: 7,
      name: 'Car Cover',
      shortDescription: 'Premium outdoor car cover',
      longDescription: 'Premium outdoor car cover with weatherproof and UV protection. Fits midsize sedans (length: 4.7-4.9m). 4-layer construction protects against rain, sun, dust, and scratches. Includes storage bag and lock holes. Color: Gray.',
      price: 14999,
      category: 'Accessories',
      image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80',
    },
    {
      id: 8,
      name: 'Diagnostic Scanner',
      shortDescription: 'OBD2 code reader and scanner',
      longDescription: 'Professional OBD2 code reader and scanner. Reads and clears engine codes, views live data, and checks smog readiness. Compatible with all OBD2 vehicles (1996 and newer). Large color screen with multilingual interface. Includes carry case.',
      price: 9999,
      category: 'Tools',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=300&q=80',
    }
  ]);

  const [cart, setCart] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
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
    const existingItem = cart.find(item => item.id === part.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === part.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...part, quantity: 1 }]);
    }
  };

  const removeFromCart = (partId) => {
    setCart(cart.filter(item => item.id !== partId));
  };

  const updateQuantity = (partId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(cart.map(item => 
      item.id === partId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const openDetails = (part) => {
    setSelectedPart(part);
    setShowModal(true);
  };

  const proceedToCheckout = () => {
    navigate('/checkout');
  };

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Calculate fill percentage for price range slider
  const fillPercent = ((priceRange[1] - priceRange[0]) / (maxPrice - minPrice)) * 100 + '%';
  
  // Update min/max prices when parts change
  useEffect(() => {
    if (parts.length > 0) {
      const prices = parts.map(part => part.price);
      const min = Math.min(...prices);
      const max = Math.max(...prices);
      setMinPrice(min);
      setMaxPrice(max);
      setPriceRange([min, max]);
    }
  }, [parts]);

  return (
    <div className="partsPage">
      <button 
        className={`partsPage-cart-toggle-btn ${cart.length > 0 ? 'has-items' : ''}`}
        onClick={() => setShowCart(!showCart)}
      >
        {showCart ? 'Hide Cart' : `View Cart (${cart.reduce((sum, item) => sum + item.quantity, 0)})`}
      </button>

      <div className="partsPage-header">
        <h1>Auto Parts & Accessories</h1>
        <p>Quality parts for your vehicle at competitive prices</p>
      </div>

      <div className="partsPage-controls">
        <div className="partsPage-price-filter-container">
          <label>Price Range: ৳{priceRange[0].toLocaleString()} - ৳{priceRange[1].toLocaleString()}</label>
          <div className="partsPage-price-filter">
            <input 
              type="range" 
              min={minPrice} 
              max={maxPrice} 
              step="1000"
              value={priceRange[0]} 
              onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
              className="partsPage-price-slider partsPage-price-slider-min"
            />
            <input 
              type="range" 
              min={minPrice} 
              max={maxPrice} 
              step="1000"
              value={priceRange[1]} 
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="partsPage-price-slider partsPage-price-slider-max"
              style={{ '--fill-percent': fillPercent }}
            />
          </div>
        </div>

        <div className="partsPage-category-filter-container">
          <label>Category:</label>
          <div className="partsPage-category-filter">
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
      </div>

      <div className="partsPage-container">
        {filteredParts.map(part => (
          <div key={part.id} className="partsPage-part-card">
            <div className="partsPage-part-image">
              <img 
                src={part.image} 
                alt={part.name} 
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY1ZTE0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QYXJ0IEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
              <span className="partsPage-part-category">{part.category}</span>
            </div>
            <div className="partsPage-part-info">
              <h3>{part.name}</h3>
              <p className="partsPage-short-description">{part.shortDescription}</p>
              <div className="partsPage-part-price">৳{part.price.toLocaleString()}</div>
              <div className="partsPage-part-actions">
                <button 
                  className="partsPage-details-btn"
                  onClick={() => openDetails(part)}
                >
                  Details
                </button>
                <button 
                  className="partsPage-add-to-cart-btn"
                  onClick={() => addToCart(part)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`partsPage-cart-sidebar ${showCart ? 'active' : ''}`}>
        <div className="partsPage-cart-header">
          <h3>Your Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</h3>
          <button 
            className="partsPage-close-cart"
            onClick={() => setShowCart(false)}
          >
            ×
          </button>
        </div>
        <div className="partsPage-cart-items">
          {cart.length > 0 ? (
            cart.map(item => (
              <div key={item.id} className="partsPage-cart-item">
                <div className="partsPage-item-image">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY1ZTE0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QYXJ0IEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                    }}
                  />
                </div>
                <div className="partsPage-item-details">
                  <span className="partsPage-item-name">{item.name}</span>
                  <span className="partsPage-item-price">৳{item.price.toLocaleString()}</span>
                  <div className="partsPage-quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <button 
                  className="partsPage-remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  ×
                </button>
              </div>
            ))
          ) : (
            <p className="partsPage-empty-cart">Your cart is empty</p>
          )}
        </div>
        {cart.length > 0 && (
          <>
            <div className="partsPage-cart-total">
              <span>Total:</span>
              <span>৳{totalPrice.toLocaleString()}</span>
            </div>
            <button 
              className="partsPage-checkout-btn"
              onClick={proceedToCheckout}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>

      {showModal && selectedPart && (
        <div className="partsPage-part-modal">
          <div className="partsPage-modal-content">
            <button 
              className="partsPage-close-modal"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <div className="partsPage-modal-image-container">
              <img 
                src={selectedPart.image} 
                alt={selectedPart.name} 
                className="partsPage-modal-image"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY1ZTE0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5QYXJ0IEltYWdlPC90ZXh0Pjwvc3ZnPg==';
                }}
              />
            </div>
            <div className="partsPage-modal-info">
              <h2>{selectedPart.name}</h2>
              <p className="partsPage-modal-category">{selectedPart.category}</p>
              <p className="partsPage-modal-price">৳{selectedPart.price.toLocaleString()}</p>
              <div className="partsPage-modal-description">
                <h4>Product Description:</h4>
                <p>{selectedPart.longDescription}</p>
              </div>
              <button 
                className="partsPage-modal-add-to-cart"
                onClick={() => {
                  addToCart(selectedPart);
                  setShowModal(false);
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