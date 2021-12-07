const { Router } = require('express');
const { ensureAuthenticated } = require('../middlewares/ensureAuthenticated');
const { ensureClient } = require('../middlewares/ensureClient');

const {
  CreateRatingController,
} = require('../modules/services/useCases/createRating/CreateRatingController');

const ratingsRoutes = Router();
const createRatingController = new CreateRatingController();

ratingsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureClient,
  createRatingController.handle.bind(createRatingController),
);

module.exports = { ratingsRoutes };
