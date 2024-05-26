const express = require('express');
const clientesRouter = require('./routes/clientes.js')



const app = express();

app.use('/api/clientes', clientesRouter);

const PORT = process.env.PORT ?? 1234;

app.listen(PORT,()=>{
    console.log("server listening on http://localhost:",PORT);
})



