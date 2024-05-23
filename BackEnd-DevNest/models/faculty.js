const mongoose = require('mongoose');
const {Schema} = mongoose
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const facultySchema = new Schema({
    f_id :{
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
    email :{
        type : String,
        required : true,
        trim : true
    },
    gender :{
        type : String,
        trim : true
    },
    dob :{
        type : String,
        trim : true
    },
    joining_date :{
        type : String,
        trim : true
    },
    department :{
        type : String,
        trim : true
    },
    collage_code :{
        type : String,
        trim : true,
        required : true
    },
    contact:{
        type : Array,
        trim : true
    },
    address:{
        type : String,
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
    }
})

facultySchema.virtual('password')
    .set(function(password){
        this._password = password
        this.salt = uuidv4()
        this.ency_password = this.securePassword(password)
    })
    .get(function(){
        return this._password
    })

facultySchema.methods = {
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

module.exports = mongoose.model('Faculty',facultySchema)