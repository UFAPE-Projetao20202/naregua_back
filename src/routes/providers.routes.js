const { Router } = require('express');
const {
  CreateProviderController,
} = require('../modules/accounts/useCases/createProvider/CreateProviderController');

const providersRoutes = Router();
const createProviderController = new CreateProviderController();

providersRoutes.post(
  '/',
  createProviderController.handle.bind(createProviderController),
);

module.exports = { providersRoutes };
