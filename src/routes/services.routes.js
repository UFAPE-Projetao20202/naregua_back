const { Router } = require('express');
const {
    CreateServiceController,
} = require('../modules/accounts/useCases/createService/CreateServiceController');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const { ensureProvider } = require('../middlewares/ensureProvider');

const servicesRoutes = Router();
const createServiceController = new CreateServiceController();

servicesRoutes.post('/', ensureAuthenticated, ensureProvider, createServiceController.handle.bind(createServiceController));

module.exports = { servicesRoutes };
