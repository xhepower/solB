const Joi = require('joi');

const id = Joi.number().integer();
const idUser = Joi.number().integer();
const idPrestamo = Joi.number().integer();
const pagado = Joi.boolean();
const monto = Joi.number().precision(2);
const emitido = Joi.date();
const createPagoSchema = Joi.object({
  idUser: idUser.required(),
  idPrestamo: idPrestamo.required(),
  monto: monto.required(),
  emitido: emitido.required(),
  pagado: pagado,
});

const updatePagoSchema = Joi.object({
  monto: monto,
  pagado: pagado,
});

const getPagoSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPagoSchema,
  updatePagoSchema,
  getPagoSchema,
};
