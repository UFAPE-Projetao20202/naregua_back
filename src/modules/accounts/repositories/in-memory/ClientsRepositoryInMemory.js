const { v4: uuidv4 } = require('uuid');

class ClientsRepositoryInMemory {
  constructor(usersRepository) {
    this.clients = [];
    this.usersRepository = usersRepository;
  }

  async create({ user_id }) {
    const client = {};

    Object.assign(client, {
      id: uuidv4(),
      user_id,
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.clients.push(client);

    return client;
  }

  async findAll({ name }) {
    await this.clients.map(async provider => {
      client.user = await this.usersRepository.findById(provider.user_id);
      if (client.user) delete client.user.password;
    });

    if (name)
      return this.clients.filter(client =>
        client.user.name.includes(name),
      );

    return this.clients;
  }

  async findById(id) {
    return this.clients.find(client => client.id === id);
  }

  async findByUserId(user_id) {
    return this.clients.find(client => client.user_id === user_id);
  }
}

module.exports = { ClientsRepositoryInMemory };
