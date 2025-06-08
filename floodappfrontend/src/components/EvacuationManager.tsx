import React, { useState } from 'react';
import '../styles/EvacuationManager.css';

interface Zone {
  id: string;
  name: string;
  riskLevel: 'High' | 'Medium' | 'Low';
  population: number;
  assignedResources: Resource[];
}

interface Resource {
  id: string;
  type: 'Vehicle' | 'Team' | 'Shelter';
  name: string;
  capacity: number;
  available: boolean;
}

const EvacuationManager: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>([
    {
      id: 'z1',
      name: 'Downtown District',
      riskLevel: 'High',
      population: 5000,
      assignedResources: []
    },
    {
      id: 'z2',
      name: 'Riverside Area',
      riskLevel: 'Medium',
      population: 3000,
      assignedResources: []
    },
    {
      id: 'z3',
      name: 'Eastern Suburb',
      riskLevel: 'Low',
      population: 2000,
      assignedResources: []
    }
  ]);

  const [availableResources, setAvailableResources] = useState<Resource[]>([
    { id: 'v1', type: 'Vehicle', name: 'Emergency Bus 1', capacity: 50, available: true },
    { id: 'v2', type: 'Vehicle', name: 'Emergency Bus 2', capacity: 50, available: true },
    { id: 't1', type: 'Team', name: 'Rescue Team Alpha', capacity: 10, available: true },
    { id: 't2', type: 'Team', name: 'Medical Team Beta', capacity: 15, available: true },
    { id: 's1', type: 'Shelter', name: 'Community Center', capacity: 200, available: true },
    { id: 's2', type: 'Shelter', name: 'School Gymnasium', capacity: 150, available: true }
  ]);

  const [selectedZone, setSelectedZone] = useState<string>('');
  const [selectedResources, setSelectedResources] = useState<string[]>([]);

  const handleZoneSelect = (zoneId: string) => {
    setSelectedZone(zoneId);
    setSelectedResources([]);
  };

  const handleResourceSelect = (resourceId: string) => {
    if (selectedResources.includes(resourceId)) {
      setSelectedResources(prev => prev.filter(id => id !== resourceId));
    } else {
      setSelectedResources(prev => [...prev, resourceId]);
    }
  };

  const assignResources = () => {
    if (!selectedZone || selectedResources.length === 0) return;

    const updatedZones = zones.map(zone => {
      if (zone.id === selectedZone) {
        const newResources = availableResources
          .filter(resource => selectedResources.includes(resource.id))
          .map(resource => ({ ...resource, available: false }));
        
        return {
          ...zone,
          assignedResources: [...zone.assignedResources, ...newResources]
        };
      }
      return zone;
    });

    const updatedResources = availableResources.map(resource => {
      if (selectedResources.includes(resource.id)) {
        return { ...resource, available: false };
      }
      return resource;
    });

    setZones(updatedZones);
    setAvailableResources(updatedResources);
    setSelectedResources([]);
  };

  const unassignResource = (zoneId: string, resourceId: string) => {
    const updatedZones = zones.map(zone => {
      if (zone.id === zoneId) {
        return {
          ...zone,
          assignedResources: zone.assignedResources.filter(r => r.id !== resourceId)
        };
      }
      return zone;
    });

    const updatedResources = availableResources.map(resource => {
      if (resource.id === resourceId) {
        return { ...resource, available: true };
      }
      return resource;
    });

    setZones(updatedZones);
    setAvailableResources(updatedResources);
  };

  return (
    <div className="evacuation-manager">
      <h1>Evacuation Management</h1>
      
      <div className="evacuation-container">
        <div className="zones-section">
          <h2>Evacuation Zones</h2>
          <div className="zones-list">
            {zones.map(zone => (
              <div
                key={zone.id}
                className={`zone-card ${selectedZone === zone.id ? 'selected' : ''}`}
                onClick={() => handleZoneSelect(zone.id)}
              >
                <h3>{zone.name}</h3>
                <p className={`risk-level ${zone.riskLevel.toLowerCase()}`}>
                  Risk Level: {zone.riskLevel}
                </p>
                <p>Population: {zone.population}</p>
                <div className="assigned-resources">
                  <h4>Assigned Resources:</h4>
                  {zone.assignedResources.map(resource => (
                    <div key={resource.id} className="assigned-resource">
                      <span>{resource.name}</span>
                      <button
                        className="unassign-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          unassignResource(zone.id, resource.id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="resources-section">
          <h2>Available Resources</h2>
          <div className="resources-list">
            {availableResources.filter(r => r.available).map(resource => (
              <div
                key={resource.id}
                className={`resource-card ${selectedResources.includes(resource.id) ? 'selected' : ''}`}
                onClick={() => handleResourceSelect(resource.id)}
              >
                <h3>{resource.name}</h3>
                <p>Type: {resource.type}</p>
                <p>Capacity: {resource.capacity}</p>
              </div>
            ))}
          </div>
          <button
            className="assign-button"
            disabled={!selectedZone || selectedResources.length === 0}
            onClick={assignResources}
          >
            Assign Selected Resources
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvacuationManager;
