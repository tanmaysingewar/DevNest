const mongoose = require('mongoose');
const {Schema} = mongoose

const problemSchema = new Schema({
    practical_id : {
        type : Schema.Types.ObjectId,
        ref : "Practical",
        required : true,
        trim : true
    },
    problem_name : {
        type : String,
        required : true,
        trim : true
    },
    problem_statement :{
        type : String,
        required : true,
        trim : true
    },
    problem_dec :{
        type : String,
        required : true,
        trim : true
    },
    input_format :{
        type : String,
        required : true,
        trim : true
    },
    output_format :{
        type : String,
        required : true,
        trim : true
    },
    // Other Parameters
    example : [
        {
            input : {
                type : String,
                required : true,
                trim : true
            },
            output : {
                type : String,
                required : true,
                trim : true
            },
            explanation : {
                type : String,
                required : true,
                trim : true
            }

        }
    ],
    test_cases : [
        {
            input : {
                type : String,
                required : true,
                trim : true
            },
            output : {
                type : String,
                required : true,
                trim : true
            },
        }
    ]
})

module.exports = mongoose.model('Problem',problemSchema)