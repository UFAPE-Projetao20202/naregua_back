require('dotenv').config();

const express = require('express');
require('express-async-errors');

const cors = require('cors');
const routes = require('./routes');
const AppError = require('./errors/AppError');

require('./database');

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

// tratamento de erros
server.use((err, _request, response, _next) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({ message: err.message });
  }

  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: `Internal server error: - ${err.message}`,
  });
});

server.listen(process.env.PORT || 3333, () =>
  console.log(
    `Server is running on: http://localhost:${process.env.PORT || 3333} !`,
  ),
);
