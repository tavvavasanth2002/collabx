var mongoose=require("mongoose");
var notificationSchema=new mongoose.Schema({
    fromemail:String,
    toemail:String,
    subject:String,
    projectName:String,
    message:String,
    priorty:String,
    tasks:String,
    issues:String,
    date:String
})
var notifiy=mongoose.model("notification",notificationSchema)
module.exports=notifiy;