const {
  ProvidersRepository,
} = require('../../repositories/ProvidersRepository');
const { SearchProviderUseCase } = require('./SearchProviderUseCase');

class SearchProviderController {
  constructor() {
    const providersRepository = new ProvidersRepository();
    this.listProviders = new SearchProviderUseCase(providersRepository);
  }

  async handle(request, response) {
    const { name } = request.body;
    const providers = await this.listProviders.execute({ name });
    return response.json(providers);
  }
}

module.exports = { SearchProviderController };
