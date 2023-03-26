const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');
class RutaService {
  constructor() {}

  async create(data) {
    const newRuta = await models.Ruta.create(data);

    return newRuta;
  }

  async find() {
    const rutas = await models.Ruta.findAll({ include: models.User });
    return rutas;
  }

  async findOne(id) {
    const ruta = await models.Ruta.findByPk(id);
    if (!ruta) {
      throw boom.notFound('ruta not found');
    }
    return ruta;
  }
  async findByEmail(email) {
    const ruta = await models.Ruta.findOne({
      where: { email },
    });
    if (!ruta) {
      throw boom.notFound('ruta not found');
    }
    //delete ruta.dataValues.password;
    return ruta;
  }

  async update(id, changes) {
    const ruta = await this.findOne(id);
    const rta = await ruta.update(changes);
    return rta;
  }

  async delete(id) {
    const ruta = await this.findOne(id);
    await ruta.destroy();
    return { id };
  }
}

module.exports = RutaService;
