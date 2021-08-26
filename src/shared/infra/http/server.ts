import express from 'express';

import routes from './routes';

const app = express();

app.use(routes);

app.listen('http://localhost:3333', () => {
  console.log('server running on port 3333');
});
