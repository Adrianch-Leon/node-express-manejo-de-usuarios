const mysql = require('mysql');
const fs = require('node:fs');
const { resolve } = require('node:path');
require('dotenv').config();




async function consultaMySqL(query, values) {



    // Use the configuration to connect to the MySQL database

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    });

    try {
        await new Promise((resolve, reject) => {
            connection.connect((err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        }); 
        try {
            const results = await new Promise ((resolve,reject) =>{
                connection.query(query, values, (err, results, fields) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                });
            });
            connection.end;
            return results;
        } catch (error) {
            console.error('Error executing query:', error);
            return error;
        }
        
    } catch (error) {
        console.error('Error connecting to database:', error);
        return error;
    }


}



module.exports = { consultaMySqL };
