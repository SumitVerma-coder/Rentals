import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/bookings";

const bookingService = {
  createBooking: async (bookingData, token) => {
    const response = await axios.post(`${API_URL}/create`, bookingData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  getUserBookings: async (userId, token) => {
    const response = await axios.get(`${API_URL}/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  cancelBooking: async (bookingId, token) => {
    const response = await axios.delete(`${API_URL}/cancel/${bookingId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default bookingService;
