import React, { useEffect, useState } from 'react';
import { fetchClients } from '../../../../services/clientService';

const SelectCliente = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };
    loadClients();
  }, []);

  return (
    <div className="conteudo">
      <div className="cliente-geral">
        <h2 className="texto-H2">Clientes</h2>
      </div>
      <div className="tabela-cliente">
        <table>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Pets cadastrados</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((cliente, index) => (
              <tr key={index}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.pets?.length || 0}</td>
                <td>
                  <button className="editar-cliente">Editar</button>
                  <button className="delete-cliente">Deletar</button>
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
