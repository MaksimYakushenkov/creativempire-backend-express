const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const fileUpload = require('express-fileupload');
const { limiter } = require('./utils/limiter/limiter');
const { dataMovies, PORT } = require('./utils/config/database');
const { requestLogger, errorLogger } = require('./middlewares/logger');
// const { corsRules } = require('./cors');

const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000',
  'localhost:3001',
  'http://localhost:3001',
  'https://localhost:3001',
  'http://creativempire.ru',
  'https://creativempire.ru',
  'https://www.creativempire.ru',
  'http://www.creativempire.ru',
  'creativempire.ru',
  'http://localhost:3000/',
];

const app = express();
app.use((req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  next();
});
app.use('/uploads', express.static('uploads'));
app.use(fileUpload());
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(corsRules);

// подключаемся к серверу mongo
mongoose.connect(dataMovies, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(require('./routes/index'));

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors());
app.use(require('./utils/config/errorConfig'));

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
