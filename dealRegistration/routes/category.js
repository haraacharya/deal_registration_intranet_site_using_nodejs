const express = require('express');
const router = express.Router();

const { create } = require('../controllers/category');
const { userById } = require('../controllers/user');

router.param("userId", userById);

router.post("/category/create/:userId", create);



module.exports = router