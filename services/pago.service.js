const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class PagoService {
  constructor() {}

  async create(data) {
    const newPago = await models.Pago.create(data);

    return newPago;
  }

  async find() {
    const pagos = await models.Pago.findAll({
      //include: [{ model: models.Cliente, include: models.Ruta }],
      include: [
        {
          model: models.Prestamo,
          include: [{ model: models.Cliente, include: models.Ruta }],
        },
      ],
    });
    //delete rta.data.password;
    return pagos;
  }

  async findOne(id) {
    const pago = await models.Pago.findByPk(id);
    if (!pago) {
      throw boom.notFound('pago not found');
    }
    return pago;
  }
  async findByEmail(email) {
    const pago = await models.Pago.findOne({
      where: { email },
    });
    if (!pago) {
      throw boom.notFound('pago not found');
    }
    //delete pago.dataValues.password;
    return pago;
  }
  async findByCliente(cliente) {
    const pago = await models.Pago.findAll({
      where: { idCliente: cliente },
    });
    if (!pago) {
      throw boom.notFound('pago not found');
    }
    //delete pago.dataValues.password;
    return pago;
  }
  async update(id, changes) {
    const pago = await this.findOne(id);
    const rta = await pago.update(changes);
    return rta;
  }

  async delete(id) {
    const pago = await this.findOne(id);
    await pago.destroy();
    return { id };
  }
}

module.exports = PagoService;
