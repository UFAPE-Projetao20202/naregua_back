'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'categories',
      [
        {
          id: 'afc0bdbd-e43c-4f42-9191-df4c8b71e892',
          description: 'Massagem',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '31d3e1d4-dee9-49a5-82e2-39620d51b638',
          description: 'Corte de cabelo',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'c10488ad-7cae-4051-ba4f-0868dae86427',
          description: 'Penteado',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '9d73c212-80ef-4b38-b8b7-a1067f4e8b9f',
          description: 'Sombrancelha',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '1d50079d-e07a-4e9c-89f1-54ff6e6a28c4',
          description: 'Manicure',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '9215bba9-e3f5-4a2d-87e4-67f910e197b3',
          description: 'Pedicure',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'e78bf370-830d-4f5d-b349-77887b686b67',
          description: 'Barba',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: '06ba7a5b-f0c4-4eae-88e3-50eb36244310',
          description: 'Depilação',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          id: 'e49ce801-78f5-4c0d-b194-ca94a413d3d4',
          description: 'Outro',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categories', null, {});
  }
};
