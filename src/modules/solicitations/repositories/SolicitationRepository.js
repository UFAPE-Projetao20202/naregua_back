const { Solicitation } = require('../models/Solicitation');
// const { Service } = require('../models/Service');
const { Op } = require('sequelize');
const { validate } = require('uuid');
const AppError = require('../../../errors/AppError');

class SolicitationRepository {
  async findAll({ provider_id, client_id }) {
    let whereProvider = {};
    let whereClient = {};

    if (provider_id) {
      whereProvider.provider_id = provider_id;
    } else if (client_id) {
      whereClient.client_id = client_id;
    }

    return await Solicitation.findAll({
      attributes: ['id', 'amount', 'service_hours', 'status', 'client_id'],
      where: whereClient,
      include: [
        {
          association: 'services',
          attributes: [
            'id',
            'name',
            'description',
            'value',
            'duration',
            'discount',
            'available',
          ],
          where: whereProvider,
        },
      ],
    });
  }

  async alterSolicitation({ status, provider_id, id }) {
    try {
      const result = await Solicitation.update(
        {
          status: status,
        },
        {
          where: {
            id,
          },
        },
      );
      return result;
    } catch (err) {
      throw new AppError(err, 400);
    }
  }
}

module.exports = { SolicitationRepository };
