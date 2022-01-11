const userCtrl = require('../controllers/user');
const express = require('express');
const user = require('../models/user');
const router  = express.Router();

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;