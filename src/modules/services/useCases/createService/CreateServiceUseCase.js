const AppError = require('../../../../errors/AppError');

class CreateServiceUseCase {
  constructor(servicesRepository) {
    this.servicesRepository = servicesRepository;
  }

  async execute({
    name,
    description,
    value,
    duration,
    discount = 0,
    available = true,
    category_id,
    provider_id,
  }) {
    if (!name || !String(name).trim()) throw new AppError('Informe o nome.');

    if (!description || !String(description).trim())
      throw new AppError('Informe a descrição.');

    if (!value || !String(value).trim()) throw new AppError('Informe o valor.');

    if (discount === null || discount === undefined || isNaN(discount))
      throw new AppError('Informe o desconto corretamente (number).');

    if (!duration || isNaN(duration))
      throw new AppError('Informe a duração corretamente (number).');

    if (!category_id || !String(category_id).trim())
      throw new AppError('Informe a categoria.');

    if (!provider_id || !String(provider_id).trim())
      throw new AppError('Informe a prestador.');

    const service = await this.servicesRepository.create({
      name,
      description,
      value,
      duration,
      discount,
      available,
      category_id,
      provider_id,
    });

    return service;
  }
}

module.exports = { CreateServiceUseCase };
