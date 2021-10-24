const { User } = require('../models/User');

class UsersRepository {
  async create({ name, email, phone, password }) {
    const user = await User.create({ name, email, phone, password });

    return user;
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async findByPhone(phone) {
    return await User.findOne({ where: { phone } });
  }
}

module.exports = { UsersRepository };
