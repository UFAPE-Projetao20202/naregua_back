const {
  CreateAddressUseCase,
} = require('../../../addresses/useCases/createAddress/CreateAddressUseCase');

const {
  AddressesRepository,
} = require('../../../addresses/repositories/AddressesRepository');
const {
  ClientsRepository,
} = require('../../repositories/ClientsRepository');
const {
  CreateAddressClientUseCase,
} = require('./CreateAddressClientUseCase');

class CreateAddressClientController {
  constructor() {
    const addressesRepository = new AddressesRepository();
    const clientsRepository = new ClientsRepository();
    this.createAddressClientUseCase = new CreateAddressClientUseCase(
      clientsRepository,
      addressesRepository,
    );
  }

  async handle(request, response) {
    const { client_id } = request.user;
    const addressDto = request.body;

    await this.createAddressClientUseCase.execute({
      client_id,
      address: addressDto,
    });

    return response.status(201).send();
  }
}

module.exports = { CreateAddressClientController };
