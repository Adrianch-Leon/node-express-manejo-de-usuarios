const connectionMySql = require('../utils/utils.js');
const argon2 = require('argon2');



class clientesController {


    //function to obtain a client by id
    static async getById(req, res) {
        const query = "SELECT * FROM clientes WHERE id = " + req.params.id;
        var values = null;
        try {
            const results = await  connectionMySql.consultaMySqL(query, values);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("Hola sus datos son: " + JSON.stringify(results));

        } catch (error) {
            console.error(error);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end("Error al recibir los datos del servidor");
        }
    }

    //function to create a client
    static async create(req, res) {

        const { nombre, apellidos, usuario, contrasenna, email} = req.body;
        // Hash the password using Argon2
        const hashedPassword = await argon2.hash(contrasenna);

        //take the actual time
        const date = new Date();
        const creacion = date.toISOString().split('T')[0] ;
        const ultimo_login = date.toISOString().split('T')[0];


        const query = "INSERT INTO clientes (nombre, apellido, usuario, contrasenna, email, creacion, ultimo_login) VALUES (?, ?, ?, ?, ?, ?, ?)";
        const values = [nombre, apellidos, usuario, hashedPassword , email, creacion, ultimo_login];


        try {
            const respuesta = await connectionMySql.consultaMySqL(query, values);
            if(respuesta instanceof Error){
                throw new Error(respuesta.message);
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("Sus datos han sido guardados correctamente");

        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end("An error ocurred: "+ error);
        }
    }

    static async put(req,res) {
        const {nombre, apellidos, usuario, contrasenna, email} = req.body;
        // Hash the password using Argon2
        const hashedPassword = await argon2.hash(contrasenna);


        const query = "UPDATE clientes SET (nombre, apellido, usuario, contrasenna, email) VALUES (?, ?, ?, ?, ?) WHERE id =" +  req.params.id ;
        const values = [nombre, apellidos, usuario, hashedPassword , email];


        try {
            const respuesta = await connectionMySql.consultaMySqL(query, values);
            if(respuesta instanceof Error){
                throw new Error(respuesta.message);
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end("Sus datos han sido guardados correctamente");

        } catch (error) {
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.end("An error ocurred: "+ error);
        }

    }

    static async delete() {
        console.log("se ejecuta el método delete");
    }





}

module.exports = clientesController;
