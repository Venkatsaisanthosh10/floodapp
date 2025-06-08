// src/services/ChatService.ts

import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your real backend URL

export interface ChatMessage {
  sender: string;
  message: string;
  time: string;
}

export const ChatService = {
  sendMessage: async (chatMessage: ChatMessage) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/messages`, chatMessage, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error sending chat message:', error);
      throw error;
    }
  },

  // Optional: fetch previous messages
  fetchMessages: async (): Promise<ChatMessage[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/messages`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  }
};
