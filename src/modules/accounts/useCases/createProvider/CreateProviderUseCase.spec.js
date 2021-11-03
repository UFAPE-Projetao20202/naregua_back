const { describe, expect } = require('@jest/globals');

const AppError = require('../../../../errors/AppError');
const {
  UsersRepositoryInMemory,
} = require('../../repositories/in-memory/UsersRepositoryInMemory');
const {
  ProvidersRepositoryInMemory,
} = require('../../repositories/in-memory/ProvidersRepositoryInMemory');
const {
  CreateProviderUseCase,
} = require('../createProvider/CreateProviderUseCase');

let usersRepository;
let providersRepository;
let createProviderUseCase;

describe('Cadastro de prestadores', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    providersRepository = new ProvidersRepositoryInMemory();
    createProviderUseCase = new CreateProviderUseCase(
      usersRepository,
      providersRepository,
    );
  });

  it('[TA_01] Tentativa de cadastro com todos os campos preenchidos corretamente.', async () => {
    const provider = await createProviderUseCase.execute({
      name: 'Prestador teste',
      email: 'prestador@teste.com',
      phone: '87999999999',
      password: '123456',
    });

    expect(provider).toHaveProperty('id');
  });

  it('[TA_02] Tentativa de cadastro sem colocar o nome.', () => {
    expect(async () => {
      await createProviderUseCase.execute({
        name: '',
        email: 'prestador_2@teste.com',
        phone: '87888888888',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('[TA_03] Tentativa de cadastro com E-mail já cadastrado.', async () => {
    expect(async () => {
      const email = 'prestador@teste.com';

      await createProviderUseCase.execute({
        name: 'Prestador teste 1',
        email,
        phone: '87777777777',
        password: '123456',
      });

      await createProviderUseCase.execute({
        name: 'Prestador teste 2',
        email,
        phone: '87666666666',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
