import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';



export interface Infrastructure {
  _id: {
    $oid: string;
  };
  type: 'hospital' | 'evacuation_center';
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

const API_BASE_URL = 'http://127.0.0.1:5173/api';

const mockData: Infrastructure[] = [
  {
    _id: { $oid: '1' },
    type: 'hospital',
    name: 'City General Hospital',
    location: {
      latitude: 16.5062,
      longitude: 80.648,
    },
  },
  {
    _id: { $oid: '2' },
    type: 'evacuation_center',
    name: 'Community Center',
    location: {
      latitude: 16.52,
      longitude: 80.63,
    },
  },
];

export const useFloodData = (): UseQueryResult<Infrastructure[]> => {
  return useQuery({
    queryKey: ['infrastructure'],
    queryFn: async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/flooddata`);
        console.log('Fetched flood data:', response.data);
        // Ensure we always return an array
        return response.data;
      } catch (error) {
        console.error('Error fetching flood data:', error);
        // Return mock data if API fails
        return mockData;
      }
    },
    refetchInterval: 300000,
    staleTime: 60000,
  });
};