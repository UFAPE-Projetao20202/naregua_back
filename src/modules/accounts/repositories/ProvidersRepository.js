const { Provider } = require('../models/Provider');

class ProvidersRepository {
  async create({ user_id }) {
    const provider = await Provider.create({
      user_id,
      active: true,
    });

    return provider;
  }
}

module.exports = { ProvidersRepository };
