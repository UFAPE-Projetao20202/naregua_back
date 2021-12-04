const { Router } = require('express');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const { ensureClient } = require('../middlewares/ensureClient');

const {
  CreateAddressClientController,
} = require('../modules/accounts/useCases/createAddressClient/CreateAddressClientController');
const {
  CreateClientController,
} = require('../modules/accounts/useCases/createClient/CreateClientController');

const clientsRoutes = Router();
const createClientController = new CreateClientController();
const createAddressClientController = new CreateAddressClientController();

clientsRoutes.post(
  '/',
  createClientController.handle.bind(createClientController),
);

clientsRoutes.post(
  '/address',
  ensureAuthenticated,
  ensureClient,
  createAddressClientController.handle.bind(createAddressClientController),
);

module.exports = { clientsRoutes };
