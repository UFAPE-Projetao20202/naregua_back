require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

require('./database');

const server = express();

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(process.env.PORT || 3333, () =>
  console.log(
    `Server is running on: http://localhost:${process.env.PORT || 3333} !`,
  ),
);
