const express = require('express');

const authRouter = require('./auth.router');
const usersRouter = require('./users.router');
const clientesRouter = require('./clientes.router');
const prestamosRouter = require('./prestamos.router');
const pagosRouter = require('./pagos.router');
const rutasRouter = require('./rutas.router');
const gastosRouter = require('./gastos.router');
//const prestamosRouter = require('./prestamos.router');
function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/auth', authRouter);
  router.use('/users', usersRouter);
  router.use('/clientes', clientesRouter);
  router.use('/prestamos', prestamosRouter);
  router.use('/pagos', pagosRouter);
  router.use('/rutas', rutasRouter);
  router.use('/gastos', gastosRouter);
}

module.exports = routerApi;
