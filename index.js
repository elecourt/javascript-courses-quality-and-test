const Todos = require('./todos.js');

/*let todos = new Todos();
todos.ask().then(answers => {
  todos.add(answers['name']);
  console.log(todos.list());
});*/

const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.send("Lol"))
  .get('/cool', (req, res) => res.send("cool"))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));