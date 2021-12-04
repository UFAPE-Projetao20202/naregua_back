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
const { ListProvidersUseCase } = require('../listProviders/ListProvidersUseCase');
const { SearchProviderUseCase } = require('./SearchProviderUseCase');

let usersRepository;
let providersRepository;
let createProviderUseCase;
let listProviderUseCase;

describe('Busca de prestador específico', () => {
  beforeEach(async () => {
    usersRepository = new UsersRepositoryInMemory();
    providersRepository = new ProvidersRepositoryInMemory(usersRepository);
    createProviderUseCase = new CreateProviderUseCase(
      usersRepository,
      providersRepository,
    );
    listProviderUseCase = new ListProvidersUseCase(providersRepository);
    searchProviderUseCase = new SearchProviderUseCase(providersRepository);
  });

    it('Listar prestadores por parte exata do nome passado.', async () => {
        const nameFilter = "José";
        const provider1 = await createProviderUseCase.execute({
          name: 'José Almeida',
          email: 'prestador@teste.com',
          phone: '87999999999',
          password: '123456',
        });

        const provider2 = await createProviderUseCase.execute({
          name: 'José Alberto',
          email: 'prestador2@teste.com',
          phone: '87888888888',
          password: '123456',
        });

        const provider3 = await createProviderUseCase.execute({
          name: 'Zeca Feitosa',
          email: 'prestador3@teste.com',
          phone: '85555555555',
          password: '123456',
        });

        const providers = await searchProviderUseCase.execute({ name: nameFilter });
        expect(providers).toEqual([provider1, provider2]);
    });

    it('Listar prestadores pelo nome ignorando caracteres minúsculos.', async () => {
        const nameFilter = "jOsé";
        const provider1 = await createProviderUseCase.execute({
          name: 'JoSé Almeida',
          email: 'prestador@teste.com',
          phone: '87999999999',
          password: '123456',
        });

        const provider2 = await createProviderUseCase.execute({
          name: 'josé Alberto',
          email: 'prestador2@teste.com',
          phone: '87888888888',
          password: '123456',
        });

        const provider3 = await createProviderUseCase.execute({
          name: 'ZEca Feitosa',
          email: 'prestador3@teste.com',
          phone: '85555555555',
          password: '123456',
        });

        const providers = await searchProviderUseCase.execute({ name: nameFilter });
        expect(providers).toEqual([provider1, provider2]);
    });

    it('Listar prestadores pelo nome ignorando acentos.', async () => {
        const nameFilter = "jose";
        const provider1 = await createProviderUseCase.execute({
          name: 'José Almeida',
          email: 'prestador@teste.com',
          phone: '87999999999',
          password: '123456',
        });

        const provider2 = await createProviderUseCase.execute({
          name: 'Jósé Alberto',
          email: 'prestador2@teste.com',
          phone: '87888888888',
          password: '123456',
        });

        const provider3 = await createProviderUseCase.execute({
          name: 'Zeca Feitosa',
          email: 'prestador3@teste.com',
          phone: '85555555555',
          password: '123456',
        });

        const providers = await searchProviderUseCase.execute({ name: nameFilter });
        expect(providers).toEqual([provider1, provider2]);
    });
});
