const express = require('express');
const axios = require('axios');
const { stringify } = require('querystring');
const routes = express.Router();
const path = require('path');

routes.use(express.urlencoded());

routes.get('/', (req, res) => {
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

routes.post('/operar', async (req, res) => {
    let op1 = Number.parseFloat(req.body.numero1);
    let op2 = Number.parseFloat(req.body.numero2);
    let operacion = req.body.operacion;

    let data = stringify({
        op1: op1,
        op2: op2,
        operacion: operacion
    });

    const resp = await axios.post('http://localhost:3001/api/operacion', data);
    try {
        res.json(resp.data).status(200);
    } catch (error) {
        console.log(error);
    }
});

routes.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../views/404.html'));
});

module.exports = routes;