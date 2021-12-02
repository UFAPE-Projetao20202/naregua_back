const { Router } = require('express');
const {
  CreateUserController,
} = require('../modules/accounts/useCases/createUser/CreateUserController');

const usersRoutes = Router();
const createUserController = new CreateUserController();

usersRoutes.post('/', createUserController.handle.bind(createUserController));

module.exports = { usersRoutes };