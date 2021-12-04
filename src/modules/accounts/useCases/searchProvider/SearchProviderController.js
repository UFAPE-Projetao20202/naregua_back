const {
  ProvidersRepository,
} = require('../../repositories/ProvidersRepository');
const { SearchProvidersUseCase } = require('./SearchProvidersUseCase');

class SearchProvidersController {
  constructor() {
    const providersRepository = new ProvidersRepository();
    this.listProviders = new SearchProvidersUseCase(providersRepository);
  }

  async handle(request, response) {
    const { name, state, city } = request.query;

    const providers = await this.listProviders.execute({ name, state, city });

    return response.json(providers);
  }
}

module.exports = { SearchProvidersController };
