const express = require('express');
const routes = express.Router();
const path = require('path');

routes.get('/app', (req, res) => {
    res.status(201);
    res.render('index');
});

routes.get('/about', (req, res) => {
    res.status(201);
    res.render('about');
});

routes.get('/historial', (req, res) => {
    res.status(201);
    res.render('historial');
});

routes.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../views/404.html'));
});

module.exports = routes;