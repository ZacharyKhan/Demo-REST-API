const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// log all incoming requests
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        res.status(200).json({});
    }
    next();
});

// routes to handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// handle all requests that make it beyond the scope of our API routes with error
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

// handle errors from within server
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
            code: error.status || 500
        }
    });
});

module.exports = app;