const jwt = require('jsonwebtoken');
const connectionMySql = require('../utils/utils.js');
const argon2 = require('argon2');
const clientesController = require('../controllers/clientes.js')



function crearJWT(user) {
    // Generate a JWT token
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
    //res.json({ token });
}

exports.verifyToken =  (req, res) => {
    try {
        
        if(req.headers.authorization == undefined) return false;
        const token = req.headers.authorization.split(' ')[1];        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;

    } catch (error) {
        return error;
    }

}


exports.login = async (req, res) => {
    // Verify the user's credentials
    const { usuario, contrasenna } = req.body;

    console.log(usuario);
    //comprobar si el usuario existe
    var query = "SELECT * FROM clientes WHERE usuario = ?";
    var values = [usuario];

    var result = await connectionMySql.consultaMySqL(query, values);

    try {

        if (result == '') {
            throw new Error(result.message);
        }

        //probe if pass in database is the same that the pasword in hashed
        const hashedPassword = result[0].contrasenna;
        if (await argon2.verify(hashedPassword, contrasenna)) {

            const date = new Date();
            const ultimo_login = date.toISOString().split('T')[0];


            query = "UPDATE clientes SET ultimo_login = ? WHERE id =" + result[0].id;
            values = [ultimo_login];


            try {
                result = await connectionMySql.consultaMySqL(query, values);
                if (result instanceof Error) {
                    throw new Error(result.message);
                }
                res.writeHead(200, { 'Content-Type': 'text/html' });
                var token = crearJWT(result[0])
                res.end("Su usuario se ha logueado correctamente:" + token);
                console.log(result[0]);
                console.log(token);

            } catch (error) {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end("An error ocurred: " + error);
            }

        }

    } catch (error) {
        console.error(error.message);
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end("Su usuario no aparece en la base de datos o ocurrió un error \n" + error);
        return;
    }



};