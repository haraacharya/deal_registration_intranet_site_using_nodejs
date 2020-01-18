const express = require('express');
const router = express.Router();


const { signup, signin, signout, requireSignin } = require("../controllers/auth");
const { userSignupValidator } = require("../validator/index")

router.post("/signup", userSignupValidator, signup);
router.post("/signin", signin);
router.get("/signout", signout);
//test route
router.get("/hello", requireSignin, (req, res) => {
    res.send("hello there")
})

router.get("/", (req, res) => {
    res.send("deal reg site")
});


module.exports = router;