const AppError = require('../../../../errors/AppError');

class CreateAddressUseCase {
  constructor(addressesRepository) {
    this.addressesRepository = addressesRepository;
  }

  async execute({ name, zip_code, street, neighborhood, city, state, country }) {
    if(!name || !String(name).trim()) throw new AppError('Informe o nome!');

    if (!zip_code || !String(zip_code).trim())
      throw new AppError('Informe o CEP!');

    if (!street || !String(street).trim()) throw new AppError('Informe a rua!');

    if (!neighborhood || !String(neighborhood).trim())
      throw new AppError('Informe o bairro!');

    if (!city || !String(city).trim()) throw new AppError('Informe a cidade!');

    if (!state || !String(state).trim())
      throw new AppError('Informe o estado!');

    if (!country || !String(country).trim())
      throw new AppError('Informe o país!');

    return await this.addressesRepository.create({
      name,
      zip_code,
      street,
      neighborhood,
      city,
      state,
      country,
    });
  }
}

module.exports = { CreateAddressUseCase };
