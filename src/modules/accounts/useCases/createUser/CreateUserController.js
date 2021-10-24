const { UsersRepository } = require('../../repositories/UsersRepository');
const { CreateUserUseCase } = require('./CreateUserUseCase');

class CreateUserController {
  constructor() {
    const usersRepository = new UsersRepository();
    this.createUserUseCase = new CreateUserUseCase(usersRepository);
  }
  async handle(request, response) {
    const { name, email, phone, password } = request.body;

    const user = await this.createUserUseCase.execute({
      name,
      email,
      phone,
      password,
    });

    return response.status(201).json(user);
  }
}

module.exports = { CreateUserController };
