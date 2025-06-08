import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5173/api';

export const PublicAlertService = {
    createAlert: async (alertData: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/publicalert`, alertData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error creating alert:', error);
            throw error;
        }
    }
};