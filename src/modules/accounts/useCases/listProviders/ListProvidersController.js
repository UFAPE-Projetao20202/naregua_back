const {
  ProvidersRepository,
} = require('../../repositories/ProvidersRepository');
const { ListProvidersUseCase } = require('./ListProvidersUseCase');

class ListProvidersController {
  constructor() {
    const providersRepository = new ProvidersRepository();
    this.listProviders = new ListProvidersUseCase(providersRepository);
  }

  async handle(request, response) {
    const { name } = request.query;

    const providers = await this.listProviders.execute({ name });

    return response.json(providers);
  }
}

module.exports = { ListProvidersController };
