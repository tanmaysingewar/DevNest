const mongoose = require('mongoose');
const {Schema} = mongoose
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const studentSchema = new Schema({
    name :{
        type : String,
        required : true,
        trim : true
    },
    email :{
        type : String,
        required : true,
        trim : true
    },
    gender :{
        type : String,
        required : true,
        trim : true
    },
    dob :{
        type : String,
        required : true,
        trim : true
    },
    currentYear :{
        type : String,
        required : true,
        trim : true
    },
    currentSem :{
        type : String,
        required : true,
        trim : true
    },
    branch :{
        type : String,
        required : true,
        trim : true
    },
    section : {
        type : String,
        required : true,
        trim : true
    },
    rollNo :{
        type : Number,
        required : true,
        trim : true
    },
    regNo :{
        type : Number,
        required : true,
        trim : true
    },
    contact:{
        type : Array,
        required : true,
        trim : true
    },
    address:{
        type : String,
        required : true,
        trim : true
    },
    collage_code : {
        type : String,
        required : true,
        trim : true
    },
    ency_password : {
        type : String,
        required : true
    },
    salt : {
        type: String,
        required :true,
        unique : true
    },
    // Other Parameters
})

studentSchema.virtual('password')
    .set(function(password){
        this._password = password
        this.salt = uuidv4()
        this.ency_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })

studentSchema.methods = {
    authenticate: function (plainPassword){
        return this.securePassword(plainPassword) == this.ency_password
    },
    securePassword : function (password){
        if(!password){
            return ''
        }
        try{
            return crypto.createHash(process.env.PASSWORD_SHA, this.salt)
            .update(password)
            .digest(process.env.PASSWORD_DIGEST)
        }catch(e){
            return ''
        }
    }
}

module.exports = mongoose.model('Student',studentSchema)