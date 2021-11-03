const { v4: uuidv4 } = require('uuid');

class ProvidersRepositoryInMemory {
  constructor() {
    this.providers = [];
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

  async findById(id) {
    return this.providers.find(provider => provider.id === id);
  }

  async findByUserId(user_id) {
    return this.providers.find(provider => provider.user_id === user_id);
  }
}

module.exports = { ProvidersRepositoryInMemory };
