import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ResourceStatusUpdates.css';

interface StatusUpdate {
  id: string;
  zone: string;
  resourceType: string;
  status: string;
  timestamp: string;
  message: string;
}

const ResourceStatusUpdates: React.FC = () => {  const navigate = useNavigate();
  const [statusUpdates, setStatusUpdates] = useState<StatusUpdate[]>([]);
  const [newUpdate, setNewUpdate] = useState({
    zone: '',
    resourceType: '',
    status: '',
    message: ''
  });

  // Simulated initial data
  useEffect(() => {
    const initialUpdates: StatusUpdate[] = [
      {
        id: '1',
        zone: 'Zone A',
        resourceType: 'Emergency Vehicles',
        status: 'Active',
        timestamp: '2025-06-07 09:00',
        message: 'All emergency vehicles deployed and operational'
      },
      {
        id: '2',
        zone: 'Zone B',
        resourceType: 'Medical Supplies',
        status: 'Limited',
        timestamp: '2025-06-07 08:30',
        message: 'Medical supplies running low, replenishment needed'
      }
    ];
    setStatusUpdates(initialUpdates);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewUpdate(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newStatusUpdate: StatusUpdate = {
      id: Date.now().toString(),
      ...newUpdate,
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    setStatusUpdates(prev => [newStatusUpdate, ...prev]);
    
    // Add the update to the updates feed
    const message = `${newUpdate.resourceType} in ${newUpdate.zone} - Status: ${newUpdate.status}`;
    addUpdateMessage('Resource Status', `${message}. ${newUpdate.message}`);
    showNotification('Status updated successfully', 'success');

    // Reset form
    setNewUpdate({
      zone: '',
      resourceType: '',
      status: '',
      message: ''
    });
  };

  const addUpdateMessage = (sender: string, message: string) => {
    const updatesFeed = document.getElementById('updates-feed');
    if (!updatesFeed) return;
    
    const newUpdate = document.createElement('div');
    newUpdate.style.marginBottom = '10px';
    newUpdate.style.paddingBottom = '10px';
    newUpdate.style.borderBottom = '1px solid #ddd';
    newUpdate.innerHTML = `
      <strong>${sender}:</strong> ${message}
      <div style="font-size: 0.8em; color: #666;">Just now</div>
    `;
    updatesFeed.insertBefore(newUpdate, updatesFeed.firstChild);
    
    while (updatesFeed.children.length > 10) {
      if (updatesFeed.lastChild) {
        updatesFeed.removeChild(updatesFeed.lastChild);
      }
    }
  };

  const showNotification = (message: string, type: 'success' | 'warning' | 'info') => {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
      background: ${type === 'success' ? '#2ecc71' : type === 'warning' ? '#f39c12' : '#3498db'};
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-in';
      setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
  };

  return (
    <div className="resource-status-updates">
      <div className="header-container">
        <h1>Resource Status Updates</h1>
        <button className="main-nav-btn" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> Back
        </button>
      </div>

      <form onSubmit={handleSubmit} className="update-form">
        <h3>Add New Status Update</h3>
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="zone">Zone</label>
            <select
              id="zone"
              name="zone"
              value={newUpdate.zone}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Zone</option>
              <option value="Zone A">Zone A</option>
              <option value="Zone B">Zone B</option>
              <option value="Zone C">Zone C</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="resourceType">Resource Type</label>
            <select
              id="resourceType"
              name="resourceType"
              value={newUpdate.resourceType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Resource Type</option>
              <option value="Emergency Vehicles">Emergency Vehicles</option>
              <option value="Medical Supplies">Medical Supplies</option>
              <option value="Rescue Teams">Rescue Teams</option>
              <option value="Emergency Shelters">Emergency Shelters</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={newUpdate.status}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Status</option>
              <option value="Active">Active</option>
              <option value="Limited">Limited</option>
              <option value="Critical">Critical</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message">Status Message</label>
          <textarea
            id="message"
            name="message"
            value={newUpdate.message}
            onChange={handleInputChange}
            required
            placeholder="Enter detailed status update message..."
            rows={3}
          />
        </div>

        <button type="submit" className="submit-btn">
          <i className="fas fa-plus"></i> Add Status Update
        </button>
      </form>

      <div className="updates-list">
        <h3>Previous Updates</h3>
        {statusUpdates.map(update => (
          <div key={update.id} className="update-card">
            <div className="update-header">
              <span className={`status-badge ${update.status.toLowerCase()}`}>
                {update.status}
              </span>
              <span className="timestamp">{update.timestamp}</span>
            </div>            <h4>{update.zone} - {update.resourceType}</h4>
            <p>{update.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceStatusUpdates;
