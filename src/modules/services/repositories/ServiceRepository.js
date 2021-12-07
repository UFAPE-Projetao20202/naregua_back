const { Service } = require('../models/Service');
const { Op } = require('sequelize');

class ServiceRepository {
  async create({
    name,
    description,
    value,
    duration,
    discount,
    available,
    category_id,
    provider_id,
  }) {
    const service = await Service.create({
      name,
      description,
      value,
      duration,
      discount,
      available,
      category_id,
      provider_id,
    });
    return service;
  }

  async findAll({ filter = '' }) {
    return await Service.findAll({
      attributes: ['id', 'name', 'description', 'value', 'duration', 'discount', 'available'],
      where: {
        [Op.or]: {
          description: {
            [Op.iLike]: `%${filter}%`
          },
          name: {
            [Op.iLike]: `%${filter}%`
          }
        }
      },
      include: [
        {
          association: 'provider',
          attributes: ['active', 'id'],
          include: [
            {
              association: 'user',
              attributes: ['name', 'email', 'phone'],
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
            },
          ],
        },
        {
          association: 'category',
          attributes: ['id', 'description']
        }
      ]
    });
  }
}

module.exports = { ServiceRepository };
