const express = require('express');
const { stringify } = require('querystring');
const routes = express.Router();
const axios = require('axios');

routes.use(express.urlencoded());

const test = async (req, res) => {
    let op1 = Number.parseFloat(req.body.op1);
    let op2 = Number.parseFloat(req.body.op2);
    let operacion = req.body.operacion;

    const data = stringify({
        op1: op1,
        op2: op2
    });

    const resp = await axios.post(`http://worker:3002/${operacion}`, data);
    try {
        res.json(resp.data).status(200);
    } catch (error) {
        console.log(error);
    }
};

routes.post('/operacion', test);

routes.get('/historico', (req, res) => {
    res.json({historial: ['1+1=2','2+2=4']}).status(200);
});

module.exports = routes;