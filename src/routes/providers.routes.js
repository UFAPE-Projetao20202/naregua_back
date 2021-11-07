const { Router } = require('express');
const {
  CreateAddressProviderController,
} = require('../modules/accounts/useCases/createAddressProvider/CreateAddressProviderController');
const {
  CreateProviderController,
} = require('../modules/accounts/useCases/createProvider/CreateProviderController');
const {
  ListProvidersController,
} = require('../modules/accounts/useCases/listProviders/ListProvidersController');

const providersRoutes = Router();
const createProviderController = new CreateProviderController();
const createAddressProviderController = new CreateAddressProviderController();
const listProvidersController = new ListProvidersController();

providersRoutes.post(
  '/',
  createProviderController.handle.bind(createProviderController),
);

providersRoutes.post(
  '/address',
  createAddressProviderController.handle.bind(createAddressProviderController),
);

providersRoutes.get(
  '/',
  listProvidersController.handle.bind(listProvidersController),
);

module.exports = { providersRoutes };
