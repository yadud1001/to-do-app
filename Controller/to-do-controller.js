const Todo = require('../Models/to-do-model.js');

const todo_index = (req, res) => {
    Todo.find()
  .sort({createdAt: 1})
  .then((result) => res.render('index', {title: 'Home', tasks: result, cssFile: 'index.css', currentPage: 'home'}))
  .catch((err) => console.log(err))
};

const todo_addOrEditTask_post = (req, res) => {
  const { _id, ...updatedData } = req.body;

  if (_id) {
    Todo.findByIdAndUpdate(_id, updatedData, { new: true })
      .then((result) => res.redirect('/my-tasks'))
      .catch((err) => console.log(err));
  } else {
    const task = new Todo(updatedData);

    task.save()
    .then((result) => res.redirect('/'))
    .catch((err) => console.log(err));
  }
};

const todo_addOrEditTask_get = (req, res) => {
  const taskId = req.params.id;

  if (taskId) {
    Todo.findById(taskId)
     .then((result) => res.render('addTask', {title: 'EditTask', cssFile: 'addTask.css', task: result}))
     .catch((err) => console.log(err))
  } else {
    res.render('addTask', {title: 'AddTask', cssFile: 'addTask.css', task: null});
  }
};

const todo_myTasks = (req, res) => {
    Todo.find()
  .sort({createdAt: 1})
  .then((result) =>   res.render('myTasks', {title: 'MyTasks', tasks: result, cssFile: 'myTasks.css', currentPage: 'tasks'}))
  .catch((err) => console.log(err)) 
};

const todo_deleteTask = (req, res) => {
    Todo.findByIdAndDelete(req.params.id)
  .then(result => res.json({ redirect: '/my-tasks' }))
  .catch(err => console.log(err))
};

const todo_completeTask = (req, res) => {
  Todo.findByIdAndUpdate(req.params.id, { completed: true })
  .then(() => res.json({ redirect: '/my-tasks' }))
  .catch(err => console.log(err))
};

const todo_clearCompletedTasks = (req, res) => {
  Todo.deleteMany({ completed: true }) 
  .then(() => res.json({ message: "All completed tasks removed" }))
  .catch(err => console.log(err))
};

const todo_calendar = (req, res) => {
    res.render('calendar', {title: 'Calendar', cssFile: 'calendar.css', currentPage: 'calendar'})
};

const todo_about = (req, res) => {
    res.render('about', {title: 'About', cssFile: 'about.css', currentPage: 'about'});
};

module.exports = {
    todo_index,
    todo_addOrEditTask_post,
    todo_addOrEditTask_get,
    todo_myTasks,
    todo_deleteTask,
    todo_completeTask,
    todo_clearCompletedTasks,
    todo_calendar,
    todo_about
};