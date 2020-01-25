const express = require('express');
const router = express.Router();

const { create } = require('../controllers/dealregistration');
const { requireSignin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post("/dealregistration/create/:userId", create);

router.param("userId", userById);

module.exports = router