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