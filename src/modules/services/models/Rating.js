const { Model, DataTypes, Sequelize } = require('sequelize');

class Rating extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        stars: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        comment: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        service_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'services', key: 'id' },
        },
        client_id: {
          type: Sequelize.UUID,
          allowNull: false,
          references: { model: 'clients', key: 'id' },
        },
      },
      {
        sequelize: connection,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Service, {
      foreignKey: 'service_id',
      as: 'service',
    });
    this.belongsTo(models.Client, {
      foreignKey: 'client_id',
      as: 'client',
    });
  }
}

module.exports = { Rating };
