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

router.post("/sendNotification",(req,res)=>{
  var newnotify = new notify(req.body)
  newnotify.save()
  .then(()=>res.send({"message":"Notification Sent"}))
  .catch((e)=>console.log(e));
})
router.get("/emailNotification/:email",async (req,res)=>{
  let name=req.params.email;
  await notify.find({"fromemail":name}).sort({date:-1})
  .then((data)=>res.send(data))
  .catch((e)=>console.log(e));
})
router.get("/returnemail/:email",async (req,res)=>{
  let email=req.params.email;
  let {page,limit}=req.query
  let skipnum=(page-1)*limit;
  await notify.find({"toemail":email}).sort({date:-1}).skip(skipnum).limit(limit)
  .then((data)=>res.send(data))
  .catch((e)=>console.log(e))
})
//project
router.get("/completedProjects/:company",(req,res)=>{
  let company=req.params.company
  project.find({"projectStatus":"completed","vendorCompany":company})
  .then((data)=>res.send(data))
  .catch((e)=>console.log(e))
})
router.get("/progressProjects/:company",(req,res)=>{
  let company=req.params.company
  project.find({"projectStatus":"progress","vendorCompany":company})
  .then((data)=>res.send(data))
  .catch((e)=>console.log(e))
})
router.get("/rejectProjects/:company",(req,res)=>{
  let company=req.params.company
  project.find({"projectStatus":"reject","vendorCompany":company})
  .then((data)=>res.send(data))
  .catch((e)=>console.log(e))
})
router.get("/undecidedProjects/:company",(req,res)=>{
  let company=req.params.company
  project.find({"projectStatus":"undecided","vendorCompany":company})
  .then((data)=>res.send(data))
  .catch((e)=>console.log(e))
})
router.put("/updateProject/:name",(req,res)=>{
  let name=req.params.name
  console.log(name);
  project.findOneAndReplace({"projectName":name},req.body)
  .then(()=>res.send({"message":"updated the project"}))
  .catch((e)=>console.log(e));
})

module.exports = router;
