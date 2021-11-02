const { UsersRepository } = require('../../repositories/UsersRepository');
const {
  ProvidersRepository,
} = require('../../repositories/ProvidersRepository');
const { CreateProviderUseCase } = require('./CreateProviderUseCase');

class CreateProviderController {
  constructor() {
    const usersRepository = new UsersRepository();
    const providersRepository = new ProvidersRepository();
    this.createProviderUseCase = new CreateProviderUseCase(
      usersRepository,
      providersRepository,
    );
  }
  async handle(request, response) {
    const { name, email, phone, password } = request.body;

    const provider = await this.createProviderUseCase.execute({
      name,
      email,
      phone,
      password,
    });

    return response.status(201).json(provider);
  }
}

module.exports = { CreateProviderController };
