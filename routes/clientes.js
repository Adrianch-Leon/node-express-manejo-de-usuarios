const express = require('express');
const clientesController = require('../controllers/clientes.js')



const clientesRouter = express.Router();

clientesRouter.use(express.json());
clientesRouter.use(express.urlencoded({ extended: true }));


clientesRouter.post('/',clientesController.create);
clientesRouter.get('/:id',clientesController.getById);
clientesRouter.delete('/:id',clientesController.delete);
clientesRouter.put('/:id',clientesController.put);


module.exports =  clientesRouter;