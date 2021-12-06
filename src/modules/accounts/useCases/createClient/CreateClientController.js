const { UsersRepository } = require('../../repositories/UsersRepository');
const {
  ClientsRepository,
} = require('../../repositories/ClientsRepository');
const { CreateClientUseCase } = require('./CreateClientUseCase');

class CreateClientController {
  constructor() {
    const usersRepository = new UsersRepository();
    const clientsRepository = new ClientsRepository();
    this.createClientUseCase = new CreateClientUseCase(
      usersRepository,
      clientsRepository,
    );
  }
  async handle(request, response) {
    const { name, email, phone, password } = request.body;

    const client = await this.createClientUseCase.execute({
      name,
      email,
      phone,
      password,
    });

    return response.status(201).json(client);
  }
}

module.exports = { CreateClientController };
