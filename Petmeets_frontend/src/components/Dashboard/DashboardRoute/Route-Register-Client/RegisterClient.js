import React, { useState, useEffect } from 'react';
import ClientForm from './ClientForm';
import PetForm from './PetForm';
import { updateClient, registerClientAndPet } from '../../../../services/clientService';
import { useNavigate } from 'react-router-dom';
import '../../../../styles/components/Dashboard/_formDashboard.sass';

const RegisterClient = ({ existingClient, onFinish }) => {
  const [step, setStep] = useState(1);
  const [clientData, setClientData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    endereco: {
      cidade: '',
      cep: '',
      rua: '',
      numero: ''
    }
  });
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (existingClient) {
      setClientData({
        nome: existingClient.nome || existingClient.clienteNome || '',
        cpf: existingClient.cpf || '',
        telefone: existingClient.telefone || '',
        email: existingClient.email || '',
        endereco: {
          cidade: existingClient.endereco?.cidade || '',
          cep: existingClient.endereco?.cep || '',
          rua: existingClient.endereco?.rua || '',
          numero: existingClient.endereco?.numero || ''
        }
      });

      setPets(existingClient.pets || []);
    }
  }, [existingClient]);

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleClientChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, endereco: { ...clientData.endereco, [name]: value } });
  };

  const addPet = (petData) => {
    setPets([...pets, petData]);
  };

  const removePet = (index) => {
    setPets(pets.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      if (existingClient) {
        await updateClient(existingClient.clientId, {
          ...clientData,
          pets
        });
      } else {
        await registerClientAndPet(clientData, pets);
      }

      if (onFinish) {
        onFinish();
      } else {
        navigate('/dashboard'); // fallback se onFinish não for passado
      }
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  switch (step) {
    case 1:
      return (
        <div className="register-client-container">
          <div className="white-box">
            <ClientForm
              clientData={clientData}
              handleClientChange={handleClientChange}
              handleAddressChange={handleAddressChange}
              nextStep={nextStep}
            />
          </div>
        </div>
      );

    case 2:
      return (
        <div className="register-client-container">
          <div className="white-box">
            <PetForm
              pets={pets}
              addPet={addPet}
              removePet={removePet}
              prevStep={prevStep}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      );

    default:
      return <div>Erro: Passo desconhecido.</div>;
  }
};

export default RegisterClient;
