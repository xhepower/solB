const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
const { Op } = require('sequelize');
const moment = require('moment');
require('dotenv').config();
class PrestamoService {
  constructor() {}

  async create(data) {
    const newPrestamo = await models.Prestamo.create(data);

    return newPrestamo;
  }

  async find() {
    const prestamos = await models.Prestamo.findAll({
      include: [{ model: models.Cliente, include: models.Ruta }],
    });
    //delete rta.data.password;
    return prestamos;
  }
  async moras() {
    const prestamos = await models.Prestamo.findAll({
      where: { pagado: false, mora: 0, vencimiento: { [Op.lte]: moment() } },
      include: [{ model: models.Cliente, include: models.Ruta }],
    });
    prestamos.forEach(async (prestamo) => {
      const saldo = parseFloat(prestamo.saldo);
      const mora = saldo * parseFloat(process.env.INTERES_MORA);
      await this.update(parseInt(prestamo.id), {
        saldo: saldo + mora,
        mora: mora,
      });
    });
    return prestamos;
  }
  async findOne(id) {
    const prestamo = await models.Prestamo.findByPk(id);
    if (!prestamo) {
      throw boom.notFound('prestamo not found');
    }
    return prestamo;
  }
  async findByEmail(email) {
    const prestamo = await models.Prestamo.findOne({
      where: { email },
    });
    if (!prestamo) {
      throw boom.notFound('prestamo not found');
    }
    //delete prestamo.dataValues.password;
    return prestamo;
  }
  async findByCliente(cliente) {
    const prestamo = await models.Prestamo.findAll({
      where: { idCliente: cliente },
    });
    if (!prestamo) {
      throw boom.notFound('prestamo not found');
    }
    //delete prestamo.dataValues.password;
    return prestamo;
  }
  async update(id, changes) {
    const prestamo = await this.findOne(id);
    const rta = await prestamo.update(changes);
    return rta;
  }

  async delete(id) {
    const prestamo = await this.findOne(id);
    await prestamo.destroy();
    return { id };
  }
}

module.exports = PrestamoService;
