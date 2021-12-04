const { compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const AppError = require('../../../../errors/AppError');
const { SECRET } = require('../../../../config/secret');

class AuthenticateUseCase {
  constructor(usersRepository, providersRepository, clientsRepository) {
    this.usersRepository = usersRepository;
    this.providersRepository = providersRepository;
    this.clientsRepository = clientsRepository;
  }

  async execute({ email, password }) {
    if (!email || !String(email).trim())
      throw new AppError('Informe o email corretamente!');

    if (!password || !String(password).trim())
      throw new AppError('Informe a senha corretamente.');

    // verifica se o usuário existe.
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Email ou senha incorretos!');

    // verifica se é um prestador.
    const provider = await this.providersRepository.findByUserId(user.id);

    //verifica se é um cliente
    const client = await this.clientsRepository.findByUserId(user.id);

    // compara as senhas.
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError('Email ou senha incorretos!');

    // gera o token para autenticação.
    const token = sign({}, SECRET, {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user: { name: user.name, email: user.email, is_provider: !!provider, is_client: !!client },
      token,
    };
  }
}

module.exports = { AuthenticateUseCase };
