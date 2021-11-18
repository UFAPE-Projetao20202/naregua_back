const { v4: uuidv4 } = require('uuid');

class ProvidersRepositoryInMemory {
  constructor(usersRepository) {
    this.providers = [];
    this.usersRepository = usersRepository;
  }

  async create({ user_id }) {
    const provider = {};

    Object.assign(provider, {
      id: uuidv4(),
      user_id,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.providers.push(provider);

    return provider;
  }

  async findAll({ name }) {
    await this.providers.map(async provider => {
      provider.user = await this.usersRepository.findById(provider.user_id);
      if (provider.user) delete provider.user.password;
    });

    if (name)
      return this.providers.filter(provider =>
        provider.user.name.includes(name),
      );

    return this.providers;
  }

  async findById(id) {
    return this.providers.find(provider => provider.id === id);
  }

  async findByUserId(user_id) {
    return this.providers.find(provider => provider.user_id === user_id);
  }
}

module.exports = { ProvidersRepositoryInMemory };
