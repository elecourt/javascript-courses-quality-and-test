const inquirer = require('inquirer')

var questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's your name?"
  }
]

class Todos {
    constructor() {
        this.todos = [];
    }

    list() {
      return [...this.todos];
    }
        

    add(title) {
        let todo = {
            title: title,
            completed: false,
        }

        this.todos.push(todo);
    }

    ask() {
      return inquirer.prompt(questions);
    }

    complete(title) {
        let todoFound = false;
        this.todos.forEach((todo) => {
            if (todo.title === title) {
                todo.completed = true;
                todoFound = true;
                return;
            }
        });

        if (!todoFound) {
            throw new Error(`No TODO was found with the title: "${title}"`);
        }
    }
}

/*let todos = new Todos();
todos.ask().then(answers => {
  todos.add(answers['name']);
  console.log(todos.list());
});*/


module.exports = Todos;