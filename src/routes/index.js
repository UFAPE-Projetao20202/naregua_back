const { Router } = require('express');
const { usersRoutes } = require('./users.routes');
const { authenticateRoutes } = require('./authenticate.routes');
const { providersRoutes } = require('./providers.routes');
const { clientsRoutes } = require('./clients.routes');
const { servicesRoutes } = require('./services.routes');
const { categoriesRoutes } = require('./categories.routes');
const { solicitationsRoutes } = require('./solicitations.routes');
const { ratingsRoutes } = require('./ratings.routes');

const routes = Router();

routes.get('/', (_request, response) => response.json({ status: 'running' }));

routes.use('/users', usersRoutes);
routes.use('/providers', providersRoutes);
routes.use('/clients', clientsRoutes);
routes.use('/services', servicesRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/solicitations', solicitationsRoutes);
routes.use('/ratings', ratingsRoutes);
routes.use(authenticateRoutes);

module.exports = routes;
