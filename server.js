const express = require('express')
const { prompt } = require('inquirer')
const fs = require('fs')

const app = express()

const addDepartment = task => {
  prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Department name:'
    }
  ])
    .then(() => {

      nextTask()
    })
    .catch(err => console.log(err))
}

const addRole = task => {
  prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Role title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Role salary:'
    },
    {
      // how do I make this a list from the existing departments??
      type: 'list',
      name: 'department_id',
      message: 'Role department:',
      choices: departments
    }
  ])
    .then(() => {

      nextTask()
    })
    .catch(err => console.log(err))
}

const addEmployee = task => {
  prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Employee first name:'
    }
    {
      type: 'input',
      name: 'last_name',
      message: 'Employee last name:'
    }
    {
      type: 'list',
      name: 'role_id',
      message: 'Employee role:',
      choices: roles
    }
    {
      type: 'list',
      name: 'manager_id',
      message: `Employee's manager:`
      choices: employees
    }
  ])
    .then(() => {

      nextTask()
    })
    .catch(err => console.log(err))
}

const viewDepartment = task => {
  prompt([
    {
      type: 'list',
      name: 'viewDepartment',
      message: 'Select a department to view.'
      choices: departments
    }
  ])
    .then(() => {

      nextTask()
    })
    .catch(err => console.log(err))
}

const viewRole = task => {
  prompt([
    {
      type: 'list',
      name: 'viewRoles',
      message: ''
    }
  ])
    .then(() => {

      nextTask()
    })
    .catch(err => console.log(err))
}

const viewEmployee = task => {
  prompt([
    {
      type: 'input',
      name: '',
      message: ''
    }
  ])
    .then(() => {

      nextTask()
    })
    .catch(err => console.log(err))
}

const updateEmployee = task => {
  prompt([
    {
      type: 'list',
      name: 'updateEmployee',
      message: 'Which employee would you like to update?'
      choices: employees
    },
    {
      
    }
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