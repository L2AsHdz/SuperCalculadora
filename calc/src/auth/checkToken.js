const webtoken = require('jsonwebtoken');
const redisManager = require('../model/redisManager');
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const tokensecret = process.env.SECRET_TOKEN;

module.exports.signToken = id => {
    return webtoken.sign({ id }, tokensecret, {
        expiresIn: 120 ,
    });
}

module.exports.checkToken = async (req, res, next) => {
    const token = localStorage.getItem('token');
    console.log(token);
    if (!token) {
        return res.sendStatus(403).json({error: 'Token no existe'});
    }
    webtoken.verify(token, tokensecret, async (err, decoded) => {
        if (decoded) {
            const { id } = decoded;
            let existe = await redisManager.exists(id);
            if (existe !== 0) {
                req.user = id;
                next();
            } else {
                res.status(403).json({ error: 'Usuario no existe' });
            }
        } else {
            res.status(403).json({ error: 'decode no existe' });
        }
    });
};