const express = require('express');
const clientesController = require('../controllers/clientes.js')
const authController = require('../security/auth-controller.js');



const clientesRouter = express.Router();

clientesRouter.use(express.json());
clientesRouter.use(express.urlencoded({ extended: true }));

clientesRouter
.route('/login')
.put(authController.login);

// Apply middleware to the clientesRouter
clientesRouter.use((req, res, next) => {
    // Perform some action or check before proceeding to the route handler
    console.log('Request received for clientesRouter');
    const analisis = authController.verifyToken(req, res);
    console.log(analisis);
    // Call the next middleware function
    if (analisis instanceof Error){
        res.writeHead(400,{ "Error" : analisis.message});
        res.end();
    }else if(analisis)  {
        next();
    }else {
        res.writeHead(401, { 'Error': 'Unauthorized' });
        res.end();
    }  
    return;
  });

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


module.exports =  clientesRouter;