import { useRef, useState } from 'react';
import '../styles/CommunicationPanel.css';
import { useSelector } from 'react-redux';

interface UpdateMessage {
  sender: string;
  message: string;
  time: string;
}

function getCurrentTime(): string {
  return 'Just now';
}

function CommunicationPanel() {
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  interface RootState {
    userRole: {
      role: string;
    };
    // add other state slices if needed
  }
  const currentUserRole = useSelector((state: RootState) => state.userRole.role);
  const [updates, setUpdates] = useState<UpdateMessage[]>([
    {
      sender: 'Command Center',
      message: 'All teams in position. Evacuation routes cleared.',
      time: '2 minutes ago',
    },
    {
      sender: 'Field Team Alpha',
      message: 'Water level rising rapidly in Sector 7. Immediate evacuation recommended.',
      time: '5 minutes ago',
    },
    {
      sender: 'Weather Service',
      message: 'Rainfall intensity increased to 180mm/day. Updated forecast available.',
      time: '8 minutes ago',
    },
  ]);

  function showNotification(message: string, type: 'success' | 'warning' | 'info') {
    const notification = document.createElement('div');
    notification.className = `notification-${type}`;
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
  }

  function handleSendMessage() {
    const message = messageInputRef.current?.value.trim();
    if (message) {
      const sender = currentUserRole || 'Current User';
      setUpdates(prev => [
        { sender, message, time: getCurrentTime() },
        ...prev.slice(0, 9),
      ]);
      if (messageInputRef.current) messageInputRef.current.value = '';
      showNotification('Message sent', 'success');
    }
  }

  return (
    <div className="panel communication-panel">
      <h3><i className="fas fa-comments"></i>Inter-Agency Communication</h3>
      {currentUserRole!= 'PUBLIC' &&<>
      <textarea
        className="message-input"
        placeholder="Type urgent communication message..."
        rows={3}
        ref={messageInputRef}
      ></textarea>
      <button
        className="action-btn btn-primary"
        onClick={handleSendMessage}
      >
        <i className="fas fa-paper-plane"></i>Send Message
      </button>
      </> }
      <div style={{ marginTop: '20px' }}>
        <h4 style={{ color: '#2c3e50', marginBottom: '10px' }}>Recent Updates</h4>
        <div
          id="updates-feed"
          style={{
            maxHeight: '200px',
            overflowY: 'auto',
            background: '#f8f9fa',
            padding: '15px',
            borderRadius: '8px',
          }}
        >
          {updates.map((update, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: '10px',
                paddingBottom: '10px',
                borderBottom: idx < updates.length - 1 ? '1px solid #ddd' : undefined,
              }}
            >
              <strong>{update.sender}:</strong> {update.message}
              <div style={{ fontSize: '0.8em', color: '#666' }}>{update.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CommunicationPanel;