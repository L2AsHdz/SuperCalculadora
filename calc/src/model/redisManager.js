const keys = require('../keys');
const redis = require('redis');

const client = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
});

module.exports.exists = (email) => {
    return new Promise((resolve, reject) => {
        client.exists(email, (erro, exist) => {
            if (erro) {
                reject(0);
            } else {
                resolve(exist);
            }
        });
    });
};

module.exports.setUser = (email, pass, salt) => {
    return new Promise((resolve, reject) => {
        resolve(client.hset(email, 'password', pass, 'salt', salt));
    });
};

module.exports.getUser = email => {
    return new Promise((resolve, reject) => {
        client.hgetall(email, (error, exist) => {
            if (error) {
                reject(0);
            }
            else {
                resolve(exist);
            }
        });
    });
};

module.exports.insertOP = async (usuario, operacion) => {
    let usr = await this.getUser(usuario);
    return new Promise((resolve, reject) => {
        if (usr) {
            let llave = `history-${usuario}`;
            console.log('llave: ', llave, '\noperacion: ', operacion);
            resolve(client.sadd(llave, operacion));
        } else {
            reject('Error al guardar operacion');
        }
    });
};

module.exports.getHistory = (user) => {
    return new Promise((resolve, reject) => {
        let llave = `history-${user}`;
            console.log('llave: ', llave);
        client.smembers(llave, (error, history) => {
            if (error) {
                reject(0);
            } else {
                resolve(history);
            }
        });
    })
};