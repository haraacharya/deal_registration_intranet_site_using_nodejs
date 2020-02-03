const Deal = require('../models/deal');
const { errorHandler } = require('../helpers/dbErrorHandler')


exports.dealById = (req, res, next, id) => {
    Deal.findById(id).exec((err, deal) => {
        if (err || !deal) {
            return res.status(400).json({
                error: "Deal not found"
            });
        }
        req.deal = deal
        next();
    })
}

exports.read = (req, res) => {
    return res.json(req.deal)
}

exports.create = (req, res) => {
    const deal = new Deal(req.body);
    const { geo, country, state } = deal
    if (!geo || !country || !state) {
        return res.status(400).json({
            error: "All fields are not filled"
        })
    }
    console.log(req.body)
    deal.save((err, data) => {

        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
            
        }
        res.json({ data })
    })
};
