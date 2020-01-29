const Deal = require('../models/deal');
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
    const deal = new Deal(req.body);
    console.log(req.body)
    deal.save((err, data) => {

        if (err) {
            return res.status(400).json({
                error: "couldn't be created"
            })
            
        }
        res.json({ data })
    })
};