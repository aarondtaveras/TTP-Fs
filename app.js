/** 
 *  4/22/19 - Aaron D. Taveras, Lead Developer
 * 
 *  This file is the entry point for our API and starts our server. 
 * 
 */

require('dotenv').config();
const express = require('express'),
    app = express(),
    createError = require('http-errors'),
    path = require('path'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    indexRouter = require('./src/routes/index'),
    userRouter = require('./src/routes/users');

app.set('view',path.join(__dirname, '/src/views'));
app.set('view engine', 'pug');