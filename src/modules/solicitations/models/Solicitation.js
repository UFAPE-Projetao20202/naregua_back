const { Model, DataTypes, Sequelize } = require('sequelize');

class Solicitation extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        service_hours: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        status: {
          type: DataTypes.ENUM([
            'pendente',
            'aceito',
            'finalizado',
            'recusado',
            'cancelado',
          ]),
          allowNull: false,
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
    this.belongsTo(models.Client, {
      foreignKey: 'client_id',
      as: 'client',
    });
  }
}

module.exports = { Solicitation };
