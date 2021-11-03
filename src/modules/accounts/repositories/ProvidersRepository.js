const { Provider } = require('../models/Provider');

class ProvidersRepository {
  async create({ user_id }) {
    const provider = await Provider.create({
      user_id,
      active: true,
    });

    return provider;
  }

  async findAll() {
    return await Provider.findAll({
      include: [
        { association: 'user', attributes: ['name', 'email', 'phone'] },
      ],
    });
  }

  async findById(id) {
    return await Provider.findOne({ where: { id } });
  }

  async findByUserId(user_id) {
    return await Provider.findOne({ where: { user_id } });
  }
}

module.exports = { ProvidersRepository };
