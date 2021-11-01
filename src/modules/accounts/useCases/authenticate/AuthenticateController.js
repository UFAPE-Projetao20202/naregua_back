const { AuthenticateUseCase } = require('./AuthenticateUseCase');
const { UsersRepository } = require('../../repositories/UsersRepository');

class AuthenticateController {
  constructor() {
    const usersRepository = new UsersRepository();
    this.authenticateUseCase = new AuthenticateUseCase(usersRepository);
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
