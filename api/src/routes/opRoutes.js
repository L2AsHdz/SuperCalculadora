const express = require('express');
const { stringify } = require('querystring');
const routes = express.Router();

routes.get('/historico', (req, res) => {
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({msg: 'holi'}));
});

routes.post('/operacion', (req, res) => {
    res.status(200);
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify({op: 'holi'}));
});

module.exports = routes;