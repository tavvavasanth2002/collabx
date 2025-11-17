var mongoose=require("mongoose")
var companySchema=new mongoose.Schema({
    companyName:String,
    companyDescription:String,
    email:String,
    phone:String,
    role:String
})
var company=mongoose.model("company",companySchema)
module.exports=company;