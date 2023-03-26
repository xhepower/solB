const express = require('express');
const passport = require('passport');
const PagoService = require('./../services/pago.service');
const PrestamoService = require('../services/prestamo.service');
const validatorHandler = require('./../middlewares/validator.handler');
const {
  updatePagoSchema,
  createPagoSchema,
  getPagoSchema,
} = require('./../schemas/pago.schema');

const router = express.Router();
const service = new PagoService();
const otroService = new PrestamoService();
//const { checkRoles } = require('./../middlewares/auth.handler');

router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  //checkRoles('user'),
  async (req, res, next) => {
    try {
      const pagos = await service.find();
      res.json(pagos);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  // checkRoles('user'),
  validatorHandler(getPagoSchema, 'params'),
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
  validatorHandler(createPagoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const { monto, idPrestamo } = body;
      let { saldo, pagado } = await otroService.findOne(idPrestamo);

      const nuevoSaldo = saldo - monto;
      if (nuevoSaldo <= 0) {
        pagado = true;
      }
      await otroService.update(idPrestamo, {
        saldo: nuevoSaldo,
        pagado: pagado,
      });
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
  validatorHandler(getPagoSchema, 'params'),
  validatorHandler(updatePagoSchema, 'body'),
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
  validatorHandler(getPagoSchema, 'params'),
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
