const { Service } = require('../models/Service');
const { Op } = require('sequelize');
const { validate } = require('uuid');
const AppError = require('../../../errors/AppError');

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

  async findAll({ filter = '', id_category = '' }) {
    let whereCategory = {};
    if (id_category && id_category.trim()) {
      if (validate(id_category)) {
        whereCategory.id = id_category;
      } else {
        throw new AppError('UUID de categoria inválido!', 400);
      }
    }

    return await Service.findAll({
      attributes: [
        'id',
        'name',
        'description',
        'value',
        'duration',
        'discount',
        'available',
      ],
      where: {
        [Op.or]: {
          description: {
            [Op.iLike]: `%${filter}%`,
          },
          name: {
            [Op.iLike]: `%${filter}%`,
          },
        },
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
          attributes: ['id', 'description'],
          where: whereCategory,
        },
      ],
    });
  }

  async findById(id) {
    return await Service.findByPk(id);
  }
}

module.exports = { ServiceRepository };
