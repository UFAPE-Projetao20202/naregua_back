const { ServiceRepository } = require('../../repositories/ServiceRepository');
const { ListServicesUseCase } = require('./ListServicesUseCase');

class ListServicesController {
  constructor() {
    const servicesRepository = new ServiceRepository();
    this.listServicesUseCase = new ListServicesUseCase(servicesRepository);
  }
  async handle(request, response) {
    const { filter } = request.body;

    const services = await this.listServicesUseCase.execute({filter});

    return response.status(201).json(services);
  }
}

module.exports = { ListServicesController };
