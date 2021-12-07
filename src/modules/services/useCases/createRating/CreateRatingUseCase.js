const { validate } = require('uuid');
const AppError = require('../../../../errors/AppError');

class CreateRatingUseCase {
  constructor(ratingsRepository) {
    this.ratingsRepository = ratingsRepository;
  }

  async execute({ stars, comment, client_id, service_id }) {
    if (!stars || isNaN(stars))
      throw new AppError(
        'Informe as estrelas da avaliação corretamente (number)!',
      );

    if (!client_id) throw new AppError('Informe o usuário!');

    if (!validate(service_id))
      throw new AppError('Informe id do serviço avaliado corretamente!');

    const rating = await this.ratingsRepository.create({
      stars,
      comment,
      client_id,
      service_id,
    });

    return rating;
  }
}

module.exports = { CreateRatingUseCase };
