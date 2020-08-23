const express = require('express')

const { prompt } = require('inquirer')
const fs = require('fs')

const addDepartment = task => {
  prompt([

  ])
    .then(() => {

      nextTask()
    })
    .catch(err => console.log(err))
}

const addRole = task => {
  prompt([

  ])
    .then(() => {

      nextTask()
    })
    .catch(err => console.log(err))
}

const addEmployee = task => {
  prompt([

  ])
    .then(() => {

      nextTask()
    })
    .catch(err => console.log(err))
}

const viewDepartment = task => {
  prompt([

  ])
    .then(() => {

      nextTask()
    })
    .catch(err => console.log(err))
}

const viewRole = task => {
  prompt([

  ])
    .then(() => {

      nextTask()
    })
    .catch(err => console.log(err))
}

const viewEmployee = task => {
  prompt([

  ])
    .then(() => {

      nextTask()
    })
    .catch(err => console.log(err))
}

const updateEmployee = task => {
  prompt([

  ])
    .then(() => {

      nextTask()
    })
    .catch(err => console.log(err))
}

const nextTask = () => {
  prompt({
    type: 'list',
    name: 'action',
    choices: ['Continue', 'Finish'],
    message: 'What would you like to do now?'
  })
    .then(({ action }) => {
      switch (action) {
        case 'Continue':
          mainMenu()
          break
        case 'Finish':
          console.log(employees)
          break
      }
    })
    .catch(err => console.log(err))

}

const mainMenu = () => {
  .prompt([
  {
    type: 'list',
    name: 'start',
    message: 'What would you like to do?'
      choices: ['add department', 'add role', 'add employee', 'view department', 'view role', 'view employee', 'update employee role']
  }
])
  .then(task => {
    switch (task.choices) {
      case 'add department':
        addDepartment(task)
        break
      case 'add role':
        addRole(task)
        break
      case 'add employee':
        addEmployee(task)
        break
      case 'view department':
        viewDepartment(task)
        break
      case 'view role':
        viewRole(task)
        break
      case 'view employee':
        viewEmployee(task)
        break
      case 'update employee role':
        updateEmployee(task)
        break
    }
  })
  .catch(err => console.log(err))
  }

mainMenu()