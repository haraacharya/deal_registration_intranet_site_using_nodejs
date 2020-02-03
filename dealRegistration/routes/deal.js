const express = require('express');
const router = express.Router();

const { create, dealById, read } = require('../controllers/deal');
const { requireSignin, isAuth } = require('../controllers/auth');
const { userById } = require('../controllers/user');

router.post("/deal/create/:userId", requireSignin, create);
router.get("/deal/:dealId", read)
router.param("userId", userById);
router.param("dealId", dealById);

module.exports = router