import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchClients } from '../../../../services/clientService';
import '../../../../styles/components/Dashboard/_clientProfile.sass';

const ClientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const loadClient = async () => {
      try {
        const allClients = await fetchClients();
        const found = allClients.find(c => String(c.clientId) === id);
        setClient(found || null);
      } catch (err) {
        console.error('Erro ao carregar cliente:', err);
      }
    };

    loadClient();
  }, [id]);

  if (!client) return <div className="client-profile">Carregando dados do cliente...</div>;

  const endereco = client.endereco || {};
  const rua = endereco.rua || client.endereco;
  const numero = endereco.numero || client.numero;
  const cidade = endereco.cidade || client.cidade;
  const cep = endereco.cep || client.cep;

  return (
    <div className="client-profile">
      <h2>Perfil do Cliente</h2>

      <div className="card">
        <h3>Informações Pessoais</h3>
        <p><strong>Nome:</strong> {client.nome || client.clienteNome}</p>
        <p><strong>CPF:</strong> {client.cpf || 'Não informado'}</p>
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Telefone:</strong> {client.telefone}</p>
        <p><strong>Endereço:</strong> {rua}, nº {numero} - {cidade} - CEP: {cep}</p>
      </div>

      <div className="card">
        <h3>Pets Cadastrados</h3>
        {client.pets && client.pets.length > 0 ? (
          client.pets.map((pet, idx) => (
            <div key={idx} className="pet-info">
              <p><strong>Nome:</strong> {pet.nomePet}</p>
              <p><strong>Tipo:</strong> {pet.tipo || '-'}</p>
              <p><strong>Raça:</strong> {pet.raca || '-'}</p>
              <p><strong>Idade:</strong> {pet.idade || '-'}</p>
              <p><strong>Porte:</strong> {pet.porte || '-'}</p>
              <p><strong>Cor:</strong> {pet.cor || '-'}</p>
              <p><strong>Aniversário:</strong> {pet.aniversario ? new Date(pet.aniversario).toLocaleDateString() : '-'}</p>
              <p><strong>Observações:</strong> {pet.observacoes || '-'}</p>
              <hr />
            </div>
          ))
        ) : (
          <p>Nenhum pet cadastrado.</p>
        )}
      </div>

      <button className="button-back" onClick={() => navigate(-1)}>Voltar</button>
    </div>
  );
};

export default ClientProfile;
