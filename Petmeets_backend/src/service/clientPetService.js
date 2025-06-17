const pool = require('../config/database');

const createClient = async (client) => {
  const { nome, cpf, telefone, email, endereco } = client;
  const { cidade, cep, rua, numero } = endereco;
  const query = `
    INSERT INTO clients (nome, cpf, telefone, email, cidade, cep, endereco, numero)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await pool.query(query, [nome, cpf, telefone, email, cidade, cep, rua, numero]);
  return result;
};

const createPet = async (pet) => {
  const { nomePet, tipo, raca, aniversario, idade, cor, porte, observacoes, clientId } = pet;
  const query = `
    INSERT INTO pets (nomePet, tipo, raca, aniversario, idade, cor, porte, observacoes, client_id)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await pool.query(query, [nomePet, tipo, raca, aniversario, idade, cor, porte, observacoes, clientId]);
  return result;
};

const getAllClientsWithPets = async () => {
  const [rows] = await pool.query(`
    SELECT
      c.id AS clientId,
      c.nome AS clienteNome,
      c.telefone,
      c.email,
      p.nomePet,
      p.idade,
      p.raca,
      p.porte
    FROM clients c
    LEFT JOIN pets p ON p.client_id = c.id
  `);
  return rows;
};

module.exports = {
  createClient,
  createPet,
  getAllClientsWithPets
};
