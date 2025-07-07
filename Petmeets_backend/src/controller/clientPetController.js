const clientService = require('../service/clientPetService');

const registerClientAndPet = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { clientData, pets } = req.body;

    if (!clientData) {
      return res.status(400).json({ error: "Dados do cliente são obrigatórios." });
    }

    const clientDataResult = await clientService.createClient(clientData);

    if (Array.isArray(pets) && pets.length > 0) {
      const petPromises = pets.map(pet =>
        clientService.createPet({ ...pet, clientId: clientDataResult.insertId })
      );
      await Promise.all(petPromises);
    }

    res.status(201).json({ message: 'Cliente e pets registrados com sucesso.' });
  } catch (error) {
    console.error('Erro ao registrar cliente e pets:', error);
    res.status(500).json({ error: 'Erro ao registrar cliente e pets.' });
  }
};

const listClientsWithPets = async (req, res) => {
  try {
    console.log("Chamando listClientsWithPets");
    const clients = await clientService.getAllClientsWithPets();
    res.status(200).json(clients);
  } catch (error) {
    console.error("Erro ao listar clientes e pets:", error);
    res.status(500).json({ error: "Erro interno ao listar clientes e pets." });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const clientData = req.body;

    if (!clientData) {
      return res.status(400).json({ error: "Dados do cliente são obrigatórios." });
    }

    await clientService.updateClient(id, clientData);
    res.status(200).json({ message: 'Cliente atualizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar cliente.' });
  }
};

const deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    await clientService.deleteClientById(id);
    res.status(200).json({ message: 'Cliente deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar cliente:', error);
    res.status(500).json({ error: 'Erro ao deletar cliente.' });
  }
};

module.exports = {
  registerClientAndPet,
  listClientsWithPets,
  updateClient,
  deleteClient
};
