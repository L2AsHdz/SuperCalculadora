const express = require('express');
const { stringify } = require('querystring');
const routes = express.Router();
const axios = require('axios');

routes.get('/historico', (req, res) => {
    res.json({historial: ['1+1=2','2+2=4']}).status(200);
});

const test = async (req, res) => {
    const resp = await axios.post('localhost:3002/suma', {
        op1: '21',
        op2: '31'
    });

    console.log(resp.data);
    res.json({historial: ['1+1=2','2+2=4']}).status(200);
};

routes.post('/operacion', test);

module.exports = routes;