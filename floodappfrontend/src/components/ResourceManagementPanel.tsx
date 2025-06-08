import React from 'react';
import '../styles/ResourceManagementPanel.css';

const ResourceManagementPanel: React.FC = () => {
  return (
    <div className="panel">
      <h3>
        <i className="fas fa-boxes"></i>
        Resource Management
      </h3>
      <div className="resources-grid">
        <div className="resource-card">
          <div className="resource-number">15</div>
          <div>Emergency Shelters</div>
          <small>Capacity: 5,000</small>
        </div>
        <div className="resource-card">
          <div className="resource-number">8</div>
          <div>Rescue Teams</div>
          <small>Active: 6</small>
        </div>
        <div className="resource-card">
          <div className="resource-number">12</div>
          <div>Emergency Vehicles</div>
          <small>Available: 10</small>
        </div>
        <div className="resource-card">
          <div className="resource-number">95%</div>
          <div>Medical Supplies</div>
          <small>Well Stocked</small>
        </div>
      </div>
    </div>
  );
};

export default ResourceManagementPanel;