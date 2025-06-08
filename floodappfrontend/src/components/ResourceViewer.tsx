import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ResourceViewer.css';

interface AddingState {
  shelter: boolean;
  team: boolean;
  vehicle: boolean;
  supply: boolean;
}

const ResourceViewer: React.FC = () => {
  const navigate = useNavigate();
  
  const [shelters, setShelters] = useState([
    { name: 'Shelter A', capacity: 100, address: '123 Main St' },
    { name: 'Shelter B', capacity: 50, address: '456 Oak Ave' },
  ]);

  const [teams, setTeams] = useState([
    { name: 'Team Alpha', members: ['John', 'Alice'] },
    { name: 'Team Bravo', members: ['Tom', 'Jerry'] },
  ]);

  const [vehicles, setVehicles] = useState([
    { id: 'V001', type: 'Ambulance', capacity: 4 },
    { id: 'V002', type: 'Truck', capacity: 10 },
  ]);

  const [isAdding, setIsAdding] = useState<AddingState>({
    shelter: false,
    team: false,
    vehicle: false,
    supply: false
  });

  const [newShelter, setNewShelter] = useState({ name: '', capacity: '', address: '' });
  const [newTeam, setNewTeam] = useState({ name: '', members: '' });
  const [newVehicle, setNewVehicle] = useState({ id: '', type: '', capacity: '' });
  const [newSupply, setNewSupply] = useState({ name: '', quantity: '' });

  const [supplies, setSupplies] = useState([
    { name: 'Bandages', quantity: 100 },
    { name: 'Painkillers', quantity: 200 },
  ]);
  const removeItem = (index: number, type: string) => {
    if (type === 'shelter') setShelters(s => s.filter((_, i) => i !== index));
    if (type === 'team') setTeams(t => t.filter((_, i) => i !== index));
    if (type === 'vehicle') setVehicles(v => v.filter((_, i) => i !== index));
    if (type === 'supply') setSupplies(s => s.filter((_, i) => i !== index));
  };

  const handleAdd = (type: keyof AddingState) => {
    setIsAdding(prev => ({ ...prev, [type]: true }));
  };

  const handleCancel = (type: keyof AddingState) => {
    setIsAdding(prev => ({ ...prev, [type]: false }));
    if (type === 'shelter') setNewShelter({ name: '', capacity: '', address: '' });
    if (type === 'team') setNewTeam({ name: '', members: '' });
    if (type === 'vehicle') setNewVehicle({ id: '', type: '', capacity: '' });
    if (type === 'supply') setNewSupply({ name: '', quantity: '' });
  };

  const handleDone = (type: keyof AddingState) => {
    if (type === 'shelter' && newShelter.name && newShelter.capacity && newShelter.address) {
      setShelters(prev => [...prev, { 
        name: newShelter.name, 
        capacity: parseInt(newShelter.capacity),
        address: newShelter.address 
      }]);
      setNewShelter({ name: '', capacity: '', address: '' });
      navigate('/');
    }
    if (type === 'team' && newTeam.name && newTeam.members) {
      setTeams(prev => [...prev, { name: newTeam.name, members: newTeam.members.split(',').map(m => m.trim()) }]);
      setNewTeam({ name: '', members: '' });
      navigate('/');
    }
    if (type === 'vehicle' && newVehicle.id && newVehicle.type && newVehicle.capacity) {
      setVehicles(prev => [...prev, { 
        id: newVehicle.id, 
        type: newVehicle.type, 
        capacity: parseInt(newVehicle.capacity) 
      }]);
      setNewVehicle({ id: '', type: '', capacity: '' });
      navigate('/');
    }
    if (type === 'supply' && newSupply.name && newSupply.quantity) {
      setSupplies(prev => [...prev, { 
        name: newSupply.name, 
        quantity: parseInt(newSupply.quantity) 
      }]);
      setNewSupply({ name: '', quantity: '' });
      navigate('/');
    }
    setIsAdding(prev => ({ ...prev, [type]: false }));
  };
  const navigateToMain = () => {
    navigate('/main');
  };

  return (
    <div className="resource-viewer">
      <div className="header-container">
        <h1>Emergency Resources Viewer</h1>
        <button className="main-nav-btn" onClick={navigateToMain}>
          Main Page
        </button>
      </div>

      <div className="section">
        <h2>
          Emergency Shelters
          <button className="add-btn" onClick={() => handleAdd('shelter')}>Add Shelter</button>
        </h2>
        {isAdding.shelter && (
          <div className="add-form">
            <input
              type="text"
              placeholder="Shelter Name"
              value={newShelter.name}
              onChange={e => setNewShelter(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Capacity"
              value={newShelter.capacity}
              onChange={e => setNewShelter(prev => ({ ...prev, capacity: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Address"
              value={newShelter.address}
              onChange={e => setNewShelter(prev => ({ ...prev, address: e.target.value }))}
            />
            <div className="form-buttons">
              <button className="cancel-btn" onClick={() => handleCancel('shelter')}>Cancel</button>
              <button className="done-btn" onClick={() => handleDone('shelter')}>Done</button>
            </div>
          </div>
        )}        {shelters.map((shelter, idx) => (
          <div key={idx} className="card">
            <div className="shelter-info">
              <p><strong>{shelter.name}</strong></p>
              <p className="capacity">Capacity: {shelter.capacity}</p>
              <p className="address">{shelter.address}</p>
            </div>
            <button className="delete-btn" onClick={() => removeItem(idx, 'shelter')}>Delete</button>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>
          Rescue Teams
          <button className="add-btn" onClick={() => handleAdd('team')}>Add Team</button>
        </h2>
        {isAdding.team && (
          <div className="add-form">
            <input
              type="text"
              placeholder="Team Name"
              value={newTeam.name}
              onChange={e => setNewTeam(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Team Members (comma-separated)"
              value={newTeam.members}
              onChange={e => setNewTeam(prev => ({ ...prev, members: e.target.value }))}
            />
            <div className="form-buttons">
              <button className="cancel-btn" onClick={() => handleCancel('team')}>Cancel</button>
              <button className="done-btn" onClick={() => handleDone('team')}>Done</button>
            </div>
          </div>
        )}
        {teams.map((team, idx) => (
          <div key={idx} className="card">
            <p><strong>{team.name}</strong></p>
            <p>Members: {team.members.join(', ')}</p>
            <button className="delete-btn" onClick={() => removeItem(idx, 'team')}>Delete</button>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>
          Vehicles
          <button className="add-btn" onClick={() => handleAdd('vehicle')}>Add Vehicle</button>
        </h2>
        {isAdding.vehicle && (
          <div className="add-form">
            <input
              type="text"
              placeholder="Vehicle ID"
              value={newVehicle.id}
              onChange={e => setNewVehicle(prev => ({ ...prev, id: e.target.value }))}
            />
            <input
              type="text"
              placeholder="Vehicle Type"
              value={newVehicle.type}
              onChange={e => setNewVehicle(prev => ({ ...prev, type: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Capacity"
              value={newVehicle.capacity}
              onChange={e => setNewVehicle(prev => ({ ...prev, capacity: e.target.value }))}
            />
            <div className="form-buttons">
              <button className="cancel-btn" onClick={() => handleCancel('vehicle')}>Cancel</button>
              <button className="done-btn" onClick={() => handleDone('vehicle')}>Done</button>
            </div>
          </div>
        )}
        {vehicles.map((vehicle, idx) => (
          <div key={idx} className="card">
            <p><strong>ID:</strong> {vehicle.id} - {vehicle.type}</p>
            <p>Capacity: {vehicle.capacity}</p>
            <button className="delete-btn" onClick={() => removeItem(idx, 'vehicle')}>Delete</button>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>
          Medical Supplies
          <button className="add-btn" onClick={() => handleAdd('supply')}>Add Supply</button>
        </h2>
        {isAdding.supply && (
          <div className="add-form">
            <input
              type="text"
              placeholder="Supply Name"
              value={newSupply.name}
              onChange={e => setNewSupply(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={newSupply.quantity}
              onChange={e => setNewSupply(prev => ({ ...prev, quantity: e.target.value }))}
            />
            <div className="form-buttons">
              <button className="cancel-btn" onClick={() => handleCancel('supply')}>Cancel</button>
              <button className="done-btn" onClick={() => handleDone('supply')}>Done</button>
            </div>
          </div>
        )}
        {supplies.map((supply, idx) => (
          <div key={idx} className="card">
            <p><strong>{supply.name}</strong> - Quantity: {supply.quantity}</p>
            <button className="delete-btn" onClick={() => removeItem(idx, 'supply')}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceViewer;
