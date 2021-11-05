const { Model, DataTypes, Sequelize } = require('sequelize');

class Category extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        description: {
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

module.exports = { Category };
