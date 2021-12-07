const { Rating } = require('../models/Rating');

class RatingsRepository {
  async create({ stars, comment, client_id, service_id }) {
    const rating = await Rating.create({
      stars,
      comment,
      client_id,
      service_id,
    });

    return rating;
  }

  async findAll({ service_id }) {
    return await Rating.findAll({ where: { service_id } });
  }
}

module.exports = { RatingsRepository };
