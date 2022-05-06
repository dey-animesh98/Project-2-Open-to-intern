const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

let validateEmail = function(email) {
    let emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return emailRegex.test(email)
}

let validateMobile = function(mobile){
    let mobileRegex = /^[6-9]\d{9}$/
    return mobileRegex.test(mobile)
}

const internSchema = mongoose.Schema({
    name: {
        type:String,
        required: [true, "Name is required."],
        trim: true,
        lowercase:true
    },
    email:{
        type:String,
        required:[true, "Email is required"],
        trim:true,
        unique:true,
        validate:[validateEmail, "Please enter a valid email id"]
    },
    mobile:{
        type:String,
        required:[true, "Mobile no is required"],
        trim:true,
        unique:true,
        validate:[validateMobile, "Please enter a valid email id"]
    },
    collegeId:{
        type:ObjectId,
        trim:true,
        refs: "College"
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
}, {timestamps:true}
)
 module.exports = mongoose.model("Intern",internSchema)
