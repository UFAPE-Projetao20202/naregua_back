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
}

module.exports = { ProvidersRepositoryInMemory };
