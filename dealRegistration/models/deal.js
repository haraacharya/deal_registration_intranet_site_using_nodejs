const mongoose = require('mongoose');


const dealSchema = new mongoose.Schema({
    geo: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        //required: true
    },
    client_name: {
        type: String,
        //required: true
    },
    client_address: {
        type: String,
        //required: true
    },
    client_contact_person: {
        type: String,
        //required: true
    },
    description: {
        type: String,
        //required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    { timestamps: true}
);

module.exports = mongoose.model("Deal", dealSchema)