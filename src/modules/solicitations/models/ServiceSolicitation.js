const { Model, DataTypes } = require('sequelize');

class ServicesSolicitation extends Model {
  static init(connection) {
    super.init(
      {
        solicitation_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'solicitations', key: 'id' },
          primaryKey: true,
        },
        service_id: {
          type: DataTypes.UUID,
          allowNull: false,
          references: { model: 'services', key: 'id' },
          primaryKey: true,
        },
      },
      {
        sequelize: connection,
      },
    );
  }

  static associate(models) {}
}

module.exports = { ServicesSolicitation };
