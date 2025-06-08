import { useRef, useState, useEffect } from 'react';
import '../styles/CommunicationPanel.css';
import { useSelector } from 'react-redux';
import { ChatService, type ChatMessage } from '../Services/chat.service';

interface UpdateMessage {
  UserSend: string;
  UserMessage: string;
}

function getCurrentTime(): string {
  return new Date().toLocaleTimeString();
}

function CommunicationPanel() {
  const messageInputRef = useRef<HTMLTextAreaElement>(null);
  interface RootState {
    userRole: {
      role: string;
    };
    officialId: {
      officialId: string;
    };
  }
  const currentUserRole = useSelector((state: RootState) => state.userRole.role);
  const officialId = useSelector((state: RootState) => state.officialId.officialId);
  const [updates, setUpdates] = useState<UpdateMessage[]>([]);

  useEffect(() => {
    // Fetch messages when component mounts
    fetchMessages();

    // Set up polling every 30 seconds
    const interval = setInterval(fetchMessages, 30000);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  const fetchMessages = async () => {
    try {
      const messages = await ChatService.fetchMessages();
      console.log('Fetched messages:', messages);
      setUpdates(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      showNotification('Failed to load messages', 'warning');
    }
  };

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

  async function handleSendMessage() {
    const message = messageInputRef.current?.value.trim();
    if (message) {
      const UserSend = officialId || 'Current User';
      const UserMessage = message;
      const newMessage: ChatMessage = {
        UserSend,
        UserMessage
      };

      try {
        await ChatService.sendMessage(newMessage);
        // Fetch latest messages after sending
        await fetchMessages();
        if (messageInputRef.current) messageInputRef.current.value = '';
        showNotification('Message sent successfully', 'success');
      } catch (error) {
        console.error('Error sending message:', error);
        showNotification('Failed to send message', 'warning');
      }
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="panel communication-panel">
      <h3><i className="fas fa-comments"></i>Inter-Agency Communication</h3>
      {currentUserRole !== 'PUBLIC' && (
        <>
          <textarea
            className="message-input"
            placeholder="Type urgent communication message..."
            rows={3}
            ref={messageInputRef}
            onKeyPress={handleKeyPress}
          ></textarea>
          <button
            className="action-btn btn-primary"
            onClick={handleSendMessage}
          >
            <i className="fas fa-paper-plane"></i>Send Message
          </button>
        </>
      )}
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
          {updates.length > 0 ? (
            updates.map((update, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: '10px',
                  paddingBottom: '10px',
                  borderBottom: idx < updates.length - 1 ? '1px solid #ddd' : undefined,
                }}
              >
                <strong>{update.UserSend}:</strong> {update.UserMessage}
                <div style={{ fontSize: '0.8em', color: '#666' }}>{getCurrentTime()}</div>
              </div>
            ))
          ) : (
            <div style={{ textAlign: 'center', color: '#666' }}>
              No messages yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommunicationPanel;