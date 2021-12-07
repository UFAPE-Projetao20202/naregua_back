const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const { User } = require('../modules/accounts/models/User');
const { Provider } = require('../modules/accounts/models/Provider');
const { Client } = require('../modules/accounts/models/Client');
const { Category } = require('../modules/services/models/Category');
const { Service } = require('../modules/services/models/Service');
const { Address } = require('../modules/addresses/models/Address');
const {
  Solicitation,
} = require('../modules/solicitations/models/Solicitation');
const {
  ServicesSolicitation,
} = require('../modules/solicitations/models/ServiceSolicitation');
const { Rating } = require('../modules/services/models/Rating');

const models = [
  User,
  Provider,
  Client,
  Category,
  Service,
  Address,
  Solicitation,
  ServicesSolicitation,
  Rating,
];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    //this.connection.authenticate().then(() => console.log('Database connection OK!'));

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models),
    );
  }
}

module.exports = new Database();
