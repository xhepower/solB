const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
app.use(passport.initialize({ session: false }));
app.use(express.json());

// const whitelist = [
//   'http://localhost:8080',
//   'http://localhost:3005',
//   'http://137.184.94.94:3006',
//   'https://myapp.co',
//   'https://hidden-wave-53367.herokuapp.com',
// ];
// const options = {
//   origin: (origin, callback) => {
//     if (whitelist.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('no permitido'));
//     }
//   },
// };
app.use(cors());
require('./utils/auth');
app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});
app.use(express.static('./pdfs'));
routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Mi port ${port}`);
});
