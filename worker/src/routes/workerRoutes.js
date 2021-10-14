const express = require('express');
const routes = express.Router();

routes.use(express.urlencoded());

routes.post('/suma', (req, res) => {
    let op1 = Number.parseFloat(req.body.op1);
    let op2 = Number.parseFloat(req.body.op2);
    let result = op1 + op2;
    res.json({result: result}).status(200);
});

routes.post('/resta', (req, res) => {
    let op1 = Number.parseFloat(req.body.op1);
    let op2 = Number.parseFloat(req.body.op2);
    let result = op1 - op2;
    res.json({result: result}).status(200);
});

routes.post('/multiplicacion', (req, res) => {
    let op1 = Number.parseFloat(req.body.op1);
    let op2 = Number.parseFloat(req.body.op2);
    let result = op1 * op2;
    res.json({result: result}).status(200);
});

routes.post('/division', (req, res) => {
    let op1 = Number.parseFloat(req.body.op1);
    let op2 = Number.parseFloat(req.body.op2);
    let result = op1 / op2;
    res.json({result: result}).status(200);
});

routes.post('/potencia', (req, res) => {
    let op1 = Number.parseFloat(req.body.op1);
    let op2 = Number.parseFloat(req.body.op2);
    let result = Math.pow(op1, op2);
    res.json({result: result}).status(200);
});

module.exports = routes;