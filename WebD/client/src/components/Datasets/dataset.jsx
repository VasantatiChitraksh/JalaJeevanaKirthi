import React, { useState, useEffect } from 'react';
import './dataset.css';
import { FiUpload, FiSearch, FiFilter } from 'react-icons/fi';
import axios from 'axios';
import Fishes from '../Fish/fish';

function Dataset() {
  const [datasets, setDatasets] = useState([]);
  const [tags, setTags] = useState([]); // State for available tags
  const [selectedTags, setSelectedTags] = useState([]); // State for selected tags in filter
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState('');
  
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Fetch datasets and tags from backend
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const datasetsResponse = await axios.get('https://ug2-team3-se-webd-1.onrender.com/datasets/viewdatasets');
        setDatasets(datasetsResponse.data);

        const tagsResponse = await axios.get('https://ug2-team3-se-webd-1.onrender.com/datasets/tags');
        setTags(tagsResponse.data);

        const email = localStorage.getItem('userEmail');
        if (email) {
          const userResponse = await axios.get(`https://ug2-team3-se-webd-1.onrender.com/auth/user?email=${email}`);
          setUsername(userResponse.data.username);
          setFormData((prev) => ({ ...prev, username: userResponse.data.username }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchInitialData();
  }, []);

  const [formData, setFormData] = useState({
    username: username,
    title: '',
    date: '',
    url: '',
    tags: [],
    newTag: '' // For creating a new tag
  });

  // Handle input changes for form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === 'date') {
      const today = new Date().toISOString().split('T')[0];
      if (value > today) {
        alert("Please select a valid date.");
        return;
      }
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle tag selection in the filter
  const handleTagSelection = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Handle form submission for new dataset
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { newTag, tags, ...dataset } = formData;

      // Add the new tag if provided
      if (newTag) {
        if (!tags.includes(newTag)) {
          tags.push(newTag);
        }
      }

      const response = await axios.post('https://ug2-team3-se-webd-1.onrender.com/datasets/newdataset', {
        ...dataset,
        tags
      });

      if (response.status === 200) {
        setDatasets([...datasets, response.data]);
        if (newTag && !tags.includes(newTag)) {
          setTags((prevTags) => [...prevTags, newTag]); // Update available tags
        }
      }

      setIsModalOpen(false);
      setFormData({ username: username, title: '', date: '', url: '', tags: [], newTag: '' });
    } catch (error) {
      console.error('Error uploading dataset:', error);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Search function that filters datasets based on search query and tags
  const handleSearch = async () => {
    try {
      const tagsParam = selectedTags.join(',');
      const response = await axios.get('https://ug2-team3-se-webd-1.onrender.com/datasets/searchdataset', {
        params: { search: searchQuery, tags: tagsParam }
      });
      setDatasets(response.data);
    } catch (error) {
      console.error('Error searching datasets:', error);
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </nav>

      <Fishes />

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
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-button" onClick={handleSearch} style={{ color: 'black' }}>
              Search
            </button>
            <div className="filter-container" onClick={toggleDropdown}>
              <FiFilter size={24} style={{ cursor: 'pointer' }} />
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <h4>Filter by Tags</h4>
                  {tags.map((tag, index) => (
                    <label key={index} className="filter-tag">
                      <input
                        type="checkbox"
                        value={tag}
                        checked={selectedTags.includes(tag)}
                        onChange={() => handleTagSelection(tag)}
                      />
                      {tag}
                    </label>
                  ))}
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
                    {dataset.name || dataset.title}
                  </p>
                </div>
              ))
            ) : (
              <p>No datasets found.</p>
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
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Date:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Username:
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                URL:
                <input
                  type="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </label>
              <label>
                Tags:
                <div className="tags-container">
                  {tags.map((tag, index) => (
                    <label key={index}>
                      <input
                        type="checkbox"
                        value={tag}
                        checked={formData.tags.includes(tag)}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            tags: e.target.checked
                              ? [...prev.tags, tag]
                              : prev.tags.filter((t) => t !== tag)
                          }))
                        }
                      />
                      {tag}
                    </label>
                  ))}
                </div>
              </label>
              <label>
                Add New Tag:
                <input
                  type="text"
                  name="newTag"
                  value={formData.newTag}
                  onChange={handleInputChange}
                  placeholder="Add a new tag"
                />
              </label>
              <button type="submit">Submit</button>
              <button type="button" onClick={toggleModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dataset;