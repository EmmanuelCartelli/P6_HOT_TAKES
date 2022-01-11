const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config({ encoding: "latin1" });


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        req.auth = decodedToken.userId; //on stocke le userId du token dans la requête pour pouvoir faire la vérification dans les controllers de sauce
        next();
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
