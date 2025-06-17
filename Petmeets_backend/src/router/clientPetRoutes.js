const express = require('express');
const router = express.Router();
const clientController = require('../controller/clientPetController');

router.post('/dashboard/register-client', clientController.registerClientAndPet);
router.get('/list', clientController.listClientsWithPets);

module.exports = router;
