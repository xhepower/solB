const Joi = require('joi');

const id = Joi.number().integer();
const idUser = Joi.number().integer();
const idCliente = Joi.number().integer();
const monto = Joi.number().precision(2);
const saldo = Joi.number().precision(2);
const mora = Joi.number().precision(2);
const pagado = Joi.boolean();
const tasa = Joi.number().precision(4).min(0).max(100);
const vencimiento = Joi.date();
const emitido = Joi.date();
const createPrestamoSchema = Joi.object({
  idUser: idUser.required(),
  idCliente: idCliente.required(),
  monto: monto.required(),
  saldo: saldo.required(),
  tasa: tasa.required(),
  vencimiento: vencimiento.required(),
  emitido: emitido.required(),
  mora: mora,
  pagado: pagado,
});

const updatePrestamoSchema = Joi.object({
  monto: monto,
  saldo: saldo,
  tasa: tasa,
  vencimiento: vencimiento,
  emitido: emitido,
  mora: mora,
  pagado: pagado,
});

const getPrestamoSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createPrestamoSchema,
  updatePrestamoSchema,
  getPrestamoSchema,
};
