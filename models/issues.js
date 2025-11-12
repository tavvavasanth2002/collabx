var mongoose=require("mongoose");
var issueSchema=new mongoose.Schema({
    issues:String,
    projectName:String,
    date:String,
    parentCompany:String,
    status:String,
})
var issues=mongoose.model("issue",issueSchema)
module.exports=issues;