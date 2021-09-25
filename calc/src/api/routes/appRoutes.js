const express = require('express');
const routes = express.Router();
// const path = require('path');

routes.use('/api', apiRouter);

routes.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, '../views/404.html'));
});

module.exports = routes;