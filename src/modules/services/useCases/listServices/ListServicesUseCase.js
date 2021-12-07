const { hash } = require('bcryptjs');
const AppError = require('../../../../errors/AppError');

class ListServicesUseCase {
  constructor(servicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async execute({ filter, id_category }) {
    const service = await this.servicesRepository.findAll({
      filter,
      id_category
    });

    return service;
  }
}

module.exports = { ListServicesUseCase };
