const { ServicesSolicitation } = require('../models/ServiceSolicitation');
const { Solicitation } = require('../models/Solicitation');

class SolicitationsRepository {
  async create({ service_hours, client_id, services }) {
    let amount = 0;

    services.map(service => {
      amount += service.value;
    });

    const solicitation = await Solicitation.create({
      amount,
      service_hours,
      status: 'pendente',
      client_id,
    });

    await services.map(async service => {
      await ServicesSolicitation.create({
        solicitation_id: solicitation.id,
        service_id: service.id,
      });
    });

    return solicitation;
  }
}

module.exports = { SolicitationsRepository };
