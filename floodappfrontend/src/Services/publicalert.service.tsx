import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // adjust this to your API endpoint

export const PublicAlertService = {
    createAlert: async (alertData: string) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/alerts`, alertData, {
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