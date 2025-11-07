var express = require('express');
var router = express.Router();
var bcryptjs=require("bcryptjs");
var users=require("../models/users");
var nodemailer=require("nodemailer");
var jwt=require("jsonwebtoken");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post("/register",(req,res)=>{
  users.findOne({"userName":req.body.userName})
  .then(async (data)=>{
    if(data)
      res.send({"message":"userName is already exist"});
    else{
      var newUser=new users({
        userName:req.body.userName,
        password: await bcryptjs.hash(req.body.password,10),
        email:req.body.email,
        phone:req.body.phone,
        company:req.body.company,
        role:req.body.role
      })
      newUser.save()
      .then(()=>res.send({"message":"welcome to parent company"}))
      .catch((e)=>console.log(e));
      var transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
          user:"tavvavasanth2003@gmail.com",
          pass: "pvjf dcik ujqu apzi",
        }
      })
      var mailOptions={
        from:"tavvavasanth2003@gmail.com",
        to:req.body.email,
        subject:"welcome",
        text:"Welcome to the parent company",
      }
      transporter.sendMail(mailOptions,(err)=>{
        if(err){
          console.log("something went wrong");
        }
        else{
          console.log("sent mail")
        }
      })
    }
  })
})
router.post("/login",(req,res)=>{
  users.findOne({"userName":req.body.userName})
  .then(async (data)=>{
    if(data){
    if(await bcryptjs.compare(req.body.password,data.password)){
      let token=await jwt.sign({"userid":data._id,"role":data.role},process.env.secret,{expiresIn:"20m"})
      res.send({"message":"login sucess","token":token,"role":data.role});
    }
    else{
      res.send({"message":"password is wrong"});
    }
  }
  else{
    res.send({"message":"username is not exist"});
  }
  })
  .catch((e)=>console.log(e))
})
router.post("/forgetpassword",(req,res)=>{
  users.findOne({"email":req.body.email})
  .then(async (data)=>{
    if(data){
    if(data.userName==req.body.userName){
      let newpassword=await bcryptjs.hash(req.body.newpassword,10);
      await users.findOneAndUpdate({"_id":data._id},{"password":newpassword})
      res.send({"message":"password is updated"})
    }
    else
      res.send({"message":"userName is wrong"});
  }
  else{
    res.send({"message":"email is not registred"})
  }
  })
})
module.exports = router;
