const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class ClienteService {
  constructor() {}

  async create(data) {
    const newCliente = await models.Cliente.create(data);

    return newCliente;
  }

  async find() {
    const clientes = await models.Cliente.findAll({
      include: [{ model: models.Ruta, include: models.User }],
    });
    //delete rta.data.password;
    return clientes;
  }

  async findOne(id) {
    const cliente = await models.Cliente.findByPk(id);
    if (!cliente) {
      throw boom.notFound('cliente not found');
    }
    return cliente;
  }
  async findByEmail(email) {
    const cliente = await models.Cliente.findOne({
      where: { email },
    });
    if (!cliente) {
      throw boom.notFound('cliente not found');
    }
    //delete cliente.dataValues.password;
    return cliente;
  }

  async update(id, changes) {
    const cliente = await this.findOne(id);
    const rta = await cliente.update(changes);
    return rta;
  }

  async delete(id) {
    const cliente = await this.findOne(id);
    await cliente.destroy();
    return { id };
  }
}

module.exports = ClienteService;
