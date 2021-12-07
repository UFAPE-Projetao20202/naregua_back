const { ServiceRepository } = require('../../repositories/ServiceRepository');
const { ListServicesUseCase } = require('./ListServicesUseCase');

class ListServicesController {
  constructor() {
    const servicesRepository = new ServiceRepository();
    this.listServicesUseCase = new ListServicesUseCase(servicesRepository);
  }
  async handle(request, response) {
    const { filter, id_category } = request.body;

    const services = await this.listServicesUseCase.execute({filter, id_category});

    return response.status(201).json(services);
  }
}

module.exports = { ListServicesController };
