const express = require('express');
const routers = require('./api');

const app = express();
const port = 3000; // Variável ambiente 

app.use(express.json())
app.use('/', routers); 

// sequelize.sync().then(() => { 
//     console.log('Banco conectado com sucesso!');
// });

app.listen(port, () => { 
    console.log(`App rodando na porta ${port}`);
});






