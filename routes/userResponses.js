// routes/userResponse.js
const express = require('express');
const router = express.Router();
const userResponseController = require('../controllers/userResponseController');

router.post('/saveUserResponse', userResponseController.saveUserResponse);

module.exports = router;