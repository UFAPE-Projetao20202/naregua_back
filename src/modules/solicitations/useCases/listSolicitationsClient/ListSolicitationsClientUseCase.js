const { hash } = require('bcryptjs');
const AppError = require('../../../../errors/AppError');

class ListSolicitationsClientUseCase {
  constructor(solicitationsRepository) {
    this.solicitationsRepository = solicitationsRepository;
  }

  async execute({ client_id }) {
    const solicitation = await this.solicitationsRepository.findAll({
        client_id
    });

    return solicitation;
  }
}

module.exports = { ListSolicitationsClientUseCase };
