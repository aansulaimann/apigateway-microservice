// set dotenv
require('dotenv').config()

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// new router | Aan
const coursesRouter = require('./routes/courses')
const mediaRouter = require('./routes/media')
const ordersRouter = require('./routes/orderPayments')
const refreshTokensRouter = require('./routes/refreshTokens')
const mentorsRouter = require('./routes/mentors')
const chaptersRouter = require('./routes/chapters')
const lessonsRouter = require('./routes/lessons')
const imageCoursesRouter = require('./routes/imageCourses')
const myCoursesRouter = require('./routes/myCourses')
const reviewsRouter = require('./routes/reviews')
const webhookRouter = require('./routes/webhook')

// panggil middleware | Aan
const verifyToken = require('./middlewares/verifyToken')
const can = require('./middlewares/permission')

const app = express();

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// new endpoint | aan
// public end point
app.use('/courses', coursesRouter)
app.use('/refresh-tokens', refreshTokensRouter)
app.use('/webhook', webhookRouter)

// admin and students can access
app.use('/media',verifyToken, can('admin', 'student'), mediaRouter)
app.use('/orders',verifyToken, can('admin', 'student'), ordersRouter)
app.use('/my-courses', verifyToken, can('admin', 'student'), myCoursesRouter)
app.use('/reviews', verifyToken, can('admin', 'student'), reviewsRouter)

// only admin can access
app.use('/mentors', verifyToken, can('admin'), mentorsRouter)
app.use('/chapters', verifyToken, can('admin'), chaptersRouter)
app.use('/lessons', verifyToken, can('admin'), lessonsRouter)
app.use('/image-courses', verifyToken, can('admin'), imageCoursesRouter)

module.exports = app;
