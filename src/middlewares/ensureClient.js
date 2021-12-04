const AppError = require('../errors/AppError');
const {
  ClientsRepository,
} = require('../modules/accounts/repositories/ClientsRepository');

async function ensureClient(request, _response, next) {
  const { id: user_id } = request.user;

  if (!user_id) throw new AppError('Informe o usuário!');

  // verifica se o usuário logado é um cliente.
  const clientsRepository = new ClientsRepository();
  const client = await clientsRepository.findByUserId(user_id);

  if (!client) throw new AppError('O usuário logado não é um cliente!');

  // adiciona o id do cliente na requisição.
  request.user.client_id = client.id;

  next();
}

module.exports = { ensureClient };
