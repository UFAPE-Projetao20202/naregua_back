const { hash } = require('bcryptjs');
const AppError = require('../../../../errors/AppError');

class ListServicesUseCase {
  constructor(servicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async execute() {
    
    const service = await this.servicesRepository.findAll();

    return service;
  }
}

module.exports = { ListServicesUseCase };
