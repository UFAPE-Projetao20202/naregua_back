const Cryptr = require('cryptr');
const AppError = require('../../../../errors/AppError');

class LoginUserUseCase {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async execute({ email, password }) {
    if (!password || !String(password).trim())
      throw new AppError('Informe a senha.');

    if (password.length < 6)
      throw new AppError('A senha deve ter no mínimo 6 caracteres.');

    if ((!email || !String(email).trim()))
      throw new AppError('Informe o email.');

      const userFind = await this.usersRepository.findByEmail(email);
      const cryptr = new Cryptr('MySecretKey'); // colocar chave
      const passwordDecrypted = cryptr.decrypt(userFind.password);

    if (userFind && !(String(password) === String(passwordDecrypted)))
        throw new AppError('Senha errada.');
    if (!userFind)
        throw new AppError('Email não encontrado!');

    return passwordDecrypted;
  }
}

module.exports = { LoginUserUseCase };
