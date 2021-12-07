const { validate } = require('uuid');
const AppError = require('../../../../errors/AppError');

class CreateSolicitationUseCase {
  constructor(solicitationsRepository, servicesRepository) {
    this.solicitationsRepository = solicitationsRepository;
    this.servicesRepository = servicesRepository;
  }

  async execute({ service_hours, client_id, services_ids }) {
    if (!client_id || !validate(client_id))
      throw new AppError('Informe o id do cliente!');

    if (!services_ids || !services_ids.length)
      throw new AppError('Informe pelo menos um serviço!');

    if (!service_hours) throw new AppError('Informe o horário do atendimento!');

    const services = [];

    for (let i = 0; i < services_ids.length; i++) {
      if (!validate(services_ids[i])) {
        throw new AppError(
          'Os ids de serviços devem ser informados corretamente! (UUID V4).',
        );
      }

      const service = await this.servicesRepository.findById(services_ids[i]);

      if (!service)
        throw new AppError(
          `Não foi possivel encontrar um serviço com o id: ${services_ids[i]}`,
        );

      services.push(service);
    }

    const solicitation = await this.solicitationsRepository.create({
      service_hours,
      client_id,
      services,
    });

    return solicitation;
  }
}

module.exports = { CreateSolicitationUseCase };
