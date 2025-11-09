const mongoose=require("mongoose")

const signupDetails =new mongoose.Schema({
    name :{type:String,required:true, trim: true, minlength: 2, maxlength: 100},
    email:{
        type:String,
        required:true,
        lowercase: true,
        trim: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
    },
    password :{type:String,required:true, minlength: 8},
    role: { type: String, enum: ["user","admin"], default: "user" }
})
 module.exports=mongoose.model("SignUpDetail",signupDetails)
