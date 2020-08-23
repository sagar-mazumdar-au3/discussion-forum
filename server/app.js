const express = require('express');
require("./database/db-connection");
require("./auth/passportAuth")
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/auth');
const topicRouter = require('./routes/topics');
const commentRouter = require('./routes/comments');

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/auth', usersRouter);
app.use('/api/topics', topicRouter);
app.use('/api/comments', commentRouter);

module.exports = app;