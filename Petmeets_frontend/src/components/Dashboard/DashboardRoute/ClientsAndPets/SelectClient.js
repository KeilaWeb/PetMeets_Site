import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchClients, deleteClient } from '../../../../services/clientService';

const SelectCliente = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);

  const handleDelete = (idToDelete) => {
    setClients(prevClients => prevClients.filter(c => c.clientId !== idToDelete));
  };

  const loadClients = async () => {
    try {
      const data = await fetchClients();
      setClients(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    loadClients();
  }, []);

  return (
    <div className="conteudo">
      <div className="tabela-cliente">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Qtd Pets</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c, index) => (
              <tr key={index}>
                <td>{c.nome || c.clienteNome}</td>
                <td>{c.email}</td>
                <td>{c.telefone}</td>
                <td>{c.pets?.length || 0}</td>
                <td>
                  <button className="editar-cliente" onClick={() => navigate(`/edit-client/${c.clientId}`)}>
                    Editar
                  </button>
                  <button
                    className="delete-cliente"
                    onClick={async () => {
                      if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
                        try {
                          await deleteClient(c.clientId);
                          handleDelete(c.clientId);
                        } catch (err) {
                          console.error('Erro ao deletar cliente:', err);
                        }
                      }
                    }}
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SelectCliente;
