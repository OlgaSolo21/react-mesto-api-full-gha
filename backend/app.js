require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, MONGO_URL } = require('./utils/config');

const app = express();
app.use(cors());

const router = require('./routes/index');
const { handleCenterError } = require('./middlewares/handleCenterError');

// app.use(bodyParser.json()); // для собирания JSON-формата
// app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// **В Express > = 4.16 синтаксический анализатор тела был повторно добавлен в методы express.json()
app.use(express.json()); // для собирания JSON-формата
app.use(express.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// подключаемся к серверу mongo
mongoose.connect(MONGO_URL);

app.use(requestLogger); // подключаем логгер запросов

app.use(router); // все роуты

app.use(errorLogger); // подключаем логгер ошибок

// обработчик ошибок celebrate
app.use(errors());

// централизованная обработка ошибок
app.use(handleCenterError);

// слушаем порт
app.listen(PORT);

// npm run lint -- --fix - чтобы фиксить ошибки с линтером
