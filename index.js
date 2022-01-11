const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const Todos = require('./todos.js');

const PORT = process.env.PORT || 5000;

const app = express();
const todos = new Todos();


/*let todos = new Todos();
todos.ask().then(answers => {
  todos.add(answers['name']);
  console.log(todos.list());
});*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.get('/cool', (request, response) => response.send("cool"));

app.post('/',(request,response) => {
    console.log(request.body);
    todos.add(request.body.word);
    console.log(todos.list());
    response.render('pages/index',  { game : request.body.word });
});

// about page
app.get('/', function(request, response) {
    response.render('pages/index', { game : undefined });
});

app.get('/ajax', function(req, res){
    res.render('ajax', {title: 'An Ajax Example', quote: "AJAX is great!"});
});
app.post('/ajax', function(req, res){
    res.render('ajax', {title: 'An Ajax Example', quote: req.body.quote});
});