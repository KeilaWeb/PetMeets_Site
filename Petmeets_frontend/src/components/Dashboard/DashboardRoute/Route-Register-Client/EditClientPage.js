// src/components/Dashboard/DashboardRoute/Route-Register-Client/EditClientPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RegisterClient from './RegisterClient';
import { fetchClients } from '../../../../services/clientService';

const EditClientPage = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadClient = async () => {
      try {
        const allClients = await fetchClients();
        const found = allClients.find(c => String(c.clientId) === id);
        if (found) {
          setClient(found);
        } else {
          console.error('Cliente não encontrado');
        }
      } catch (err) {
        console.error('Erro ao carregar cliente:', err);
      }
    };
    loadClient();
  }, [id]);

  if (!client) return <div>Carregando dados do cliente...</div>;

  return (
    <RegisterClient
      existingClient={client}
      onFinish={() => navigate('/clients')}
    />
  );
};

export default EditClientPage;
