const express = require('express');
const passport = require('passport');
const RutaService = require('./../services/ruta.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  updateRutaSchema,
  createRutaSchema,
  getRutaSchema,
} = require('./../schemas/ruta.schema');

const router = express.Router();
const service = new RutaService();
//const { checkRoles } = require('./../middlewares/auth.handler');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  // checkRoles('user'),
  async (req, res, next) => {
    try {
      const rutas = await service.find();
      res.json(rutas);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  //checkRoles('user'),
  validatorHandler(getRutaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const category = await service.findOne(id);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  //checkRoles('user'),
  validatorHandler(createRutaSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  //checkRoles(),
  validatorHandler(getRutaSchema, 'params'),
  validatorHandler(updateRutaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  //checkRoles(),
  validatorHandler(getRutaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;