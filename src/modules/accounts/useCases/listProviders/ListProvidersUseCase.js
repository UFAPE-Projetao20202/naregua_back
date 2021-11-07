class ListProvidersUseCase {
  constructor(providersRepository) {
    this.providersRepository = providersRepository;
  }
  async execute({ name }) {
    const providers = await this.providersRepository.findAll({ name });

    return providers;
  }
}

module.exports = { ListProvidersUseCase };
