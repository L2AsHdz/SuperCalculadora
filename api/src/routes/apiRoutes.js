const express = require('express');
const opRoutes = require('./opRoutes');
const routes = express.Router();

routes.use('/api', opRoutes);
module.exports = routes;