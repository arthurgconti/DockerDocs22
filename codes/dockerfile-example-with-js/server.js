const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res)=>{
    res.send('Olá bem vindo ao servidor express')
})

app.get('/docker',(req,res)=>{
    res.send('Estamos rodando essa aplicação em um container DOCKER')
})

app.get('/so',(req,res)=>{
    res.send('SO é muito interessante')
})
app.get('/monitoria',(req,res)=>{
    res.send('As monitorias ocorrem com o monitor Arthur Conti as terças e quintas : )')
})

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`)
})


