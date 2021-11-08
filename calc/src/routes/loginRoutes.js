const express = require('express');
const crypto = require('crypto');
const redisManager = require('../model/redisManager');
const authenticated = require('../auth/checkToken');
const routes = express.Router();
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

routes.use(express.urlencoded());

routes.post('/register', async (req, res) => {
    const { email, pass } = req.body;
    let existe;

    try {
        existe = await redisManager.exists(email);
    } catch (err) {
        res.status(503).json({succes: 'Error en redis'});
    }

    if (existe !== 0) {
        res.status(409).json({succes: 'Ya existe el usuario'})
    } else {
        crypto.randomBytes(16, (err, salt) => {
            const newSalt = salt.toString('base64');
            console.log(`newSalt: ${newSalt}`);
            crypto.pbkdf2(pass, newSalt, 1000, 64, 'sha1', async (err, key) => {
                const encryptedPass = key.toString('base64');
                try {
                    await redisManager.setUser(email, encryptedPass, newSalt);
                    const token = authenticated.signToken(email);
                    localStorage.setItem('token', token);
                    res.status(201).render('index', {resultado: 'null'});
                } catch(err) {
                    console.error(err);
                    res.status(503).json({succes: 'Error al guardar el usuario'});
                }
            });
        });
    }
});

routes.post('/signIn', async (req, res) => {
    const { email, pass } = req.body;
    console.log(email, '   ', pass);
    let user;
    try {
        user = await redisManager.getUser(email);
    } catch (error) {
        res.status(503).json({error: 'temporalmente innaccesible'});
    }

    if (!user) {
        res.send('Usuario o contraseña incorrecta');
    } else {
        crypto.pbkdf2(pass, user.salt, 1000, 64, 'sha1', (err, key) => {
            const encryptedPass = key.toString('base64');
            if (user.password === encryptedPass) {
                const token = authenticated.signToken(email);
                localStorage.setItem('token', token);
                res.status(201).render('index', {resultado: 'null'});
            } else {
                res.status(401).json({info: 'usuario y o contraseña incorrecta'});
            }
        });
    }
});

routes.get('/logOut', (req, res) => {
    localStorage.removeItem('token');
    res.render('login');
});

module.exports = routes;