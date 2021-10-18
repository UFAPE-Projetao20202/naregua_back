const { Router } = require('express');

const routes = Router();

routes.get('/', (_request, response) => response.json({ status: 'running' }));

export { routes };
