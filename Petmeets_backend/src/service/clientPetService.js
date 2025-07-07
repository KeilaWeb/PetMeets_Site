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
      c.cpf,
      c.telefone,
      c.email,
      c.cidade,
      c.cep,
      c.endereco AS rua,
      c.numero,
      p.nomePet,
      p.tipo,
      p.raca,
      p.aniversario,
      p.idade,
      p.cor,
      p.porte,
      p.observacoes
    FROM clients c
    LEFT JOIN pets p ON p.client_id = c.id
  `);

  const clientsMap = {};

  for (const row of rows) {
    const clientId = row.clientId;

    if (!clientsMap[clientId]) {
      clientsMap[clientId] = {
        clientId: clientId,
        nome: row.clienteNome,
        cpf: row.cpf,
        telefone: row.telefone,
        email: row.email,
        endereco: {
          cidade: row.cidade,
          cep: row.cep,
          rua: row.rua,
          numero: row.numero,
        },
        pets: []
      };
    }

    if (row.nomePet) {
      clientsMap[clientId].pets.push({
        nomePet: row.nomePet,
        tipo: row.tipo,
        raca: row.raca,
        aniversario: row.aniversario,
        idade: row.idade,
        cor: row.cor,
        porte: row.porte,
        observacoes: row.observacoes
      });
    }
  }

  return Object.values(clientsMap);
};

const updateClient = async (id, client) => {
  const { nome, cpf, telefone, email, endereco, pets } = client;
  const { cidade, cep, rua, numero } = endereco;

  const updateClientQuery = `
    UPDATE clients
    SET nome = ?, cpf = ?, telefone = ?, email = ?, cidade = ?, cep = ?, endereco = ?, numero = ?
    WHERE id = ?
  `;

  await pool.query(updateClientQuery, [nome, cpf, telefone, email, cidade, cep, rua, numero, id]);

  // Apaga pets antigos do cliente antes de inserir os novos
  await pool.query(`DELETE FROM pets WHERE client_id = ?`, [id]);

  // Insere pets atualizados
  if (Array.isArray(pets)) {
    for (const pet of pets) {
      const insertPetQuery = `
        INSERT INTO pets (nomePet, tipo, raca, aniversario, idade, cor, porte, observacoes, client_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      await pool.query(insertPetQuery, [
        pet.nomePet || pet.nome,
        pet.tipo,
        pet.raca,
        pet.aniversario || null,
        pet.idade,
        pet.cor,
        pet.porte,
        pet.observacoes,
        id
      ]);
    }
  }
};

const deleteClientById = async (id) => {
  const query = `DELETE FROM clients WHERE id = ?`;
  await pool.query(query, [id]);
};

module.exports = {
  createClient,
  createPet,
  getAllClientsWithPets,
  updateClient,
  deleteClientById
};
