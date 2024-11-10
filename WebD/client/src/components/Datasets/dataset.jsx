import React from 'react';
import './dataset.css';
import { FiUpload, FiSearch, FiFilter } from 'react-icons/fi';

function Dataset() {
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
          <button className="upload-button">
            <FiUpload size={24} /> Upload file
          </button>
        </div>

        <div className="search-section">
          <h3>Search Datasets</h3>
          <div className="search-bar">
            <FiSearch size={24} />
            <input type="text" placeholder="Search..." />
            <FiFilter size={24} />
          </div>

          <div className="datasets">
            <div className="dataset-card">
              <p>Surya Ashish</p>
              <p>Date: 3/11/2024</p>
              <p>This is a sample dataset: oingalevaz.en</p>
            </div>
            <div className="dataset-card">
              <p>Surya Ashish</p>
              <p>Date: 3/11/2024</p>
              <p>This is a sample dataset: oingalevaz.en</p>
            </div><div className="dataset-card">
              <p>Surya Ashish</p>
              <p>Date: 3/11/2024</p>
              <p>This is a sample dataset: oingalevaz.en</p>
            </div><div className="dataset-card">
              <p>Surya Ashish</p>
              <p>Date: 3/11/2024</p>
              <p>This is a sample dataset: oingalevaz.en</p>
            </div><div className="dataset-card">
              <p>Surya Ashish</p>
              <p>Date: 3/11/2024</p>
              <p>This is a sample dataset: oingalevaz.en</p>
            </div><div className="dataset-card">
              <p>Surya Ashish</p>
              <p>Date: 3/11/2024</p>
              <p>This is a sample dataset: oingalevaz.en</p>
            </div>
            {/* Add more dataset cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dataset;
