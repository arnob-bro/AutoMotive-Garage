import React, { useState } from 'react';
import { 
  FaBook, FaPlus, FaEdit, FaTrash, FaSearch,
  FaFilter, FaCalendarAlt, FaDownload, FaImage
} from 'react-icons/fa';
import './EducationalArticleManagement.css';

const EducationalArticleManagement = () => {
  // Sample article data
  const initialArticles = [
    {
      id: 'ART-1001',
      title: 'Basic Car Maintenance Tips',
      category: 'Maintenance',
      author: 'John Smith',
      date: '2023-08-15',
      status: 'published',
      featured: true,
      image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d',
      content: `<h2>Basic Car Maintenance Every Owner Should Know</h2>
        <p>Regular maintenance is key to keeping your vehicle running smoothly and avoiding costly repairs. Here are essential tasks you should perform:</p>
        <h3>1. Oil Changes</h3>
        <p>Change your engine oil every 5,000-7,500 km or as recommended in your owner's manual. Fresh oil lubricates engine components and prevents overheating.</p>`
    },
    {
      id: 'ART-1002',
      title: 'Understanding Warning Lights',
      category: 'Safety',
      author: 'Sarah Johnson',
      date: '2023-07-28',
      status: 'published',
      featured: false,
      image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785',
      content: `<h2>Dashboard Warning Lights Explained</h2>
        <p>Your car's dashboard lights are its way of communicating problems. Here's what they mean:</p>
        <h3>Red Lights - Immediate Attention Needed</h3>
        <p><strong>Check Engine Light:</strong> Could indicate anything from a loose gas cap to serious engine trouble.</p>`
    },
    {
      id: 'ART-1003',
      title: 'Seasonal Car Care Guide',
      category: 'Maintenance',
      author: 'Michael Brown',
      date: '2023-06-10',
      status: 'published',
      featured: true,
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70',
      content: `<h2>Seasonal Car Maintenance Guide</h2>
        <h3>Summer Preparation</h3>
        <p>• Check AC system performance</p>
        <p>• Inspect cooling system and hoses</p>`
    }
  ];

  const [articles, setArticles] = useState(initialArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Status options for filtering
  const statusOptions = ['all', 'published', 'draft', 'archived'];
  
  // Category options for filtering
  const categoryOptions = ['all', 'Maintenance', 'Safety', 'Technology', 'Performance'];

  // Filter articles based on search and filters
  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || article.status === filterStatus;
    
    const matchesCategory = filterCategory === 'all' || article.category === filterCategory;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'published':
        return 'var(--success)';
      case 'draft':
        return 'var(--warning)';
      case 'archived':
        return 'var(--text-light)';
      default:
        return '';
    }
  };

  // Open add article modal
  const openAddModal = () => {
    setCurrentArticle({
      id: '',
      title: '',
      category: '',
      author: '',
      date: new Date().toISOString().split('T')[0],
      status: 'draft',
      featured: false,
      image: '',
      content: ''
    });
    setImagePreview(null);
    setShowAddModal(true);
  };

  // Open view article modal
  const openViewModal = (article) => {
    setCurrentArticle(article);
    setShowViewModal(true);
  };

  // Open edit article modal
  const openEditModal = (article) => {
    setCurrentArticle({...article});
    setImagePreview(article.image);
    setShowEditModal(true);
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setCurrentArticle({...currentArticle, image: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  // Save article (add or edit)
  const saveArticle = (e) => {
    e.preventDefault();
    if (currentArticle.id) {
      // Edit existing article
      setArticles(articles.map(article => 
        article.id === currentArticle.id ? currentArticle : article
      ));
      setShowEditModal(false);
    } else {
      // Add new article
      const newId = `ART-${1000 + articles.length + 1}`;
      setArticles([...articles, {...currentArticle, id: newId}]);
      setShowAddModal(false);
    }
  };

  // Delete article
  const deleteArticle = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      setArticles(articles.filter(article => article.id !== id));
    }
  };

  // Toggle export menu
  const toggleExportMenu = (e) => {
    e.stopPropagation();
    setIsExportMenuOpen(!isExportMenuOpen);
  };

  // Close all modals and menus when clicking outside
  const closeAllModals = () => {
    setShowAddModal(false);
    setShowViewModal(false);
    setShowEditModal(false);
    setIsExportMenuOpen(false);
  };

  return (
    <div className="educational-article-management-page">
      <div className="educational-article-header">
        <h1><FaBook /> Educational Article Management</h1>
        <p>Create and manage educational content for your customers</p>
      </div>

      <div className="educational-article-controls">
        <div className="educational-search-box">
          <FaSearch className="educational-search-icon" />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="educational-filter-group">
          <div className="educational-filter-dropdown">
            <label>Status:</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              {statusOptions.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div className="educational-filter-dropdown">
            <label>Category:</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              {categoryOptions.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="educational-article-actions">
          <button className="educational-add-btn" onClick={openAddModal}>
            <FaPlus /> Add Article
          </button>
          
          <div className="educational-export-actions">
            <button className="educational-export-btn" onClick={toggleExportMenu}>
              <FaDownload /> Export
              {isExportMenuOpen && (
                <div className="educational-export-menu">
                  <button>CSV</button>
                  <button>Excel</button>
                  <button>PDF</button>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="educational-articles-table-container">
        {filteredArticles.length > 0 ? (
          <table className="educational-articles-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Author</th>
                <th>Date</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredArticles.map(article => (
                <tr key={article.id} onClick={() => openViewModal(article)}>
                  <td className="educational-article-id">{article.id}</td>
                  <td className="educational-article-title">{article.title}</td>
                  <td className="educational-article-category">{article.category}</td>
                  <td className="educational-article-author">{article.author}</td>
                  <td className="educational-article-date">{new Date(article.date).toLocaleDateString()}</td>
                  <td className="educational-article-status">
                    <div className="educational-status-badge" style={{ backgroundColor: getStatusColor(article.status) }}>
                      {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                    </div>
                  </td>
                  <td className="educational-article-featured">
                    {article.featured ? 'Yes' : 'No'}
                  </td>
                  <td className="educational-table-actions">
                    <button 
                      className="educational-edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(article);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button 
                      className="educational-delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteArticle(article.id);
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="educational-no-articles">
            <p>No articles found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Add Article Modal */}
      {showAddModal && (
        <div className="educational-modal-overlay" onClick={closeAllModals}>
          <div className="educational-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="educational-modal-header">
              <h3>Add New Article</h3>
              <button 
                className="educational-close-modal"
                onClick={closeAllModals}
              >
                ×
              </button>
            </div>
            
            <form className="educational-modal-body" onSubmit={saveArticle}>
              <div className="educational-form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={currentArticle.title}
                  onChange={(e) => setCurrentArticle({...currentArticle, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="educational-form-row">
                <div className="educational-form-group">
                  <label>Category</label>
                  <select
                    value={currentArticle.category}
                    onChange={(e) => setCurrentArticle({...currentArticle, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.filter(c => c !== 'all').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="educational-form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    value={currentArticle.author}
                    onChange={(e) => setCurrentArticle({...currentArticle, author: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="educational-form-row">
                <div className="educational-form-group">
                  <label>Status</label>
                  <select
                    value={currentArticle.status}
                    onChange={(e) => setCurrentArticle({...currentArticle, status: e.target.value})}
                  >
                    {statusOptions.filter(s => s !== 'all').map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="educational-form-group">
                  <label>Featured</label>
                  <div className="educational-checkbox-container">
                    <input
                      type="checkbox"
                      checked={currentArticle.featured}
                      onChange={(e) => setCurrentArticle({...currentArticle, featured: e.target.checked})}
                    />
                    <span>Feature this article</span>
                  </div>
                </div>
              </div>
              
              <div className="educational-form-group">
                <label>Article Image</label>
                <div className="educational-image-upload-container">
                  <label className="educational-image-upload-btn">
                    <FaImage /> Choose Image
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {imagePreview && (
                    <div className="educational-image-preview">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="educational-form-group">
                <label>Content</label>
                <textarea
                  value={currentArticle.content}
                  onChange={(e) => setCurrentArticle({...currentArticle, content: e.target.value})}
                  rows="8"
                  required
                ></textarea>
              </div>
              
              <div className="educational-modal-footer">
                <button type="button" className="educational-modal-cancel-btn" onClick={closeAllModals}>
                  Cancel
                </button>
                <button type="submit" className="educational-modal-save-btn">
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* View Article Modal */}
      {showViewModal && currentArticle && (
        <div className="educational-modal-overlay" onClick={closeAllModals}>
          <div className="educational-modal-container educational-view-modal" onClick={(e) => e.stopPropagation()}>
            <div className="educational-modal-header">
              <h3>{currentArticle.title}</h3>
              <button 
                className="educational-close-modal"
                onClick={closeAllModals}
              >
                ×
              </button>
            </div>
            
            <div className="educational-modal-body">
              <div className="educational-article-meta">
                <div className="educational-meta-item">
                  <strong>Category:</strong> {currentArticle.category}
                </div>
                <div className="educational-meta-item">
                  <strong>Author:</strong> {currentArticle.author}
                </div>
                <div className="educational-meta-item">
                  <strong>Date:</strong> {new Date(currentArticle.date).toLocaleDateString()}
                </div>
                <div className="educational-meta-item">
                  <strong>Status:</strong> 
                  <span className="educational-status-badge" style={{ backgroundColor: getStatusColor(currentArticle.status) }}>
                    {currentArticle.status.charAt(0).toUpperCase() + currentArticle.status.slice(1)}
                  </span>
                </div>
                <div className="educational-meta-item">
                  <strong>Featured:</strong> {currentArticle.featured ? 'Yes' : 'No'}
                </div>
              </div>
              
              {currentArticle.image && (
                <div className="educational-article-image">
                  <img src={currentArticle.image} alt={currentArticle.title} />
                </div>
              )}
              
              <div 
                className="educational-article-content"
                dangerouslySetInnerHTML={{ __html: currentArticle.content }}
              ></div>
            </div>
            
            <div className="educational-modal-footer">
              <button 
                className="educational-modal-edit-btn"
                onClick={() => {
                  setShowViewModal(false);
                  openEditModal(currentArticle);
                }}
              >
                <FaEdit /> Edit Article
              </button>
              <button 
                className="educational-modal-close-btn"
                onClick={closeAllModals}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Article Modal */}
      {showEditModal && currentArticle && (
        <div className="educational-modal-overlay" onClick={closeAllModals}>
          <div className="educational-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="educational-modal-header">
              <h3>Edit Article: {currentArticle.title}</h3>
              <button 
                className="educational-close-modal"
                onClick={closeAllModals}
              >
                ×
              </button>
            </div>
            
            <form className="educational-modal-body" onSubmit={saveArticle}>
              <div className="educational-form-group">
                <label>Title</label>
                <input
                  type="text"
                  value={currentArticle.title}
                  onChange={(e) => setCurrentArticle({...currentArticle, title: e.target.value})}
                  required
                />
              </div>
              
              <div className="educational-form-row">
                <div className="educational-form-group">
                  <label>Category</label>
                  <select
                    value={currentArticle.category}
                    onChange={(e) => setCurrentArticle({...currentArticle, category: e.target.value})}
                    required
                  >
                    <option value="">Select Category</option>
                    {categoryOptions.filter(c => c !== 'all').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="educational-form-group">
                  <label>Author</label>
                  <input
                    type="text"
                    value={currentArticle.author}
                    onChange={(e) => setCurrentArticle({...currentArticle, author: e.target.value})}
                    required
                  />
                </div>
              </div>
              
              <div className="educational-form-row">
                <div className="educational-form-group">
                  <label>Status</label>
                  <select
                    value={currentArticle.status}
                    onChange={(e) => setCurrentArticle({...currentArticle, status: e.target.value})}
                  >
                    {statusOptions.filter(s => s !== 'all').map(status => (
                      <option key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="educational-form-group">
                  <label>Featured</label>
                  <div className="educational-checkbox-container">
                    <input
                      type="checkbox"
                      checked={currentArticle.featured}
                      onChange={(e) => setCurrentArticle({...currentArticle, featured: e.target.checked})}
                    />
                    <span>Feature this article</span>
                  </div>
                </div>
              </div>
              
              <div className="educational-form-group">
                <label>Article Image</label>
                <div className="educational-image-upload-container">
                  <label className="educational-image-upload-btn">
                    <FaImage /> {imagePreview ? 'Change Image' : 'Choose Image'}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  {imagePreview && (
                    <div className="educational-image-preview">
                      <img src={imagePreview} alt="Preview" />
                    </div>
                  )}
                </div>
              </div>
              
              <div className="educational-form-group">
                <label>Content</label>
                <textarea
                  value={currentArticle.content}
                  onChange={(e) => setCurrentArticle({...currentArticle, content: e.target.value})}
                  rows="8"
                  required
                ></textarea>
              </div>
              
              <div className="educational-modal-footer">
                <button type="button" className="educational-modal-cancel-btn" onClick={closeAllModals}>
                  Cancel
                </button>
                <button type="submit" className="educational-modal-save-btn">
                  Update Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationalArticleManagement;