const Joi = require('joi');

const id = Joi.number().integer();
const idUser = Joi.number().integer();
const descripcion = Joi.string().min(3);

const createRutaSchema = Joi.object({
  idUser: idUser.required(),
  descripcion: descripcion.required(),
});

const updateRutaSchema = Joi.object({
  idUser: idUser,
  descripcion: descripcion,
});

const getRutaSchema = Joi.object({
  id: id.required(),
});

module.exports = { createRutaSchema, updateRutaSchema, getRutaSchema };
