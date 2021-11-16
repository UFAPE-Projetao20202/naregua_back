const { Service } = require('../models/Service');

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

  async findAll(){
    return await Service.findAll();
  }
}

module.exports = { ServiceRepository };
