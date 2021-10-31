const { verify } = require('jsonwebtoken');

const AppError = require('../errors/AppError');
const { SECRET } = require('../config/secret');
const {
  UsersRepository,
} = require('../modules/accounts/repositories/UsersRepository');

async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new AppError('Token não informado!', 401);

  const [, token] = authHeader.split(' ');

  if (!token) throw new AppError('Token mal formatado!', 401);

  try {
    // verifica se o token informado é valido.
    const { sub: user_id } = verify(token, SECRET);

    const usersRepostory = new UsersRepository();

    // verifica se o usuário existe.
    const user = await usersRepostory.findById(user_id.toString());

    if (!user) throw new AppError('Usuário não existente!', 401);

    // adiciona o id do usuário na requisição.
    request.user = { id: user.id };
    next();
  } catch {
    throw new AppError('Token invalido.', 401);
  }
}

module.exports = { ensureAuthenticated };
