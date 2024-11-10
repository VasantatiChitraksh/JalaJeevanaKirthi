import React, { useState, useEffect } from 'react';
import './dataset.css';
import { FiUpload, FiSearch, FiFilter } from 'react-icons/fi';
import axios from 'axios';

function Dataset() {
  // State to store datasets, dropdown, and modal visibility
  const [datasets, setDatasets] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New state for form input
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    author: '',
    url: ''
  });

  // useEffect to fetch datasets from the backend API
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await axios.get('https://example.com/api/datasets'); // Replace with your actual API endpoint
        setDatasets(response.data);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };

    fetchDatasets();
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Here you can make an API call to upload the dataset or add it to the datasets array
    setDatasets([...datasets, formData]);
    setIsModalOpen(false); // Close modal after submission
    setFormData({ name: '', date: '', author: '', url: '' }); // Clear form
  };

  return (
    <div className="container">
      <nav className="navbar">
        <ul>
          <li>
            <a href="/" >Home</a>
          </li>
          <li>
            <a href="https://example.com/blogs" >Blogs</a>
          </li>
          <li className="right">
            <a href="/login" >Login</a>
          </li>
        </ul>
      </nav>

      <div className="content">
        <div className="upload-section">
          <h3>Upload Dataset</h3>
          <button className="upload-button" onClick={toggleModal}>
            <FiUpload size={24} /> Upload file
          </button>
        </div>

        <div className="search-section">
          <h3>Search Datasets</h3>
          <div className="search-bar">
            <FiSearch size={24} />
            <input type="text" placeholder="Search..." />
            <div className="filter-container" onClick={toggleDropdown}>
              <FiFilter size={24} style={{ cursor: 'pointer' }} />
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <p onClick={() => console.log('Filter by Date')}>Filter by Date</p>
                  <p onClick={() => console.log('Filter by Author')}>Filter by Author</p>
                  <p onClick={() => console.log('Filter by Type')}>Filter by Type</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="datasets-section">
          <div className="datasets">
            {datasets.length > 0 ? (
              datasets.map((dataset, index) => (
                <div className="dataset-card" key={index}>
                  <p>{dataset.author}</p>
                  <p>Date: {dataset.date}</p>
                  <p>{dataset.description || dataset.url}</p>
                </div>
              ))
            ) : (
              <p>Loading datasets...</p>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Upload New Dataset</h3>
            <form onSubmit={handleFormSubmit}>
              <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
              </label>
              <label>
                Date:
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </label>
              <label>
                Author:
                <input type="text" name="author" value={formData.author} onChange={handleInputChange} required />
              </label>
              <label>
                URL:
                <input type="url" name="url" value={formData.url} onChange={handleInputChange} required />
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={toggleModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dataset;
