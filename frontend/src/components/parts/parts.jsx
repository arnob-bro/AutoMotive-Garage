import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import './parts.css';
import PartApi from "../../apis/partApi";
const partApi = new PartApi();

const Parts = () => {
  const navigate = useNavigate();
  const [parts, setParts] = useState([]);

  const [cart, setCart] = useState([]);
  const [selectedPart, setSelectedPart] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const categories = ['', 'Brakes', 'Engine', 'Fluids', 'Tires', 'Electrical', 'Lighting', 'Accessories', 'Tools'];

  const fetchParts = async () => {
    try {
      
      const response = await partApi.getParts({
        page,
        limit: 8,
        searchTerm: selectedCategory,
        status: 'Active'
      });

      if (response.success) {
        setParts(response.parts || []);
        setTotalPages(response.pagination?.totalPages);
      } 
    } catch (err) {
      console.error('Error fetching services:', err);
    } 
  };
  useEffect(() => {
    fetchParts();
  }, [selectedCategory,page]);


  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

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
        

        <div className="partsPage-category-filter-container">
          <label>Category:</label>
          <div className="partsPage-category-filter">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category===""? "All" : category}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="partsPage-container">
        {parts.map(part => (
          <div key={part.part_id} className="partsPage-part-card">
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
              <p className="partsPage-short-description">{part.short_description}</p>
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

        {/* Pagination */}
        {totalPages > 1 && (
                <div className="pagination">
                {/* Previous */}
                <button
                  onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className="pagination-btn"
                >
                  <FiChevronLeft /> Previous
                </button>
              
                {/* Page numbers with ellipsis */}
                {(() => {
                  const pages = [];
                  const delta = 1; // show ±1 around current
              
                  for (let i = 1; i <= totalPages; i++) {
                    if (
                      i === 1 || 
                      i === totalPages || 
                      (i >= page - delta && i <= page + delta)
                    ) {
                      pages.push(i);
                    } else if (pages[pages.length - 1] !== '...') {
                      pages.push('...');
                    }
                  }
              
                  return pages.map((page, idx) =>
                    page === '...' ? (
                      <span key={idx} className="pagination-ellipsis">…</span>
                    ) : (
                      <button
                        key={idx}
                        onClick={() => setPage(page)}
                        className={page === page ? 'active' : ''}
                      >
                        {page}
                      </button>
                    )
                  );
                })()}
              
                {/* Next */}
                <button
                  onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className="pagination-btn"
                >
                  Next <FiChevronRight />
                </button>
              </div>
          
          
          )}
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
                <p>{selectedPart.long_description}</p>
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