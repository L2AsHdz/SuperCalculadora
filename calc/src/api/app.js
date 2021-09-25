const express = require('express');
// const path = require('path');
const routes = require('./routes/apiRoutes');
const server = express();

//Configurando puerto
server.set('port', 3001);

//Configurando Express para usar EJS
// server.set('views', path.join(__dirname, 'views'));
// server.set('view engine', 'ejs');

//Middlewares
server.use((req, res, next) => {
    console.log(`${req.url} - ${req.method}`);
    next();
});

//Static files
// server.use(express.static(path.join(__dirname, 'public')));

//Routes
server.use(routes);

//Start server
server.listen(server.get('port'), () => {
    console.log('Server on port ', server.get('port'));
});