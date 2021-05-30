const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')

require('dotenv').config()

app.use(express.json())

app.get('/', (req,res) => {
    let name = 'Guest';
    jwt.verify(req.body.token, process.env.JSONWEBTOKEN_SECRET, (err,decoded) => {
        if(err){
            res.json({
                status: "Failure"
            })
        } else {
            res.json({
                status: "succes",
                message : `Hello ${decoded.name}, you are ${decoded.age}!`
            })
        }
    })
    res.send(`<h1> Welcome ${name} </h1>`)
})


app.post('/login', (req,res) => {
    if(req.body.name !== "rachid" || req.body.password !== '123456'){
        res.send({
            status : "Failure"
        })
    } else {
        res.json({
            status: "Succes",
            token: jwt.sign({
                name: "rachid",
                age: 30,
            }, process.env.JSONWEBTOKEN_SECRET),
        })
    }
})



app.listen(8080, () => {
    console.log('Server up and running on http://localhost:8080')
})