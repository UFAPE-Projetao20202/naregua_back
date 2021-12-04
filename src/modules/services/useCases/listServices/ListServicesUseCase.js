const { hash } = require('bcryptjs');
const AppError = require('../../../../errors/AppError');

class ListServicesUseCase {
  constructor(servicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async execute({ filter }) {
    const service = await this.servicesRepository.findAll({
      filter
    });

    return service;
  }
}

module.exports = { ListServicesUseCase };
