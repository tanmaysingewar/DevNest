const mongoose = require('mongoose');
const {Schema} = mongoose

const labSchema = new Schema({
    l_id :{
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    name :{
        type : String,
        required : true,
        trim : true
    },
    dec :{
        type : String,
        required : true,
        trim : true
    },
    year :{
        type : String,
        required : true,
        trim : true
    },
    branch :{
        type : String,
        required : true,
        trim : true
    },
    sem :{
        type : String,
        required : true,
        trim : true
    },
    section :{
        type : String,
        required : true,
        trim : true
    },
    collage_code : {
        type : String,
        required : true,
        trim : true
    },
    // Other Parameters
    faculties : [
        {
            type : Schema.Types.ObjectId,
            ref : "Faculty",
            required : true
        }
    ]
})

module.exports = mongoose.model('Lab',labSchema)