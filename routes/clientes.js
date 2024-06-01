const express = require('express');
const clientesController = require('../controllers/clientes.js')



const clientesRouter = express.Router();

clientesRouter.use(express.json());
clientesRouter.use(express.urlencoded({ extended: true }));


clientesRouter
.route('/')
.post(clientesController.create)
.delete(clientesController.delete);

clientesRouter
.route('/:id')
.get(clientesController.getById);

clientesRouter
.route('/actualizar/:id')
.put(clientesController.put);

clientesRouter
.route('/login')
.put(clientesController.login);


module.exports =  clientesRouter;