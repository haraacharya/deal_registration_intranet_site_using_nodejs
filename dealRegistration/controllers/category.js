const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler')

exports.create = (req, res) => {
    const category = new Category(req.body);
    console.log(req.body)
       
    category.save((err, data) => {

        if (err) {
            return res.status(400).json({
                error: "category couldn't be created"
            });
            
        }
        res.json({ data })
    });
};