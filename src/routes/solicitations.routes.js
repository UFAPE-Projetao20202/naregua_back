const { Router } = require('express');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const { ensureClient } = require('../middlewares/ensureClient');
const {
  CreateSolicitationController,
} = require('../modules/solicitations/useCases/createSolicitationUseCase/CreateSolicitationController');

const solicitationsRoutes = Router();
const createSolicitationController = new CreateSolicitationController();

solicitationsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureClient,
  createSolicitationController.handle.bind(createSolicitationController),
);

module.exports = { solicitationsRoutes };
