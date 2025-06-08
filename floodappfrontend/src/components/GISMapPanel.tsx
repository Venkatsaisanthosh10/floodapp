import React, { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { Map as LeafletMap } from 'leaflet';
import '../styles/GISMapPanel.css';
import { useFloodData, type Infrastructure } from '../Services/mapservices.service';

// Use the Infrastructure type from the service
type InfrastructureItem = Infrastructure;

const addCriticalInfrastructure = (
  mapInstance: LeafletMap,
  infrastructureData: InfrastructureItem[] | InfrastructureItem
) => {
  // Convert to array if it's not already an array
  const kvArray = Object.entries(infrastructureData).map(([key, value]) => ({ key, value }));
  // console.log(`hi Array.isArray(kvArray): ${kvArray}`);
  // console.log('Infrastructure Data(object):', infrastructureData);
  // const valuesArray = Object.values(infrastructureData);
  // console.log(valuesArray);
  // const dataArray = Array.isArray(infrastructureData) ? infrastructureData : [infrastructureData];
  const dataArray = Array.isArray(infrastructureData)
    ? infrastructureData
    : kvArray.map((item) => item.value);
  console.log('Infrastructure Data:', dataArray);
  const hospitals = dataArray
    .filter((item) => item.type === 'hospital')
    .map((item) => ({
      lat: item.location.latitude,
      lng: item.location.longitude,
      name: item.name,
    }));
  console.log('Hospitals:', hospitals); 
  const evacuationCenters = dataArray
    .filter((item) => item.type === 'evacuation_center')
    .map((item) => ({
      lat: item.location.latitude,
      lng: item.location.longitude,
      name: item.name,
    }));
  console.log('Evacuation Centers:', evacuationCenters);
  hospitals.forEach(({ lat, lng, name }) => {
    L.marker([lat, lng], {
      icon: L.divIcon({
        html: '<i class="fas fa-hospital" style="color: #e74c3c; font-size: 20px;"></i>',
        iconSize: [30, 30],
        className: 'custom-marker',
      }),
    })
      .addTo(mapInstance)
      .bindPopup(name);
  });

  evacuationCenters.forEach(({ lat, lng, name }) => {
    L.marker([lat, lng], {
      icon: L.divIcon({
        html: '<i class="fas fa-home" style="color: #2ecc71; font-size: 20px;"></i>',
        iconSize: [30, 30],
        className: 'custom-marker',
      }),
    })
      .addTo(mapInstance)
      .bindPopup(name);
  });
};

const GISMapPanel: React.FC = () => {
  const { data: infrastructureData, isLoading } = useFloodData();
  console.log('Infrastructure Data(UseEffect):', infrastructureData);
  useEffect(() => {
    if (isLoading || !infrastructureData) return;

    let map: LeafletMap | undefined;
    const mapElement = document.getElementById('map');
    if (
      mapElement &&
      !(mapElement as HTMLElement & { _leaflet_id?: number })._leaflet_id
    ) {
      map = L.map('map').setView([16.5062, 80.648], 11);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(map);

      // Add zones...
      const highRiskZones: [number, number][][] = [
        [
          [16.52, 80.63],
          [16.53, 80.64],
          [16.52, 80.65],
          [16.51, 80.64],
        ],
        [
          [16.49, 80.66],
          [16.5, 80.67],
          [16.49, 80.68],
          [16.48, 80.67],
        ],
      ];
      const mediumRiskZones: [number, number][][] = [
        [
          [16.48, 80.62],
          [16.49, 80.63],
          [16.48, 80.64],
          [16.47, 80.63],
        ],
        [
          [16.54, 80.65],
          [16.55, 80.66],
          [16.54, 80.67],
          [16.53, 80.66],
        ],
      ];
      const lowRiskZones: [number, number][][] = [
        [
          [16.46, 80.61],
          [16.47, 80.62],
          [16.46, 80.63],
          [16.45, 80.62],
        ],
        [
          [16.56, 80.64],
          [16.57, 80.65],
          [16.56, 80.66],
          [16.55, 80.65],
        ],
      ];

      highRiskZones.forEach((zone) => {
        L.polygon(zone, {
          color: '#ff4444',
          fillColor: '#ff4444',
          fillOpacity: 0.4,
        })
          .addTo(map!)
          .bindPopup('High Risk Zone - Immediate evacuation may be required');
      });
      mediumRiskZones.forEach((zone) => {
        L.polygon(zone, {
          color: '#ffaa00',
          fillColor: '#ffaa00',
          fillOpacity: 0.4,
        })
          .addTo(map!)
          .bindPopup('Medium Risk Zone - Monitor closely');
      });
      lowRiskZones.forEach((zone) => {
        L.polygon(zone, {
          color: '#44ff44',
          fillColor: '#44ff44',
          fillOpacity: 0.4,
        })
          .addTo(map!)
          .bindPopup('Low Risk Zone - Standard precautions');
      });

      // 👇 Safely use the fetched data here
      addCriticalInfrastructure(map, infrastructureData);
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [infrastructureData, isLoading]);

  return (
    <div className="panel">
      <h3>
        <i className="fas fa-map"></i>Geographic Information System
      </h3>
      <div className="map-container">
        <div id="map" style={{ height: '550px', width: '100%' }}></div>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#ff4444' }}></div>
            <span>High Risk</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#ffaa00' }}></div>
            <span>Medium Risk</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#44ff44' }}></div>
            <span>Low Risk</span>
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ background: '#4444ff' }}></div>
            <span>Water Bodies</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GISMapPanel;
