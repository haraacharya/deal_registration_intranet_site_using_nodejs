const express = require('express');
const router = express.Router();

const { create } = require('../controllers/deal');
const { requireSignin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post("/deal/create/:userId", create);

router.param("userId", userById);

module.exports = router