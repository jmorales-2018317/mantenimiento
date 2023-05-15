'use strict'

require('dotenv').config();
const app = require('./config/app');
const mongo = require('./config/mongo');

app.initServer();
mongo.connect();