// Import dependencies
import express from 'express';
import mongoose from 'mongoose';
import expressValidator from 'express-validator';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import route from './routes/routes';

dotenv.config();

if (process.env.NODE_ENV !== 'production') {
  if (process.env.NODE_ENV === 'test') {
    mongoose.connect(process.env.MONGODB_URL);
  } else {
    mongoose.connect(process.env.MONGODB_URL_DEV);
  }
} else {
  mongoose.connect(process.env.MONGODB_URL_PRO);
}

const port = parseInt(process.env.PORT, 10) || 3000;
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());
app.use('/', route);

app.get('*', (req, res) => res.status(200).json({
  message: 'Welcome to the beginning of Hospital booking app.',
}));

app.listen(port);

module.exports = app;
