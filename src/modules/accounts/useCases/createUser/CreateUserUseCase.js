const AppError = require('../../../../errors/AppError');
const { UsersRepository } = require('../../repositories/UsersRepository');

class CreateUserUseCase {
  async execute({ name, email, phone, password }) {
    if (!name || !String(name).trim()) throw new AppError('Informe o nome.');

    if (!password || !String(password).trim())
      throw new AppError('Informe a senha.');

    if ((!email || !String(email).trim()) && (!phone || !String(phone).trim()))
      throw new AppError('Informe o email ou telefone.');

    const usersRepository = new UsersRepository();

    if (email) {
      const userEmailAlreadyExists = await usersRepository.findByEmail(email);

      if (userEmailAlreadyExists)
        throw new AppError('Já existe um usuário com esse email.');
    }

    if (phone) {
      const userPhoneAlreadyExists = await usersRepository.findByPhone(phone);

      if (userPhoneAlreadyExists)
        throw new AppError('Já existe um usuário com esse número de telefone.');
    }

    const user = await usersRepository.create({
      name,
      email,
      password,
      phone,
    });

    return user;
  }
}

module.exports = { CreateUserUseCase };
