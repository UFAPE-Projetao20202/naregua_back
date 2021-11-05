const { v4: uuidv4 } = require('uuid');

class ServiceRepository {
  constructor() {
    this.services = [];
  }

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
    const service = {};

    Object.assign(service, {
      id: uuidv4(),
      name,
      description,
      value,
      duration,
      discount,
      available,
      category_id,
      provider_id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.services.push(service);

    return service;
  }
}

module.exports = { ServiceRepository };
