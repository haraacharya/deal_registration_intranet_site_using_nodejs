const User =  require('../models/user');
const { errorHandler } = require('../helpers/dbErrorHandler');
const jwt = require('jsonwebtoken'); //to generate signed token
const expressJwt = require('express-jwt'); //for authorization check


exports.signup = (req, res) => {
    //console.log(req, res);
    const user = new User(req.body)
    user.save((err, user) => {
        if(err) {
            return res.status(400).json({
                err: errorHandler(err)                
            })
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user
        })

    })
}; 

exports.signin = (req, res) => {
    const { email, password } = req.body;
    User.findOne ( { email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User with that email doesn't exist. Please signup."
            })
        }
        //if a user is found, make sure the email and password match
        //create authentication method in signup
        if (!user.authenticate(password)) {
            return res.status(401).json({
                error: "Email and password doesn't match."
            })
        }        
        //generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        //persist the token as t
        res.cookie("t", token, { expire: new Date() + 9999 }, {path: '/'}, { signed: true });
        //return response with user and token to frontend
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role }});

    })
}

exports.signout = (res, req) => {
    res.clearCookie("t", {path: '/'});
    res.json({ message: "signout success" });
}

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
})

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id === req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: "Access denied"
        })
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        res.status(403).json({
            error: "Admin resource! Access denied"
        })
    }
    next()
}