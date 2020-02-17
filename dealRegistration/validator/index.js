exports.userSignupValidator = (req, res, next) => {
    req.check('usertype').not().isEmpty().withMessage('Please select userType')
    req.check('name', 'Name is required').notEmpty()
    req.check('email', 'Email must contain @')
        .matches(/.+\@.+\..+/)
    req.check('email', 'Email must be 4 to 50 characters long')
        .isLength({
            min: 4,
            max: 50
        });
    req.check('password', 'Password is required').notEmpty()
    req.check('password')
        .isLength({ min: 6})
        .withMessage('Password must contain at least 6 characters')

    const errors = req.validationErrors();
    if (errors) {
        console.log(errors)
        const firstError = errors.map(error => error.msg)[0];
        return res.status(400).json({error: firstError})
    }
    next();
}