const AppError = require('../../../../errors/AppError');
const {
  CreateAddressUseCase,
} = require('../../../addresses/useCases/createAddress/CreateAddressUseCase');
const {
  UpdateAddressUseCase,
} = require('../../../addresses/useCases/updateAddress/UpdateAddressUseCase');

class CreateAddressClientUseCase {
  constructor(clientsRepository, addressRepository) {
    this.clientsRepository = clientsRepository;
    this.createAddressUseCase = new CreateAddressUseCase(addressRepository);
    this.updateAddressUseCase = new UpdateAddressUseCase(addressRepository);
  }

  async execute({ client_id, address }) {
    if (!client_id) throw new AppError('Informe o cliente!');

    const client = await this.clientsRepository.findById(client_id);

    if (client.address_id) {
      // Caso o cliente já tenha um endereço cadastrado, ele é atualizado.
      address.id = client.address_id;
      const [result] = await this.updateAddressUseCase.execute(address);
      if (!result) {
        throw new AppError(
          'Houve um problema ao atualizar o endereço do cliente!',
        );
      }
    } else {
      // Caso o prestador não tenha um endereço, um novo é cadastrado.
      const addressResult = await this.createAddressUseCase.execute(address);

      const [result] = await this.clientsRepository.updateClientAddress({
        client_id,
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

module.exports = { CreateAddressClientUseCase };
