const { v4: uuidv4 } = require('uuid');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
        'users',
        [
        {
            id: '32d4e1d4-dee1-48a5-81e2-37621d51b639',
            name: 'Isidoro Beto',
            email: 'isi@email.com',
            phone: '87999999999',
            password: '123456',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            name: 'José Feitosa',
            email: 'jft@email.com',
            phone: '87888888888',
            password: '123456',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: '52e4e1d7-aee3-42a5-87e2-77621e51b831',
            name: 'João vitu',
            email: 'jvitu@email.com',
            phone: '87444444444',
            password: '123456',
            created_at: new Date(),
            updated_at: new Date(),
        },
        ],
        {}
    );
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('users', null, {});
  }
};
