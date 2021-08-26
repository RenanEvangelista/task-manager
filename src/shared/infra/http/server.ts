import 'reflect-metadata';

import '../../container';

import express from 'express';
import 'express-async-errors';

import routes from './routes';
import handleErrorsMiddleware from './middlewares/handleErrorsMiddleware';

const app = express();

app.use(express.json());
app.use(routes);
app.use(handleErrorsMiddleware);

app.listen(3333, () => {
  console.log('server running on port 3333');
});
