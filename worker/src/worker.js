const express = require('express');
const routes = require('./routes/workerRoutes');
const server = express();

//Configurando puerto
server.set('port', 3002);

//Middlewares
server.use((req, res, next) => {
    console.log(`${req.url} - ${req.method}`);
    next();
});

//Routes
server.use(routes);

//Start server
server.listen(server.get('port'), () => {
    console.log('Server on port ', server.get('port'));
});