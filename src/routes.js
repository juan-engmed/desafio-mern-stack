const express = require('express');

const routes = express.Router();

const Company = require('./controllers/companies.controller')


routes.get('/', Company.index);

// Rotas da aplicação
routes.post('/api/companies', Company.create);
routes.get('/api/companies', Company.index);
routes.get('/api/companies.details/:_id', Company.details);



module.exports = routes;