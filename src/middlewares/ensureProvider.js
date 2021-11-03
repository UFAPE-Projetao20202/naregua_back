const AppError = require('../errors/AppError');
const {
  ProvidersRepository,
} = require('../modules/accounts/repositories/ProvidersRepository');

async function ensureProvider(request, _response, next) {
  const { id: user_id } = request.user;

  if (!user_id) throw new AppError('Informe o usuário!');

  // verifica se o usuário logado é um prestador.
  const providersRepository = new ProvidersRepository();
  const provider = await providersRepository.findByUserId(user_id);

  if (!provider) throw new AppError('O usuário logado não é um prestador!');

  // adiciona o id do prestador na requisição.
  request.user.provider_id = provider.id;

  next();
}

module.exports = { ensureProvider };
