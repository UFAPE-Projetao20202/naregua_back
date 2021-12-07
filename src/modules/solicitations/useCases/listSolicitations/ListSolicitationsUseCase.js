const { hash } = require('bcryptjs');
const AppError = require('../../../../errors/AppError');

class ListSolicitationsUseCase {
  constructor(solicitationsRepository) {
    this.solicitationsRepository = solicitationsRepository;
  }

  async execute({ provider_id }) {
    const solicitation = await this.solicitationsRepository.findAll({
        provider_id
    });

    return solicitation;
  }
}

module.exports = { ListSolicitationsUseCase };
