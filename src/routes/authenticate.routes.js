const { Router } = require('express');
const {
  AuthenticateController,
} = require('../modules/accounts/useCases/authenticate/AuthenticateController');

const authenticateRoutes = Router();
const authenticateController = new AuthenticateController();

authenticateRoutes.post(
  '/login',
  authenticateController.handle.bind(authenticateController),
);

module.exports = { authenticateRoutes };
