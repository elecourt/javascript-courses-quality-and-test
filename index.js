const Todos = require('./todos.js');

let todos = new Todos();
todos.ask().then(answers => {
  todos.add(answers['name']);
  console.log(todos.list());
});