const Joi = require('joi');

const id = Joi.number().integer();
const idUser = Joi.number().integer();
const descripcion = Joi.string().min(3);
const monto = Joi.number().precision(2);
const emitido = Joi.date();
const createGastoSchema = Joi.object({
  idUser: idUser.required(),
  descripcion: descripcion.required(),
  monto: monto.required(),
  emitido: emitido.required(),
});

const updateGastoSchema = Joi.object({
  idUser: idUser,
  descripcion: descripcion,
  monto: monto,
  emitido: emitido,
});

const getGastoSchema = Joi.object({
  id: id.required(),
});

module.exports = { createGastoSchema, updateGastoSchema, getGastoSchema };
