const { v4: uuidv4 } = require('uuid');

class UsersRepositoryInMemory {
  constructor() {
    this.users = [];
  }

  async create({ name, email, phone, password }) {
    const user = {};

    Object.assign(user, {
      id: uuidv4(),
      name,
      password,
      email,
      phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.users.push(user);

    return user;
  }

  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  async findByPhone(phone) {
    return this.users.find(user => user.phone === phone);
  }

  async findById(id) {
    return this.users.find(user => user.id === id);
  }
}

module.exports = { UsersRepositoryInMemory };
