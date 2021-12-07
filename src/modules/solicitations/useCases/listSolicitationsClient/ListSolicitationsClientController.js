const { SolicitationRepository } = require('../../repositories/SolicitationRepository');
const { ListSolicitationsClientUseCase } = require('./ListSolicitationsClientUseCase');

class ListSolicitationsClientController {
  constructor() {
    const solicitationRepository = new SolicitationRepository();
    this.listSolicitationsClientUseCase = new ListSolicitationsClientUseCase(solicitationRepository);
  }
  async handle(request, response) {
    const { client_id } = request.user;

    const solicitations = await this.listSolicitationsClientUseCase.execute({client_id});

    return response.status(201).json(solicitations);
  }
}

module.exports = { ListSolicitationsClientController };
