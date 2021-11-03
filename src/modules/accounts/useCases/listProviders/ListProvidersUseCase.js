class ListProvidersUseCase {
  constructor(providersRepository) {
    this.providersRepository = providersRepository;
  }
  async execute() {
    const providers = await this.providersRepository.findAll();

    return providers;
  }
}

module.exports = { ListProvidersUseCase };
