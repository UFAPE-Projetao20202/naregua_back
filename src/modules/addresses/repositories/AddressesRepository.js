const { Address } = require('../models/Address');

class AddressesRepository {
  async create({ name, zip_code, street, neighborhood, city, state, country }) {
    return await Address.create({
      name,
      zip_code,
      street,
      neighborhood,
      city,
      state,
      country,
    });
  }

  async update({ id, updateAddressDto }) {
    return await Address.update(updateAddressDto, { where: { id } });
  }
}

module.exports = { AddressesRepository };
