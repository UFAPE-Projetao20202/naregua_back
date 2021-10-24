const { describe, expect } = require('@jest/globals');

const AppError = require('../../../../errors/AppError');
const {
  UsersRepositoryInMemory,
} = require('../../repositories/in-memory/UsersRepositoryInMemory');
const { CreateUserUseCase } = require('./CreateUserUseCase');

let usersRepository;
let createUserUseCase;

describe('Cadastro de usuários', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  });

  it('[TA_05] Tentativa de cadastro com todos os campos preenchidos corretamente.', async () => {
    const user = await createUserUseCase.execute({
      name: 'Usuario teste',
      email: 'user@email.com',
      phone: '87999999999',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('[TA_04] Tentativa de cadastro com senha inválida', () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'Usuario teste 2',
        email: 'user_2@email.com',
        phone: '87888888888',
        password: '12345',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('[TA_06] Tentativa de cadastro com E-mail já cadastrado', async () => {
    expect(async () => {
      await createUserUseCase.execute({
        name: 'Usuario teste 3',
        email: 'emailExistente@email.com',
        phone: '87777777777',
        password: '123456',
      });

      await createUserUseCase.execute({
        name: 'Usuario teste 4',
        email: 'emailExistente@email.com',
        phone: '87666666666',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
