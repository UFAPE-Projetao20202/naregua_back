const { describe, expect } = require('@jest/globals');

const AppError = require('../../../../errors/AppError');
const { AuthenticateUseCase } = require('./AuthenticateUseCase');
const {
  UsersRepositoryInMemory,
} = require('../../repositories/in-memory/UsersRepositoryInMemory');
const { CreateUserUseCase } = require('../createUser/CreateUserUseCase');

let authenticateUseCase;
let createUserUseCase;
let usersRepository;

describe('Login de usuário', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    authenticateUseCase = new AuthenticateUseCase(usersRepository);
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('[TA_49] login com e-mail e senha corretos.', async () => {
    const user = {
      name: 'Usuario teste',
      email: 'user@email.com',
      phone: '87999999999',
      password: '123456',
    };

    await createUserUseCase.execute(user);

    const resultAuthenticate = await authenticateUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(resultAuthenticate).toHaveProperty('token');
  });

  it('[TA_50] login com e-mail incorreto e senha correta.', () => {
    expect(async () => {
      const user = {
        name: 'Usuario teste 2',
        email: 'user2@email.com',
        phone: '87888888888',
        password: '123456',
      };

      await createUserUseCase.execute(user);

      await authenticateUseCase.execute({
        email: 'emailinvalido',
        password: user.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('[TA_51] login com e-mail correto e senha incorreta.', () => {
    expect(async () => {
      const user = {
        name: 'Usuario teste 3',
        email: 'user3@email.com',
        phone: '87777777777',
        password: '123456',
      };

      await createUserUseCase.execute(user);

      await authenticateUseCase.execute({
        email: user.email,
        password: 'senha incorreta',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
