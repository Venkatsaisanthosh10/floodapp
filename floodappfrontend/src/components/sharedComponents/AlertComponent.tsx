import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import type { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LocationPicker } from './LocationPicker';
import './Styles/AlertComponent.css';
import { PublicAlertService } from '../../Services/publicalert.service';
interface AlertComponentProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

const AlertComponent: React.FC<AlertComponentProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    instructions: '',
  });
  const [position, setPosition] = useState<LatLngTuple>([12.9716, 77.5946]); // default to Bangalore
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const alertMessage = {
      ...formData,
      location: position,
      timestamp: new Date().toISOString()
    };

    const alertPayload = JSON.stringify(alertMessage);
    
    try {
        console.log('Alert Payload:', alertPayload);
        await PublicAlertService.createAlert(alertPayload);
        setSubmitted(true);
        onSubmit(alertPayload);
        onClose();
    } catch (error) {
        console.error('Failed to send alert:', error);
        //setError('Failed to send alert. Please try again.');
        setSubmitted(false);
    } finally {
        //setIsLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="alert-modal">
      <div className="alert-content">
        <h2 className="alert-title">🚨 Public Alert Form</h2>
        <form onSubmit={handleSubmit} className="alert-form">
          <input 
            type="text" 
            name="title" 
            placeholder="Alert Title" 
            required 
            onChange={handleChange}
            className="full-width"
          />

          <textarea 
            name="message" 
            placeholder="Alert Message" 
            required 
            onChange={handleChange}
            className="full-width"
          />
          
          <textarea 
            name="instructions" 
            placeholder="Instructions" 
            required 
            onChange={handleChange}
            className="full-width"
          />

          <div className="map-container-mini">
            <h4>📍 Select Location on Map:</h4>
            <MapContainer center={position} zoom={13} style={{ height: '400px' }}>
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationPicker setPosition={setPosition} />
              <Marker position={position} />
            </MapContainer>
          </div>

          <label className="checkbox-container">
            <input type="checkbox" required />
            <span>I confirm that the above information is correct.</span>
          </label>

          <div className="button-group">
            <button type="submit" className="submit-btn">Send Alert</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>

        {submitted && <p className="success-message">✅ Alert sent successfully!</p>}
      </div>
    </div>
  );
};

export default AlertComponent;