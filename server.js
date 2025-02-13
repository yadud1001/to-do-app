const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const todoController = require('./Controller/to-do-controller');

//mongo db config
const dbURI = 'mongodb+srv://duday:100102@yadud.un93f.mongodb.net/duday?retryWrites=true&w=majority&appName=yadud';
mongoose.connect(dbURI)
.then(() => app.listen(3000))
.catch((err) => console.error("Connection error:", err));

// ejs setup
app.set('view engine', 'ejs');

// middleware setup
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'Public')));
app.use(express.urlencoded({ extended: true }));

// todo view routes
app.get('/', todoController.todo_index);
app.get('/my-tasks', todoController.todo_myTasks);
app.get('/myTasks', (req, res) => {res.redirect('/my-tasks')});
app.get('/add-task', todoController.todo_addTask_get);
app.get('/calendar', todoController.todo_calendar);
app.get('/about', todoController.todo_about);
app.post('/', todoController.todo_addTask_post);
app.put('my-tasks.:id/edit', todoController.todo_editTask_post);
app.put('/my-tasks/:id/complete', todoController.todo_completeTask);
app.delete('/my-tasks/clear-completed', todoController.todo_clearCompletedTasks);
app.delete('/my-tasks/:id', todoController.todo_deleteTask);
app.use((req, res) => {
  res.status(404).render('404', {title: '404', cssFile: '404.css'});
});