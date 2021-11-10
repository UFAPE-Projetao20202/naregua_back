'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('providers', 'address_id', {
      type: Sequelize.UUID,
      allowNull: true,
      references: { model: 'addresses', key: 'id' },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  down: async queryInterface => {
    await queryInterface.removeColumn('providers', 'address_id');
  },
};
