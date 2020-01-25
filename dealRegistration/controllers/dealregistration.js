const Dealregistration = require('../models/dealregistration');
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
    const dealregistration = new Dealregistration(req.body);
    console.log(req.body)
    dealregistration.save((err, data) => {

        if (err) {
            return res.status(400).json({
                error: "couldn't be created"
            })
            
        }
        res.json({ data })
    })
};