import express from 'express'
import bodyParser from 'body-parser'
import { router as MainRouter } from './src/router'
import cors from 'cors'
import  session from 'express-session'
const app = new express()
const PORT = 8081

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  credentials: true
}))

//express session for authentication
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {  }
}))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(MainRouter) //enpoint route
app.listen(PORT)
console.log(`Service is running on port ${PORT}.`)