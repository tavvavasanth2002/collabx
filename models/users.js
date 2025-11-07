var mongoose=require("mongoose")
var userSchema=new mongoose.Schema({
    userName:String,
    password:String,
    email:String,
    phone:String,
    company:String,
    role:String,
})
var user=mongoose.model("users",userSchema)
module.exports=user;