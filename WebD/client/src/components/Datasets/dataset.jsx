import React, { useState, useEffect } from 'react';
import './dataset.css';
import { FiUpload, FiSearch, FiFilter } from 'react-icons/fi';
import axios from 'axios';

function Dataset() {
  // State to store datasets, dropdown, and modal visibility
  const [datasets, setDatasets] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');

  // New state for form input
  const [formData, setFormData] = useState({
    username: username,
    title: '',
    date: '',
    url: ''
  });

  // useEffect to fetch datasets from the backend API
  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const response = await axios.get('http://localhost:3001/datasets/viewdatasets'); // Replace with your actual API endpoint
        setDatasets(response.data);
      } catch (error) {
        console.error('Error fetching datasets:', error);
      }
    };

    const email = localStorage.getItem('userEmail');
    console.log("Email from localStorage:", email);
  
    if (email) {
        axios.get(`http://localhost:3001/auth/user?email=${email}`)
          .then((response) => {
            console.log("Response data:", response.data.username); // Log the response to check the structure
            setUsername(response.data.username); // Update the username in state
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
    }

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
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/datasets/newdataset', formData);
      if (response.status === 201) {  // Assuming successful creation returns status 201
        setDatasets([...datasets, response.data]); // Add the new dataset from the response to the list
      }
      setIsModalOpen(false); // Close modal after submission
      setFormData({ username: '', title: '', date: '', url: '' }); // Clear form
    } catch (error) {
      console.error('Error uploading dataset:', error);
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <ul>
          <li>
            <a href="/" >Home</a>
          </li>
          <li>
            <a href="/blogs" >Blogs</a>
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
              <p>{dataset.username}</p>
              <p>Date: {dataset.date}</p>
              <p
                className="dataset-link"
                onClick={() => {
                navigator.clipboard.writeText(dataset.url);
                alert('URL copied to clipboard');
                }}
              >
          {dataset.name || dataset.title} {/* Display name or default text */}
        </p>
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
                Title:
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
              </label>
              <label>
                Date:
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </label>
              <label>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
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
