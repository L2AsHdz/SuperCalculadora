const express = require('express');
const path = require('path');
const routes = require('./routes/indexRoutes');
const loginRoutes = require('./routes/loginRoutes');
const server = express();

//Configurando puerto
server.set('port', 3000);

//Configurando Express para usar EJS
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');

//Middlewares
server.use((req, res, next) => {
    console.log(`${req.url} - ${req.method}`);
    next();
});

//Static files
server.use(express.static(path.join(__dirname, 'public')));

//Routes
server.use(loginRoutes);
server.use(routes);

routes.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, './views/404.html'));
});

//Start server
server.listen(server.get('port'), () => {
    console.log('Server on port ', server.get('port'));
});