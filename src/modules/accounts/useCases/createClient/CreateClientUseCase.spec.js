const { describe, expect } = require('@jest/globals');

const AppError = require('../../../../errors/AppError');
const {
  UsersRepositoryInMemory,
} = require('../../repositories/in-memory/UsersRepositoryInMemory');
const {
  ClientsRepositoryInMemory,
} = require('../../repositories/in-memory/ClientsRepositoryInMemory');
const {
  CreateClientClientUseCase,
} = require('../createClient/CreateClientUseCase');

let usersRepository;
let clientsRepository;
let createClientUseCase;

describe('Cadastro de clientes', () => {
  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    clientsRepository = new ClientsRepositoryInMemory();
    createClientUseCase = new CreateClientUseCase(
      usersRepository,
      clientsRepository,
    );
  });

  it('[TA_01] Tentativa de cadastro com todos os campos preenchidos corretamente.', async () => {
    const client = await createClientUseCase.execute({
      name: 'Cliente teste',
      email: 'cliente@teste.com',
      phone: '87999999999',
      password: '123456',
    });

    expect(client).toHaveProperty('id');
  });

  it('[TA_02] Tentativa de cadastro sem colocar o nome.', () => {
    expect(async () => {
      await createClientUseCase.execute({
        name: '',
        email: 'cliente_2@teste.com',
        phone: '87888888888',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('[TA_03] Tentativa de cadastro com E-mail já cadastrado.', async () => {
    expect(async () => {
      const email = 'cliente@teste.com';

      await createClientUseCase.execute({
        name: 'Cliente teste 1',
        email,
        phone: '87777777777',
        password: '123456',
      });

      await createClientUseCase.execute({
        name: 'Cliente teste 2',
        email,
        phone: '87666666666',
        password: '123456',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
