const express = require('express');
const axios = require('axios');
const { stringify } = require('querystring');
const routes = express.Router();
const path = require('path');
const authenticated = require('../auth/checkToken');
const webtoken = require('jsonwebtoken');
const db = require('../model/redisManager');
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./scratch');

const tokensecret = process.env.SECRET_TOKEN;

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

routes.get('/historial', authenticated.checkToken, async (req, res) => {
    let token = localStorage.getItem('token');

    const resp =await getOperaciones(token);
    try {
        console.log('historial: ', resp);
        res.status(200).render('historial', {history: resp});
    } catch (error) {
        console.log(error);
    }
});

routes.post('/operar', authenticated.checkToken, async (req, res) => {
    let op1 = Number.parseFloat(req.body.numero1);
    let op2 = Number.parseFloat(req.body.numero2);
    let operacion = req.body.operacion;
    let token = localStorage.getItem('token');

    let data = stringify({
        op1: op1,
        op2: op2,
        operacion: operacion
    });

    const resp = await axios.post('http://api:3001/api/operacion', data);
    try {
        console.log('resultado: ', resp.data.result.toString());
        addOperacion(`${op1} ${getSigno(operacion)} ${op2} = ${resp.data.result}`, token);
        res.status(200).render('index', {resultado: resp.data.result.toString()});
    } catch (error) {
        console.log(error);
    }
});

function addOperacion(operacion,token){
    webtoken.verify(token, tokensecret, async (err, decode) => {
        if (decode) {
            const { id } = decode;
            try{
                console.log('saveOP: ', id);
                await db.insertOP(id,operacion);
            }catch(error){
                console.log(error);
            }
        }
    });
}

function getOperaciones(token){
    return new Promise((resolve,reject)=>{
        webtoken.verify(token, tokensecret, async (err, decode) => {
            if (decode) {
                const { id } = decode;
                console.log('getH: ', id);
                let historial = await db.getHistory(id);
                resolve(historial);
            }else{
                reject([]);
            }
        });
    });
}

let getSigno = (operacion) => {
    switch (operacion){
        case 'suma': return '+';
        case 'resta': return '-';
        case 'multiplicacion': return '*';
        case 'division': return '/';
        case 'potencia': return '^';
        default: '.';
    }
}

module.exports = routes;