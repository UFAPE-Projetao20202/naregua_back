const { Router } = require('express');
const { usersRoutes } = require('./users.routes');

const routes = Router();

routes.get('/', (_request, response) => response.json({ status: 'running' }));

routes.use('/users', usersRoutes);

module.exports = routes;
