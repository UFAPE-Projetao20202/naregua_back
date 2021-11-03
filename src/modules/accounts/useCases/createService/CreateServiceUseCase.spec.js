const { describe, expect } = require('@jest/globals');

const AppError = require('../../../../errors/AppError');
const {
  ServiceRepository,
} = require('../../repositories/in-memory/ServiceRepositoryInMemory');
const { CreateServiceUseCase } = require('./CreateServiceUseCase');

let serviceRepository;
let createServiceUseCase;

describe('Cadastro de serviços', () => {
  beforeEach(() => {
    serviceRepository = new ServiceRepository();
    createServiceUseCase = new CreateServiceUseCase(serviceRepository);
  });

  it('[TA_10] Cadastrar um serviço sem o nome.', async () => {
    expect(async () => {
      await createServiceUseCase.execute({
        name: '',
        description: 'descricao',
        value: '10',
        duration: 10,
        discount: '2',
        available: true,
        category_id: '1',
        provider_id: '1'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('[TA_11] Cadastrar serviço sem fotos', async () => {
  
    const service = await createServiceUseCase.execute({
      name: 'usuário teste',
        description: 'descricao',
        value: '10',
        duration: 10,
        discount: '2',
        available: true,
        category_id: '1',
        provider_id: '1'
    });

    expect(service).toHaveProperty('id');
  });

  it('[TA_12] Cadastrar um serviço com todos os dados corretos', async () => {
    const service = await createServiceUseCase.execute({
      name: 'usuário teste 2',
        description: 'descricao',
        value: '10',
        duration: 10,
        discount: '2',
        available: true,
        category_id: '1',
        provider_id: '1'
    });

    expect(service).toHaveProperty('id');
  });
});
