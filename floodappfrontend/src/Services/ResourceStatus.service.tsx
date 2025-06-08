// src/services/ResourceStatusService.ts

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Change this to match your backend

export interface StatusUpdate {
  id?: string; // optional when sending new data
  zone: string;
  resourceType: string;
  status: string;
  message: string;
  timestamp?: string;
}

export const ResourceStatusService = {
  createStatusUpdate: async (data: StatusUpdate) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/resource-status`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error sending status update:', error);
      throw error;
    }
  },

  getAllStatusUpdates: async (): Promise<StatusUpdate[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/resource-status`);
      return response.data; // expects backend to return an array
    } catch (error) {
      console.error('Error fetching status updates:', error);
      throw error;
    }
  },
};
