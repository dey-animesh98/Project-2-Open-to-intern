const mongoose = require("mongoose")

let validateUrl = function(logoLink){
    urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
    return urlRegex.test(logoLink)
}

const collegeSchema = mongoose.Schema({

    name:{
        type:String,
        required: [true, "College name is required."],
        trim: true,
        unique:true,
        lowercase:true 
    },
    fullName:{
        type:String,
        required: [true, "College full name is required."],
        trim: true
    },
    logoLink:{
        type:String,
        required: [true, "Logo link is required."],
        trim: true,
        validate: [validateUrl, "Please Provide valid url." ]
           

    },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, {timestamps:true}
)
 module.exports = mongoose.model("College",collegeSchema)

