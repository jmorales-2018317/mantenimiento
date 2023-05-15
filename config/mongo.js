'use strict'

const mongoose = require('mongoose');

exports.connect = async()=>{
    const uriMongo = 'mongodb://127.0.0.1:27017/example2023';
    mongoose.set('strictQuery', false);
    mongoose.Promise = global.Promise;

    await mongoose.connect(uriMongo, {
        connectTimeoutMS: 2500,
        maxPoolSize: 50,
        useNewUrlParser: true
    }).then(()=>{
        console.log('Connected to db');
    }).catch(err=> console.error(err));
}