const {
  CreateAddressUseCase,
} = require('../../../addresses/useCases/createAddress/CreateAddressUseCase');

const {
  AddressesRepository,
} = require('../../../addresses/repositories/AddressesRepository');
const {
  ProvidersRepository,
} = require('../../repositories/ProvidersRepository');
const {
  CreateAddressProviderUseCase,
} = require('./CreateAddressProviderUseCase');

class CreateAddressProviderController {
  constructor() {
    const addressesRepository = new AddressesRepository();
    const providersRepository = new ProvidersRepository();
    this.createAddressProviderUseCase = new CreateAddressProviderUseCase(
      providersRepository,
      addressesRepository,
    );
  }

  async handle(request, response) {
    const { provider_id } = request.user;
    const addressDto = request.body;

    await this.createAddressProviderUseCase.execute({
      provider_id,
      address: addressDto,
    });

    return response.status(201).send();
  }
}

module.exports = { CreateAddressProviderController };
