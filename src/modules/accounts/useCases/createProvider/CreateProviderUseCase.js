const AppError = require('../../../../errors/AppError');
const { CreateUserUseCase } = require('../createUser/CreateUserUseCase');

class CreateProviderUseCase {
  constructor(usersRepository, providersRepository) {
    this.providersRepository = providersRepository;
    this.createUserUseCase = new CreateUserUseCase(usersRepository);
  }

  async execute({ name, email, phone, password }) {
    const user = await this.createUserUseCase.execute({
      name,
      email,
      phone,
      password,
    });

    const provider = await this.providersRepository.create({
      user_id: user.id,
    });
    return provider;
  }
}

module.exports = { CreateProviderUseCase };
