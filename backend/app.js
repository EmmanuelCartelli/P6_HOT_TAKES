const mongoose = require('mongoose');
const express = require('express')
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user')
const path = require('path');
const helmet = require('helmet');
const dotenv = require("dotenv").config({ encoding: "latin1" });

mongoose.connect(process.env.MONGOOSE_KEY,
{
	useNewUrlParser: true,
	useUnifiedTopology: true
})
.then(function(){
	console.log("Connected")
})
.catch(function(){
	console.log("Erreur")
});

const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
})

app.use(helmet());

app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes)
app.use('/api/auth', userRoutes) 

module.exports = app;