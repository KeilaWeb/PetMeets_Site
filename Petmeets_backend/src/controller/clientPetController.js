const clientService = require('../service/clientPetService');

const registerClientAndPet = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const { clientData, petData } = req.body;

    const clientDataResult = await clientService.createClient(clientData);

    const petPromises = (petData || []).map(pet => clientService.createPet({ ...pet, clientId: clientDataResult.insertId }));
    await Promise.all(petPromises);

    res.status(201).json({ message: 'Client and pets registered successfully' });
  } catch (error) {
    console.error('Error registering client and pets:', error);
    res.status(500).json({ error: 'Error registering client and pets' });
  }
};

const listClientsWithPets = async (req, res) => {
  try {
    console.log("Chamando listClientsWithPets");
    const rows = await clientService.getAllClientsWithPets(); // chamada ao service
    res.status(200).json(rows);
  } catch (error) {
    console.error("Erro ao listar clientes e pets:", error);
    res.status(500).json({ message: "Erro interno ao listar clientes e pets." });
  }
};

const updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const clientData = req.body;
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
  deleteClient,
  updateClient
};
