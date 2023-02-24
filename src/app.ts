import express from 'express';
import apiRouter from './api/api-router.js';

const app = express();

app.get('/', (req, res) => {
  res.json('Server is up!!');
});
app.use(express.json());
app.use('/api/v1', apiRouter);

export default app;
