import React, { useEffect, useState } from 'react';
import '../styles/RiskAssessmentPanel.css';

function getRandomChange(): number {
  return Math.floor(Math.random() * 3) - 1; // -1, 0, or 1
}

function getRandomRainfall(current: number): number {
  return Math.max(0, Math.round(current + (Math.random() * 20 - 10)));
}

interface RiskZones {
  high: number;
  medium: number;
  low: number;
}

interface Visualization {
  id: number;
  title: string;
  data: number[];
  type: 'bar' | 'line';
}

const RiskAssessmentPanel: React.FC = () => {
  const [riskZones, setRiskZones] = useState<RiskZones>({
    high: 12,
    medium: 8,
    low: 15,
  });
  const [rainfall, setRainfall] = useState(150);
  const [currentVisIndex, setCurrentVisIndex] = useState(0);
  const wind = 46;

  const visualizations: Visualization[] = [
    {
      id: 1,
      title: 'Risk Zones Trend',
      data: [riskZones.high, riskZones.medium, riskZones.low],
      type: 'bar'
    },
    {
      id: 2,
      title: 'Rainfall History',
      data: Array(7).fill(0).map(() => Math.floor(Math.random() * 200)),
      type: 'line'
    },
    {
      id: 3,
      title: 'Wind Speed Variation',
      data: Array(5).fill(0).map(() => Math.floor(Math.random() * 60 + 20)),
      type: 'line'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRiskZones(prev => ({
        high: Math.max(0, prev.high + getRandomChange()),
        medium: Math.max(0, prev.medium + getRandomChange()),
        low: Math.max(0, prev.low + getRandomChange()),
      }));
      setRainfall(prev => getRandomRainfall(prev));
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevVis = () => {
    setCurrentVisIndex(prev => 
      prev === 0 ? visualizations.length - 1 : prev - 1
    );
  };

  const handleNextVis = () => {
    setCurrentVisIndex(prev => 
      prev === visualizations.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="panel">
      <h3><i className="fas fa-chart-line"></i>Risk Assessment</h3>
      <div className="risk-levels">
        <div className="risk-item risk-high">
          <span>High Risk Zones</span>
          <strong>{riskZones.high} Areas</strong>
        </div>
        <div className="risk-item risk-medium">
          <span>Medium Risk Zones</span>
          <strong>{riskZones.medium} Areas</strong>
        </div>
        <div className="risk-item risk-low">
          <span>Low Risk Zones</span>
          <strong>{riskZones.low} Areas</strong>
        </div>
      </div>
      <h4 style={{margin: '20px 0 10px 0', color: '#2c3e50'}}>Weather Forecast</h4>
      <div className="weather-data">
        <div className="weather-item">
          <i className="fas fa-cloud-rain"></i>
          <div>Rainfall</div>
          <strong>{rainfall}mm/day</strong>
        </div>
        <div className="weather-item">
          <i className="fas fa-wind"></i>
          <div>Wind Speed</div>
          <strong>{wind} km/h</strong>
        </div>
      </div>
      
      <div className="visualization-slider">
        <h4>{visualizations[currentVisIndex].title}</h4>
        <div className="visualization-container">
          <button onClick={handlePrevVis} className="slider-button">
            <i className="fas fa-chevron-left"></i>
          </button>
          <div className="visualization-content">
            <div className="visualization-chart" style={{ height: '150px' }}>
              {visualizations[currentVisIndex].type === 'bar' ? (
                <div className="bar-chart">
                  {visualizations[currentVisIndex].data.map((value, index) => (
                    <div 
                      key={index}
                      className="bar"
                      style={{ height: `${value}%` }}
                      title={`Value: ${value}`}
                    />
                  ))}
                </div>
              ) : (
                <div className="line-chart">
                  {visualizations[currentVisIndex].data.map((value, index) => (
                    <div 
                      key={index}
                      className="point"
                      style={{ 
                        left: `${(index / (visualizations[currentVisIndex].data.length - 1)) * 100}%`,
                        bottom: `${value / 2}%`
                      }}
                      title={`Value: ${value}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <button onClick={handleNextVis} className="slider-button">
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
        <div className="visualization-dots">
          {visualizations.map((vis, index) => (
            <span 
              key={vis.id}
              className={`dot ${index === currentVisIndex ? 'active' : ''}`}
              onClick={() => setCurrentVisIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RiskAssessmentPanel;
