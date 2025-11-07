var mongoose=require("mongoose");
var notificationSchema=new mongoose.Schema({
    fromemail:String,
    toemail:String,
    subject:String,
    message:String,
    priorty:String
})
var notifiy=mongoose.model("notification",notificationSchema)
module.exports=notifiy;