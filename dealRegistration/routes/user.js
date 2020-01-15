const express = require('express');
const router = express.Router();

const { signup} = require("../controllers/user");

router.post("/signup", signup);
router.get("/", (req, res) => {
    res.send("deal reg site")
});


module.exports = router;