const { Model, DataTypes, Sequelize } = require('sequelize');

class User extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: DataTypes.STRING,
        phone: DataTypes.STRING,
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: connection,
      },
    );
  }

  static associate(models) {}
}

module.exports = { User };
