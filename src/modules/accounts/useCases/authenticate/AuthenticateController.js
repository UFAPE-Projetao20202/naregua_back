const { AuthenticateUseCase } = require('./AuthenticateUseCase');
const { UsersRepository } = require('../../repositories/UsersRepository');
const {
  ProvidersRepository,
} = require('../../repositories/ProvidersRepository');
const {
  ClientsRepository,
} = require('../../repositories/ClientsRepository');

class AuthenticateController {
  constructor() {
    const usersRepository = new UsersRepository();
    const providersRepository = new ProvidersRepository();
    const clientsRepository = new ClientsRepository();
    this.authenticateUseCase = new AuthenticateUseCase(
      usersRepository,
      providersRepository,
      clientsRepository,
    );
  }

  async handle(request, response) {
    const { email, password } = request.body;

    const authenticate = await this.authenticateUseCase.execute({
      email,
      password,
    });

    return response.json(authenticate);
  }
}

module.exports = { AuthenticateController };
