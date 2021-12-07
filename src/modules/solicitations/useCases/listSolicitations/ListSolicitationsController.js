const { SolicitationRepository } = require('../../repositories/SolicitationRepository');
const { ListSolicitationsUseCase } = require('./ListSolicitationsUseCase');

class ListSolicitationsController {
  constructor() {
    const solicitationRepository = new SolicitationRepository();
    this.listSolicitationsUseCase = new ListSolicitationsUseCase(solicitationRepository);
  }
  async handle(request, response) {
    const { provider_id } = request.user;

    const solicitations = await this.listSolicitationsUseCase.execute({provider_id});

    return response.status(201).json(solicitations);
  }
}

module.exports = { ListSolicitationsController };
