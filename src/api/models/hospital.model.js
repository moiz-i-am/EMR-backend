const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        maxlength: 128,
    },
    location:{
        type:String,
        required:true,
    },
    doctors:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ]

});


module.exports = mongoose.model('Hospital', hospitalSchema);
