const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config({ encoding: "latin1" });

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            email: req.body.email,
            password: hash,
        });
        user.save()
        .then(() => res.status(201).json({message: 'User created !'}))
        .catch((err) => res.status(400).json({err}))
    })
};

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(!user){
            return res.status(401).json({error: 'utilisateur non trouvé !'})
        }
        console.log(req.body.password);
        console.log(user.password)
        bcrypt.compare(req.body.password, user.password)
        .then((valid) => {
            console.log("verif")
            if(!valid){
                return res.status(401).json({error: 'Mot de passe incorect !'})
            }
            res.status(200).json({
                userId: user._id,
                token: jwt.sign({userId: user._id}, process.env.TOKEN_KEY, {
                    expiresIn: "24h",
                })
            })
        })
        .catch((err) => res.status(500).json({err}))
    })
    .catch((err) => res.status(500).json({err}))
}


