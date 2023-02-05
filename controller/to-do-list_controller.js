const express = require('express');
const { findById } = require('../models/to-do-list_schema');
const router = express.Router();

const todoList = require('../models/to-do-list_schema');

router.get("/new", (req,res) => {
    res.render("new.ejs");
});

router.post("/", (req,res) => {
    if(req.body.completed === 'on'){
        req.body.completed = true;
    }else{
        req.body.completed = false;
    }
     req.body.username = req.session.currentUser;
     console.log(req.body);
     todoList.create(req.body,(err, createdListItem) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/todolist');
        }
     });
});


router.get("/", (req,res) => {
    todoList.find({username:req.session.currentUser}, (err,todoListDetails) => {
        if(err){
            console.log(err);
        }else{
            res.render("index.ejs",{todoLists:todoListDetails})
        }
    })
})


router.get("/:id", (req,res) => {
    todoList.findById(req.params.id, (err, foundTodoList) => {
        if(err){
            console.log(err);
        }else{
            console.log(foundTodoList);
            res.render("view.ejs", {todoLists:foundTodoList});
        }
    });
});

router.delete("/:id",(req,res) => {
    todoList.findByIdAndDelete(req.params.id, (err, success) => {
        if(err){
            console.log(err);
        }else{
            res.redirect('/todolist');
        }
    })
})

router.put("/:id", (req,res) => {
    req.body.completed = req.body.completed === 'on'
    todoList.findByIdAndUpdate(req.params.id,req.body,(err,updatedList) => {
        if(err){
            console.log(err);
        }else{
            res.redirect("/todolist")
        }
    })
})

router.get("/:id/edit", (req,res) => {
    todoList.findById(req.params.id, (err, foundTodoList) => {
        if(err){
            console.log(err);
        }else{
            res.render("edit.ejs",{todoLists:foundTodoList});
        }
    })
})






module.exports = router;

