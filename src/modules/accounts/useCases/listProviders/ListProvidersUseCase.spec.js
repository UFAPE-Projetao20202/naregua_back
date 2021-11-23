const { describe, expect } = require('@jest/globals');

const {
  ProvidersRepositoryInMemory,
} = require('../../repositories/in-memory/ProvidersRepositoryInMemory');
const {
  UsersRepositoryInMemory,
} = require('../../repositories/in-memory/UsersRepositoryInMemory');
const {
  CreateProviderUseCase,
} = require('../createProvider/CreateProviderUseCase');
const { ListProvidersUseCase } = require('./ListProvidersUseCase');

let usersRepository;
let providersRepository;
let createProviderUseCase;
let listProviderUseCase;

describe('Listagem de prestadores', () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory();
    providersRepository = new ProvidersRepositoryInMemory(usersRepository);
    createProviderUseCase = new CreateProviderUseCase(
      usersRepository,
      providersRepository,
    );
    listProviderUseCase = new ListProvidersUseCase(providersRepository);
  });

  it('Deve ser possível listar os prestadores cadastrados.', async () => {
    const provider1 = await createProviderUseCase.execute({
      name: 'Prestador teste',
      email: 'prestador@teste.com',
      phone: '87999999999',
      password: '123456',
    });

    const provider2 = await createProviderUseCase.execute({
      name: 'Prestador teste 2',
      email: 'prestador2@teste.com',
      phone: '87888888888',
      password: '123456',
    });

    const prestadores = await listProviderUseCase.execute({});

    expect(prestadores).toEqual([provider1, provider2]);
  });

  it('[TA_28] Buscar estabelecimento pelo nome.', async () => {
    const nameFilter = 'Pedro';

    await createProviderUseCase.execute({
      name: 'José',
      email: 'prestador@teste.com',
      phone: '87999999999',
      password: '123456',
    });

    const providerFilter = await createProviderUseCase.execute({
      name: nameFilter,
      email: 'prestador2@teste.com',
      phone: '87888888888',
      password: '123456',
    });

    const providers = await listProviderUseCase.execute({ name: nameFilter });

    expect(providers).toEqual([providerFilter]);
  });
});
