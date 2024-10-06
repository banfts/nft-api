import express from 'express';

import { apiRouter } from './api.js';

const app = express();

app.use(apiRouter);

const server = createServer(app);

server.listen(3000);
server.on('listening', () => {
  console.log('Started');
});
