const express = require("express");
const router = express.Router()
const bcrypt =require("bcrypt");

const user = require("../models/user_schema")

router.get("/new",(req,res) => {
    res.render("users/new.ejs");
});

router.get("/", (req,res) => {
    user.find({}, (err,userDetail) => {
        if(err){
            console.log(err);
        }else{
            res.render("index.ejs",{user:userDetail});
        }
    })
})


router.post("/", (req,res) => {
    const randomSaltSync =Math.floor(Math.random()*10) +1;
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync
        (randomSaltSync));
    user.create(req.body, (err,createdUser) => {
        if(err){
            console.log(err);
            res.render("users/new.ejs", { error: "An error occurred while trying to create an account. Please try again." });
        }else{
            console.log("Successfully Created User: " + createdUser.username);
            res.redirect("/");
        }
    });
});


module.exports = router;