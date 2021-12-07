'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
        'services',
        [
        {
            id: uuidv4(),
            name: "Degradê",
            description: "Um corte malfeito deixando só a parte de cima",
            value: 20.0,
            duration: 90,
            discount: 0.0,
            available: true,
            category_id: '31d3e1d4-dee9-49a5-82e2-39620d51b638', // corte de cabelo
            provider_id:'42d4d1d4-dfe1-43a5-85e2-37721a51b359',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            name: "Moicano",
            description: "Estilo Newmar",
            value: 20.0,
            duration: 40,
            discount: 0.0,
            available: true,
            category_id: '31d3e1d4-dee9-49a5-82e2-39620d51b638', // corte de cabelo
            provider_id:'42d4d1d4-dfe1-43a5-85e2-37721a51b359',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            name: "Caminho de rato",
            description: "Um corte aleatório",
            value: 20.0,
            duration: 90,
            discount: 0.0,
            available: true,
            category_id: '31d3e1d4-dee9-49a5-82e2-39620d51b638', // corte de cabelo
            provider_id:'42d4d1d4-dfe1-43a5-85e2-37721a51b359',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            name: "Cabeça de cuia",
            description: "Um corte estilo dos índios",
            value: 20.0,
            duration: 90,
            discount: 0.0,
            available: true,
            category_id: '31d3e1d4-dee9-49a5-82e2-39620d51b638', // corte de cabelo
            provider_id:'42d4d1d4-dfe1-43a5-85e2-37721a51b359',
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            id: uuidv4(),
            name: "Cabeça de cuia",
            description: "Um corte arredondado",
            value: 20.0,
            duration: 90,
            discount: 0.0,
            available: true,
            category_id: '31d3e1d4-dee9-49a5-82e2-39620d51b638', // corte de cabelo
            provider_id:'32d4e1a7-aee4-42a7-83e2-77521e51b821',
            created_at: new Date(),
            updated_at: new Date(),
        },
        ],
        {}
    );
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('services', null, {});
  }
};
