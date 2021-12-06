const { Client } = require('../models/Client');
const { Op } = require('sequelize');

class ClientsRepository {
  async create({ user_id }) {
    const client = await Client.create({
      user_id,
      active: true,
    });

    return client;
  }

  async findAll({ name = '', state = '', city = '' }) {
    // adiciona as opções de filtragem de endereço;
    let whereAddress = {};
    if (state && state.trim()) {
      whereAddress.state = {
        [Op.iLike]: `%${state}%`,
      };
    }

    if (city && city.trim()) {
      whereAddress.city = {
        [Op.iLike]: `%${city}%`,
      };
    }

    if (Object.keys(whereAddress).length === 0) {
      whereAddress = null;
    }

    return await Client.findAll({
      include: [
        {
          association: 'user',
          attributes: ['name', 'email', 'phone'],
          where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
          },
        },
        {
          association: 'address',
          attributes: [
            'zip_code',
            'street',
            'neighborhood',
            'city',
            'state',
            'country',
          ],
          where: whereAddress,
        },
      ],
    });
  }

  async findById(id) {
    return await Client.findOne({ where: { id } });
  }

  async findByUserId(user_id) {
    return await Client.findOne({ where: { user_id } });
  }

  async updateClientAddress({ client_id, address_id }) {
    return await Client.update(
      { address_id },
      { where: { id: client_id } },
    );
  }
}

module.exports = { ClientsRepository };