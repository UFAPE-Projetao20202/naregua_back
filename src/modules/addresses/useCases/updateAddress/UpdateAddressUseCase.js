const { STRING } = require('sequelize');
const AppError = require('../../../../errors/AppError');

class UpdateAddressUseCase {
  constructor(addressesRepository) {
    this.addressesRepository = addressesRepository;
  }

  async execute({ id, name, zip_code, street, neighborhood, city, state, country }) {
    const updateAddressDto = {};

    if (!id) throw new AppError('Informe o id do endereço!');

    if (name && String(name).trim()) updateAddressDto.name = name;

    if (zip_code && String(zip_code).trim())
      updateAddressDto.zip_code = zip_code;

    if (street && String(street).trim()) updateAddressDto.street = street;

    if (neighborhood && String(neighborhood).trim())
      updateAddressDto.neighborhood = neighborhood;

    if (city && String(city).trim()) updateAddressDto.city = city;

    if (state && String(state).trim()) updateAddressDto.state = state;

    if (country && String(country).trim()) updateAddressDto.country = country;

    return await this.addressesRepository.update({
      id,
      updateAddressDto,
    });
  }
}

module.exports = { UpdateAddressUseCase };
