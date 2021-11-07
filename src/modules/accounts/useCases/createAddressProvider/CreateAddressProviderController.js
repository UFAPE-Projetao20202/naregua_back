const {
  CreateAddressUseCase,
} = require('../../../addresses/useCases/createAddressProvider/CreateAddressUseCase');

const {
  AddressesRepository,
} = require('../../../addresses/repositories/AddressesRepository');

class CreateAddressProviderController {
  constructor() {
    const addressesRepository = new AddressesRepository();
    this.createAddressUseCase = new CreateAddressUseCase(addressesRepository);
  }

  async handle(request, response) {
    //const { provider_id } = request.user;

    const address = await this.createAddressUseCase.execute(request.body);

    return response.json(address);
  }
}

module.exports = { CreateAddressProviderController };
