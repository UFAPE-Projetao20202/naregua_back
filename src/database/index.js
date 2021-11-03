const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const { User } = require('../modules/accounts/models/User');
const { Provider } = require('../modules/accounts/models/Provider');
const { Category } = require('../modules/accounts/models/Category');
const { Service } = require('../modules/accounts/models/Service');

const models = [User, Provider, Category, Service];

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
