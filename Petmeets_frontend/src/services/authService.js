import api from '../api';

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/user', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);

    const { token, user } = response.data;

    // Armazene tudo no localStorage
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);

    return { user, token };
  } catch (error) {
    throw error;
  }
};


export const registerClientAndPet = async (clientData, petData) => {
  try {
    const response = await api.post('/clients/dashboard/register-client', {
      clientData,
      petData,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering client and pet:', error);
    throw error;
  }
};

export const getClientsAndPets = async () => {
  try {
    const response = await api.get('/clients/list');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};
