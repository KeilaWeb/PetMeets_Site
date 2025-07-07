import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

export const fetchClients = async () => {
  const response = await axios.get(`${API_BASE_URL}/clients`);
  return response.data;
};

export const updateClient = async (id, clientData) => {
  const response = await axios.put(`${API_BASE_URL}/clients/${id}`, clientData);
  return response.data;
};

// Repare que aqui recebe um objeto com clientData e pets
export const registerClientAndPet = async (clientData, pets) => {
  const response = await axios.post(`${API_BASE_URL}/clients`, {
    clientData,
    petData: pets,
  });
  return response.data;
};

export const deleteClient = async (id) => {
  await axios.delete(`${API_BASE_URL}/clients/${id}`);
};
