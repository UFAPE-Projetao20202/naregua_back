const { Router } = require('express');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const { ensureProvider } = require('../middlewares/ensureProvider');
const { ensureClient } = require('../middlewares/ensureClient');

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
} = require('../modules/accounts/useCases/searchProvider/SearchProviderController');
const {
  ListSolicitationsController,
} = require('../modules/solicitations/useCases/listSolicitations/ListSolicitationsController');
const {
  ListSolicitationsClientController
} = require('../modules/solicitations/useCases/listSolicitationsClient/ListSolicitationsClientController');
const {
  AlterStatusSolicitationController,
} = require('../modules/solicitations/useCases/alterStatusSolicitation/AlterStatusSolicitationController');

const providersRoutes = Router();
const createProviderController = new CreateProviderController();
const createAddressProviderController = new CreateAddressProviderController();
const listProvidersController = new ListProvidersController();
const searchProviderController = new SearchProviderController();
const listSolicitationsController = new ListSolicitationsController();
const listSolicitationsClientController = new ListSolicitationsClientController();
const alterStatusSolicitationController =
  new AlterStatusSolicitationController();

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

providersRoutes.get(
  '/listSolicitationsProvider',
  ensureAuthenticated,
  ensureProvider,
  listSolicitationsController.handle.bind(listSolicitationsController),
);

providersRoutes.get(
  '/listSolicitationsClient',
  ensureAuthenticated,
  ensureClient,
  listSolicitationsController.handle.bind(listSolicitationsController),
);

providersRoutes.put(
  '/alterStatusSolicitation/:id',
  ensureAuthenticated,
  ensureProvider,
  alterStatusSolicitationController.handle.bind(
    alterStatusSolicitationController,
  ),
);

module.exports = { providersRoutes };
