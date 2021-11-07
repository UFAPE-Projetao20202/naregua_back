const { Address } = require('../models/Address');

class AddressesRepository {
  async create({ zip_code, street, neighborhood, city, state, country }) {
    return await Address.create({
      zip_code,
      street,
      neighborhood,
      city,
      state,
      country,
    });
  }
}

module.exports = { AddressesRepository };
