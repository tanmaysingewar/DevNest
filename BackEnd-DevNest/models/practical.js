const mongoose = require('mongoose');
const {Schema} = mongoose

const practicalSchema = new Schema({
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
    lab_id :{
        type : Schema.Types.ObjectId,
        ref : "Lab",
        required : true,
        trim : true
    },
    // Other Parameters
})

module.exports = mongoose.model('Practical',practicalSchema)