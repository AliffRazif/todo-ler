const express = require("express");
const router = express.Router();
const bcrypt =require("bcrypt");

const user = require("../models/user_schema")

router.get("/new", (req,res) => {
    res.render("sessions/new.ejs");
});

router.post("/", (req, res) => {
    user.findOne({ username: req.body.username }, (err, foundUser) => {
        if (err) {
            console.log(err);
            res.render("sessions/new.ejs", { error: "An error occurred while trying to log in. Please try again." });
        } else {
            if (foundUser) {
                if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                    req.session.currentUser = foundUser;
                    res.redirect("/");
                } else {
                    res.render("sessions/new.ejs", { error: "Invalid username or password." });
                }
            } else {
                res.render("sessions/new.ejs", { error: "User not found. Please create an account." });
            }
        }
    });
});


router.delete("/", (req,res) => {
    req.session.destroy(() => {
        res.redirect("/sessions/new")
    });
});

module.exports = router;