const { Router } = require('express');
const { usersRoutes } = require('./users.routes');
const { authenticateRoutes } = require('./authenticate.routes');
const { providersRoutes } = require('./providers.routes');

const routes = Router();

routes.get('/', (_request, response) => response.json({ status: 'running' }));

routes.use('/users', usersRoutes);
routes.use('/providers', providersRoutes);
routes.use(authenticateRoutes);

module.exports = routes;
