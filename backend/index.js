require('dotenv').config()
const app = require('./server/app')
const conn = require('./db/conn')

const PORT = process.env.PORT
const hostname = process.env.DB_HOST

conn.sync()
.then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em http://${hostname}:${PORT}`)
    })
})
.catch((err)=>{
    console.error('Falha ao se conectar com o Banco de Dados!',err)
})