import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/properties";

const propertyService = {
  getAllProperties: async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  },

  getPropertyById: async (propertyId) => {
    const response = await axios.get(`${API_URL}/${propertyId}`);
    return response.data;
  },

  createProperty: async (propertyData, token) => {
    const response = await axios.post(`${API_URL}/create`, propertyData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  updateProperty: async (propertyId, propertyData, token) => {
    const response = await axios.put(`${API_URL}/update/${propertyId}`, propertyData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },

  deleteProperty: async (propertyId, token) => {
    const response = await axios.delete(`${API_URL}/delete/${propertyId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  },
};

export default propertyService;
