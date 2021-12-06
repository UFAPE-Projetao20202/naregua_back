const { Provider } = require('../models/Provider');
const {User} = require('../models/User');
const { Op } = require('sequelize');

class ProvidersRepository {
  async create({ user_id }) {
    const provider = await Provider.create({
      user_id,
      active: true,
    });

    return provider;
  }

  async findNameGeneric({name}) {
    var providers = await Provider.findAll({raw: true});
    var users = await User.findAll({raw: true});
    var providersUsers = []

    await providers.forEach(async provider => {
        const prov = {};

        await users.forEach(async user => {
            if (user.id == provider.user_id){
                const us = {};
                Object.assign(us, {
                    id: user.id,
                    name: user.name,
                    email: user.email
                });

                Object.assign(prov, {
                  id: provider.id,
                  user_id: provider.user_id,
                  active: provider.active,
                  createdAt: provider.createdAt,
                  updatedAt: provider.updatedAt,
                  user: us
                });
            }
        });
        providersUsers.push(prov);
    });

    if (name)
        return providersUsers.filter(provider =>
            provider.user.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                .includes(name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")),
        );
    return [];
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

    return await Provider.findAll({
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
    return await Provider.findOne({ where: { id } });
  }

  async findByUserId(user_id) {
    return await Provider.findOne({ where: { user_id } });
  }

  async updateProviderAddress({ provider_id, address_id }) {
    return await Provider.update(
      { address_id },
      { where: { id: provider_id } },
    );
  }
}

module.exports = { ProvidersRepository };
