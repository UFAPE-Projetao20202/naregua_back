const AppError = require('../../../../errors/AppError');
const {
  CreateAddressUseCase,
} = require('../../../addresses/useCases/createAddress/CreateAddressUseCase');
const {
  UpdateAddressUseCase,
} = require('../../../addresses/useCases/updateAddress/UpdateAddressUseCase');

class CreateAddressProviderUseCase {
  constructor(providersRepository, addressRepository) {
    this.providersRepository = providersRepository;
    this.createAddressUseCase = new CreateAddressUseCase(addressRepository);
    this.updateAddressUseCase = new UpdateAddressUseCase(addressRepository);
  }

  async execute({ provider_id, address }) {
    if (!provider_id) throw new AppError('Informe o prestador!');

    const provider = await this.providersRepository.findById(provider_id);

    if (provider.address_id) {
      // Caso o prestador já tenha um endereço cadastrado, ele é atualizado.
      address.id = provider.address_id;
      const [result] = await this.updateAddressUseCase.execute(address);
      if (!result) {
        throw new AppError(
          'Houve um problema ao atualizar o endereço do prestador!',
        );
      }
    } else {
      // Caso o prestador não tenha um endereço, um novo é cadastrado.
      const addressResult = await this.createAddressUseCase.execute(address);

      const [result] = await this.providersRepository.updateProviderAddress({
        provider_id,
        address_id: addressResult.id,
      });

      if (!result) {
        throw new AppError(
          'Houve um problema ao cadastrar o endereço do prestador!',
        );
      }
    }
  }
}

module.exports = { CreateAddressProviderUseCase };
