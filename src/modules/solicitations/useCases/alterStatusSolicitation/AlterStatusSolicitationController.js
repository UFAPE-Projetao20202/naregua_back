const { SolicitationRepository } = require('../../repositories/SolicitationRepository');
const { AlterStatusSolicitationUseCase } = require('./AlterStatusSolicitationUseCase');

class AlterStatusSolicitationController {
  constructor() {
    const solicitationRepository = new SolicitationRepository();
    this.alterStatusSolicitationUseCase = new AlterStatusSolicitationUseCase(solicitationRepository);
  }
  async handle(request, response) {
    const { provider_id } = request.user;
    const { status } = request.body;
    const { id } = request.params;

    const solicitations = await this.alterStatusSolicitationUseCase.execute({ status, provider_id, id });

    return response.status(200).json(solicitations);
  }
}

module.exports = { AlterStatusSolicitationController };
