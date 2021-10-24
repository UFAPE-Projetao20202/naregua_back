const { hash } = require('bcryptjs');
const AppError = require('../../../../errors/AppError');

class CreateUserUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, phone, password }) {
    if (!name || !String(name).trim()) throw new AppError('Informe o nome.');

    if (!password || !String(password).trim())
      throw new AppError('Informe a senha.');

    if ((!email || !String(email).trim()) && (!phone || !String(phone).trim()))
      throw new AppError('Informe o email ou telefone.');

    if (email) {
      const userEmailAlreadyExists = await this.usersRepository.findByEmail(
        email,
      );

      if (userEmailAlreadyExists)
        throw new AppError('Já existe um usuário com esse email.');
    }

    if (phone) {
      const userPhoneAlreadyExists = await this.usersRepository.findByPhone(
        phone,
      );

      if (userPhoneAlreadyExists)
        throw new AppError('Já existe um usuário com esse número de telefone.');
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      phone,
    });

    return user;
  }
}

module.exports = { CreateUserUseCase };
