const AppError = require('../../../../errors/AppError');
const { CreateUserUseCase } = require('../createUser/CreateUserUseCase');

class CreateClientUseCase {
  constructor(usersRepository, clientsRepository) {
    this.clientsRepository = clientsRepository;
    this.createUserUseCase = new CreateUserUseCase(usersRepository);
  }

  async execute({ name, email, phone, password }) {
    const user = await this.createUserUseCase.execute({
      name,
      email,
      phone,
      password,
    });

    const client = await this.clientsRepository.create({
      user_id: user.id,
    });
    return client;
  }
}

module.exports = { CreateClientUseCase };
