const express = require('express')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://astaarush004:astaarush004@cluster1.8qcuf.mongodb.net/').then(()=> console.log('Mongodb connectedd'))
.catch((error)=> console.log(error));

const app = express()
const PORT = process.env.PORT || 5000;