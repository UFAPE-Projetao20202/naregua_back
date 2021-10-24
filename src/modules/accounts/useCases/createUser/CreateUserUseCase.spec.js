const { describe, expect } = require('@jest/globals');

const AppError = require('../../../../errors/AppError');
const {
  UsersRepositoryInMemory,
} = require('../../repositories/in-memory/UsersRepositoryInMemory');
const { CreateUserUseCase } = require('./CreateUserUseCase');

let usersRepository;
let createUserUseCase;

describe('Criar Usuário', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('Deve ser possível cadastrar um novo usuário na aplicação', async () => {
    const user = await createUserUseCase.execute({
      name: 'Usuario teste',
      email: 'user@email.com',
      phone: '87999999999',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });
});
