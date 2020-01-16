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
                err: "User with that email doesn't exist. Please signup."
            })
        }
        //if a user is found, make sure the email and password match
        //create authentication method in signup
        if (!user.authenticate) {
            return res.status(401).json({
                error: "Email and password doesn't match."
            })
        }        
        //generate a signed token with user id and secret
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
        //persist the token as t
        res.cookie("t", token, { expire: new Date() + 9999 });
        //return response with user and token to frontend
        const { _id, name, email, role } = user;
        return res.json({ token, user: {_id, name, email, role}});

    })
}