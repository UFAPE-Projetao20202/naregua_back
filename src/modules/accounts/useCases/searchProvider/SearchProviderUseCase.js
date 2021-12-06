class SearchProviderUseCase {
  constructor(providersRepository) {
    this.providersRepository = providersRepository;
  }
  async execute({ name }) {
    const providers = await this.providersRepository.findNameGeneric({name});
    return providers;
  }
}

module.exports = { SearchProviderUseCase };
