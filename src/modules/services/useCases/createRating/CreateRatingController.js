const { RatingsRepository } = require('../../repositories/RatingsRepository');
const { CreateRatingUseCase } = require('./CreateRatingUseCase');

class CreateRatingController {
  constructor() {
    const ratingsRepository = new RatingsRepository();
    this.createRatingUseCase = new CreateRatingUseCase(ratingsRepository);
  }

  async handle(request, response) {
    const { client_id } = request.user;

    const { comment, stars, service_id } = request.body;

    const rating = await this.createRatingUseCase.execute({
      comment,
      stars,
      service_id,
      client_id,
    });

    return response.status(201).json(rating);
  }
}

module.exports = { CreateRatingController };
