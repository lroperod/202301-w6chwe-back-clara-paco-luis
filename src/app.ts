import express from 'express';
import apiRouter from './api/api-router.js';
import cors from 'cors';

const app = express();
const corsOptions = {
  origin: 'https://w6chwe-back-clara-paco-luis.onrender.com',
};
app.use(cors(corsOptions));

app.disable('x-powered-by');
app.get('/', (req, res) => {
  res.json('Server is working!!');
});

app.use(express.json());
app.use('/api/v1', apiRouter);

export default app;
