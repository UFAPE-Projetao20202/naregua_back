const { Router } = require('express');
const {
  CreateServiceController,
} = require('../modules/services/useCases/createService/CreateServiceController');
const {
  ListServicesController,
} = require('../modules/services/useCases/listServices/ListServicesController');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const { ensureProvider } = require('../middlewares/ensureProvider');

const servicesRoutes = Router();
const createServiceController = new CreateServiceController();
const listServicesController = new ListServicesController();

servicesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureProvider,
  createServiceController.handle.bind(createServiceController),
);

servicesRoutes.get(
  '/',
  listServicesController.handle.bind(listServicesController),
)

module.exports = { servicesRoutes };
