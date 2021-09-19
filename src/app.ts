import { config } from 'dotenv';
if (process.env.NODE_ENV === 'development') {
  config({ path: 'config.env' });
}
import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';

const dbURL = process.env.DB_URL!;
const dbPassword = process.env.DB_PASSWORD!;

mongoose
  .connect(dbURL.replace('<password>', dbPassword))
  .then(db => console.log('DB connected!'))
  .catch(err => console.error(err));

import agentRouter from './routes/agent';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use('/agent', agentRouter);

app.get('/', (req, res) => res.end('Hello'));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`server running at PORT:${PORT}`));
