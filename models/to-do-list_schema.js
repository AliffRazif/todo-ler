const mongoose = require('mongoose');

const todolistSchema = new mongoose.Schema({
task: {type: String, required: true},
type: {type: String, required: true},
completed: Boolean,
notes: {type: String},
dateTaskDue: {type:String},
dateCreated: {type:Date, required:true},
username: {type:String, required: true}

},{timestamps:true});

const todoList = mongoose.model('todoList',todolistSchema);

module.exports = todoList
