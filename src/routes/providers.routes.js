const { Router } = require('express');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const { ensureProvider } = require('../middlewares/ensureProvider');

const {
  CreateAddressProviderController,
} = require('../modules/accounts/useCases/createAddressProvider/CreateAddressProviderController');
const {
  CreateProviderController,
} = require('../modules/accounts/useCases/createProvider/CreateProviderController');
const {
  ListProvidersController,
} = require('../modules/accounts/useCases/listProviders/ListProvidersController');
const {
    SearchProviderController,
} = require('../modules/accounts/useCases/searchProvider/SearchProviderController')

const providersRoutes = Router();
const createProviderController = new CreateProviderController();
const createAddressProviderController = new CreateAddressProviderController();
const listProvidersController = new ListProvidersController();
const searchProviderController = new SearchProviderController();

providersRoutes.post(
  '/',
  createProviderController.handle.bind(createProviderController),
);

providersRoutes.post(
  '/address',
  ensureAuthenticated,
  ensureProvider,
  createAddressProviderController.handle.bind(createAddressProviderController),
);

providersRoutes.get(
  '/',
  listProvidersController.handle.bind(listProvidersController),
);

providersRoutes.post(
  '/searchProvider',
  searchProviderController.handle.bind(searchProviderController),
);

module.exports = { providersRoutes };
