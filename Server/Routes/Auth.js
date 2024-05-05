const express = require('express');
const router = express.Router();
const {createUser,loginUser,Check,logout} = require('../Controllers/AuthControler');

router.post('/signup',createUser);
router.post('/login',loginUser);
router.post('/verifyToken',Check);
router.get('/logout',logout);
module.exports  = router;