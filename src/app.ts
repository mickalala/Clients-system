import express, { json } from 'express';
import cors from 'cors';
import indexRouter from './routes/index.route';

const app = express();
app.use(json());
app.use(cors());
app.use(indexRouter)


export default app;