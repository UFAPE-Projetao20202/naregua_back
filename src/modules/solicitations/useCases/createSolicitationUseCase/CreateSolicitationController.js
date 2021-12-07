const {
  SolicitationsRepository,
} = require('../../repositories/SolicitationsRepository');
const {
  ServiceRepository,
} = require('../../../services/repositories/ServiceRepository');
const { CreateSolicitationUseCase } = require('./CreateSolicitationUseCase');

class CreateSolicitationController {
  constructor() {
    const solicitationsRepository = new SolicitationsRepository();
    const servicesRepository = new ServiceRepository();
    this.createSolicitationsRepository = new CreateSolicitationUseCase(
      solicitationsRepository,
      servicesRepository,
    );
  }

  async handle(request, response) {
    const { client_id } = request.user;

    const { service_hours, services_ids } = request.body;

    const solicitation = await this.createSolicitationsRepository.execute({
      service_hours,
      client_id,
      services_ids,
    });

    return response.status(201).json(solicitation);
  }
}

module.exports = { CreateSolicitationController };
