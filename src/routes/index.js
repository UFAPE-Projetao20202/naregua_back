const { Router } = require('express');
const { usersRoutes } = require('./users.routes');
const { authenticateRoutes } = require('./authenticate.routes');

const routes = Router();

routes.get('/', (_request, response) => response.json({ status: 'running' }));

routes.use('/users', usersRoutes);
routes.use(authenticateRoutes);

module.exports = routes;
