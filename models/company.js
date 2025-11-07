var mongoose=require("mongoose")
var companySchema=new mongoose.Schema({
    companyName:String,
    companyDescription:String,
    email:String,
    phone:String,
    projectAccept:Number,
    projectComplete:Number,
    projectProgress:Number,
    projectReject:Number,
    role:String
})
var company=mongoose.model("company",companySchema)
module.exports=company;