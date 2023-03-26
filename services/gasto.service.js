const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class GastoService {
  constructor() {}

  async create(data) {
    const newGasto = await models.Gasto.create(data);

    return newGasto;
  }

  async find() {
    const gastos = await models.Gasto.findAll({
      include: models.User,
    });
    gastos.forEach((gasto) => {
      delete gasto.dataValues.User.password;
    });
    //delete rta.data.password;
    return gastos;
  }

  async findOne(id) {
    const gasto = await models.Gasto.findByPk(id);
    if (!gasto) {
      throw boom.notFound('gasto not found');
    }
    return gasto;
  }
  async findByEmail(email) {
    const gasto = await models.Gasto.findOne({
      where: { email },
    });
    if (!gasto) {
      throw boom.notFound('gasto not found');
    }
    //delete gasto.dataValues.password;
    return gasto;
  }

  async update(id, changes) {
    const gasto = await this.findOne(id);
    const rta = await gasto.update(changes);
    return rta;
  }

  async delete(id) {
    const gasto = await this.findOne(id);
    await gasto.destroy();
    return { id };
  }
}

module.exports = GastoService;
