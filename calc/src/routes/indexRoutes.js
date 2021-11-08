const express = require('express');
const axios = require('axios');
const { stringify } = require('querystring');
const routes = express.Router();
const path = require('path');
const authenticated = require('../auth/checkToken');

routes.use(express.urlencoded());

routes.get('/index', (req, res) => {
    res.status(201);
    res.render('index', {resultado: 'null'});
});

routes.get('/login', (req, res) => {
    res.status(201);
    res.render('login');
});

routes.get('/signUp', (req, res) => {
    res.status(201);
    res.render('register');
});

routes.get('/about', (req, res) => {
    res.status(201);
    res.render('about');
});

routes.get('/historial', authenticated.checkToken, (req, res) => {
    res.status(201);
    res.render('historial');
});

routes.post('/operar', authenticated.checkToken, async (req, res) => {
    let op1 = Number.parseFloat(req.body.numero1);
    let op2 = Number.parseFloat(req.body.numero2);
    let operacion = req.body.operacion;

    let data = stringify({
        op1: op1,
        op2: op2,
        operacion: operacion
    });

    const resp = await axios.post('http://api:3001/api/operacion', data);
    try {
        console.log(resp.data.result.toString());
        res.status(200).render('index', {resultado: resp.data.result.toString()});
    } catch (error) {
        console.log(error);
    }
});

module.exports = routes;