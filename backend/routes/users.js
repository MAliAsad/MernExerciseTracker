const express=require("express");
const router=express.Router();
let User=require("../models/user.model");

router.get("/",(req,res)=>{
    User.find().then(users=>res.json(users)).catch(err=>res.status(400).json({Error:`Error occured: ${err}`}))
});

router.post("/",(req,res)=>{
    const username=req.body.username;
    const newUser=new User({username});

    newUser.save().then(()=>res.json({user: "user Added"})).catch(err=>res.status(400).json({Error:`Error occured: ${err}`}))
});
module.exports=router;