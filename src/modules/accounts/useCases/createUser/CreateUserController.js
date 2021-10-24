const { CreateUserUseCase } = require('./CreateUserUseCase');

class CreateUserController {
  async handle(request, response) {
    const { name, email, phone, password } = request.body;

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      name,
      email,
      phone,
      password,
    });

    return response.status(201).json(user);
  }
}

module.exports = { CreateUserController };
