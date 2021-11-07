const { ServiceRepository } = require('../../repositories/ServiceRepository');
const { CreateServiceUseCase } = require('./CreateServiceUseCase');

class CreateServiceController {
  constructor() {
    const serviceRepository = new ServiceRepository();
    this.createServiceUseCase = new CreateServiceUseCase(serviceRepository);
  }
  async handle(request, response) {
    const {
      name,
      description,
      value,
      duration,
      discount,
      available,
      category_id,
    } = request.body;

    const { provider_id } = request.user;

    const service = await this.createServiceUseCase.execute({
      name,
      description,
      value,
      duration,
      discount,
      available,
      category_id,
      provider_id,
    });

    return response.status(201).json(service);
  }
}

module.exports = { CreateServiceController };
