// JS version from my-flood-map-app/src/Components/AlertBanner.js
// You may want to convert this to TypeScript as needed
import '../styles/AlertBanner.css';

const AlertBanner = () => {
  return (
     <div className="alert-banner">
      <i className="fas fa-exclamation-triangle"></i>
      <strong>FLOOD WATCH ACTIVE:</strong> Heavy rainfall expected for the next 7 days. Multiple areas at HIGH risk.
    </div>
  );
};

export default AlertBanner;
