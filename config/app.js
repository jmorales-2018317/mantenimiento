'use strict'

const express = require('express');
//body-parser = permite ver el cuerpo de una petición
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const categoryRoutes = require('../src/routes/category.route');
const productRoutes = require('../src/routes/product.route');
 
app.use(express.urlencoded({extended: false})); //para solicitudes del cliente en formularios, utiliza querystrings
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/product', productRoutes);
app.use('/category', categoryRoutes);

exports.initServer = ()=>{
    app.listen(port, ()=>{
        console.log(`Server http running in port ${port}`)
    })    
}