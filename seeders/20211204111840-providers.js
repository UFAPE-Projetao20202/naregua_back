'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
      await queryInterface.bulkInsert(
          'providers',
          [
          {
              id: '42d4d1d4-dfe1-43a5-85e2-37721a51b359',
              user_id: '32d4e1d4-dee1-48a5-81e2-37621d51b639',
              active: true,
              created_at: new Date(),
              updated_at: new Date(),
          },
          {
                id: uuidv4(),
                user_id: '52e4e1d7-aee3-42a5-87e2-77621e51b831',
                active: true,
                created_at: new Date(),
                updated_at: new Date(),
            },
          ],
          {}
      );
    },

    down: async (queryInterface, Sequelize) => {
       await queryInterface.bulkDelete('providers', null, {});
    }
};
