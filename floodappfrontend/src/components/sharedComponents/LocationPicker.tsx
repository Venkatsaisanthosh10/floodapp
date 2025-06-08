import { useMapEvents } from 'react-leaflet';

interface LocationPickerProps {
  setPosition: (position: [number, number]) => void;
}

export const LocationPicker: React.FC<LocationPickerProps> = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};