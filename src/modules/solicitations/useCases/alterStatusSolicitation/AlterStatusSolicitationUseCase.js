const { hash } = require('bcryptjs');
const AppError = require('../../../../errors/AppError');

class AlterStatusSolicitationUseCase {
  constructor(solicitationsRepository) {
    this.solicitationsRepository = solicitationsRepository;
  }

  async execute({ status, provider_id, id }) {
    const statusAvaiable = ['aceito', 'recusado', 'finalizado'];

    if (!statusAvaiable.includes(status)) {
      throw new AppError('Informe o status corretamente!');
    }

    const solicitation = await this.solicitationsRepository.alterSolicitation({
      status,
      provider_id,
      id,
    });

    return solicitation;
  }
}

module.exports = { AlterStatusSolicitationUseCase };
