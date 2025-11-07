var express = require('express');
var router = express.Router();
var users=require("../models/users")
var company=require("../models/company")
var project=require("../models/project")
var notify=require("../models/notification")
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//users
router.get("/hello",(req,res)=>{
  res.send({"message":"Welcome to parent Company"})
})
router.post("/companyEntrie",(req,res)=>{
  var newuser=new company(req.body)
  newuser.save()
  .then(()=>res.send({"message":"Succesfully entered details"}))
  .catch((e)=>console.log(e));
})
router.get("/companyDetails/:name",(req,res)=>{
  let name=req.params.name;
  company.findOne({"companyName":name})
  .then((data)=>res.send(data))
  .catch((e)=>console.log(e));
})


//notifications

router.post("/notificationSend",(req,res)=>{
  var newnotify = new notify(req.body)
  newnotify.save()
  .then(()=>res.send({"message":"Notification Sent"}))
  .catch((e)=>console.log(e));
})
router.get("/notificationRecieve/:email",(req,res)=>{
  let name=req.params.email;  
  notify.find({"fromemail":name})
  .then((data)=>res.send(data))
  .catch((e)=>console.log(e));
})

//project

router.post("/projectsend",(req,res)=>{
  let newProject=new project(req.body)
  newProject.save()
  .then((data)=>{
    company.findOne({"companyName":req.body.vendorCompany})
    .then((data))
    company.updateOne({"companyName":req.body.vendorCompany},{"projectAccept":})
  })
})
module.exports = router;
