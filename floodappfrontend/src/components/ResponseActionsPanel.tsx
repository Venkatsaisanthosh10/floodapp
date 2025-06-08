import AlertModal from './sharedComponents/AlertComponent';
import '../styles/ResponseActionsPanel.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const ResponseActionsPanel: React.FC = () => {
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const navigate = useNavigate();

  const initiateEvacuation = () => {
    
      // addUpdateMessage('System', 'Evacuation procedures initiated. All field teams notified.');
      // showNotification('Evacuation initiated successfully', 'success');
      navigate('/evacuation-manager');
    
  };

  const deployResources = () => {
    addUpdateMessage('Resource Management', 'Emergency resources deployed to high-risk areas.');
    showNotification('Resources deployed', 'info');
    navigate('/resource-viewer');
  };

  const sendAlert = () => {
    setIsAlertModalOpen(true);
  };
  const updateStatus = () => {
    navigate('/resource-status');
  };

  const handleAlertSubmit = (alertMessage: string) => {
    addUpdateMessage('Public Alert System', `Alert sent: "${alertMessage}"`);
    showNotification('Public alert sent', 'warning');
  };

  return (
    <>
      <div className="panel">
        <h3><i className="fas fa-tasks"></i>Response Actions</h3>
        <div className="response-actions">
          <button className="action-btn btn-primary" onClick={initiateEvacuation}>
            <i className="fas fa-route"></i>Initiate Evacuation
          </button>
          <button className="action-btn btn-warning" onClick={deployResources}>
            <i className="fas fa-truck"></i>Deploy Resources
          </button>
          <button className="action-btn btn-success" onClick={sendAlert}>
            <i className="fas fa-bullhorn"></i>Send Public Alert
          </button>
          <button className="action-btn btn-primary" onClick={updateStatus}>
            <i className="fas fa-sync"></i>Update Status
          </button>
        </div>

        <h4 style={{margin: '20px 0 10px 0', color: '#2c3e50'}}>Population at Risk</h4>
        <div style={{textAlign: 'center', fontSize: '2em', color: '#e74c3c', fontWeight: 'bold'}}>
          25,000 people
        </div>
      </div>
      <AlertModal
        isOpen={isAlertModalOpen}
        onClose={() => setIsAlertModalOpen(false)}
        onSubmit={handleAlertSubmit}
      />
    </>
  );
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
  updatesFeed.insertBefore(newUpdate, updatesFeed.firstChild ? updatesFeed.firstChild : null);
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

export default ResponseActionsPanel;