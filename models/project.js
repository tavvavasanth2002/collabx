var mongoose=require("mongoose");
var projectSchema=new mongoose.Schema({
    projectName:String,
    projectDescription:String,
    projectStatus:String,
    projectTime:String,
    projectPriority:String,
    vendorCompany:String,
    parentCompany:String
})
var project=mongoose.model("projects",projectSchema)
module.exports=project;