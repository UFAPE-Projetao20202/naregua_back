const { Model, DataTypes, Sequelize } = require('sequelize');

class Service extends Model {
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
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        available: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
        },
        category_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'category', key: 'id' },
        },
        provider_id: {
            type: Sequelize.UUID,
            allowNull: false,
            references: { model: 'provider', key: 'id' },
        },
      },
      {
        sequelize: connection,
      },
    );
  }

  static associate(models) {
    this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
    this.belongsTo(models.Provider, { foreignKey: 'provider_id', as: 'provider' });
  }
}

module.exports = { Service };
