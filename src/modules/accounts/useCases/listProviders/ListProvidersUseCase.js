class ListProvidersUseCase {
  constructor(providersRepository) {
    this.providersRepository = providersRepository;
  }
  async execute({ name, state, city }) {
    const providers = await this.providersRepository.findAll({
      name,
      state,
      city,
    });

    return providers;
  }
}

module.exports = { ListProvidersUseCase };
