const { prompt } = require('inquirer')
const mysql = require('mysql2')
require('console.table')
const db = mysql.createConnection('mysql://root:rootroot@localhost/employees_db')
const start = () => {
  prompt([
    {
      type: 'list',
      name: 'choice',
      message: 'Choose an action:',
      choices: [
        {
          name: 'View Employees',
          value: 'viewEmployees'
        },
        {
          name: 'Add An Employee',
          value: 'addEmployee'
        },
        {
          name: `Update An Employee's Role`,
          value: 'updateEmployeeRole'
        },
        {
          name: 'View Departments',
          value: 'viewDepartments'
        },
        {
          name: 'Add A Department',
          value: 'addDepartment'
        },
        {
          name: 'View Roles',
          value: 'viewRoles'
        },
        {
          name: 'Add A Role',
          value: 'addRole'
        }
      ]
    }
  ])
    .then(({ choice }) => {
      switch (choice) {
        case 'viewEmployees':
          viewEmployees()
          break
        case 'addEmployee':
          addEmployee()
          break
        case 'updateEmployeeRole':
          updateEmployeeRole()
          break
        case 'viewDepartments':
          viewDepartments()
          break
        case 'addDepartment':
          addDepartment()
          break
        case 'viewRoles':
          viewRoles()
          break
        case 'addRole':
          addRole()
          break
      }
    })
    .catch(err => console.log(err))
}
const viewEmployees = () => {
  db.query(`
    SELECT employees.id, employees.first_name, employees.last_name,
      roles.title, roles.salary, departments.name AS department,
      CONCAT(managers.first_name, ' ', managers.last_name) AS manager
    FROM employees
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employee manager
    ON managers.id = employees.manager_id
  `, (err, employees) => {
    if (err) { console.log(err) }
    console.table(employees)
    start()
  })
}
const addEmployee = () => {
  db.query('SELECT * FROM roles', (err, roles) => {
    if (err) { console.log(err) }
    roles = roles.map(roles => ({
      name: roles.title,
      value: roles.id
    }))
    db.query('SELECT * FROM employees', (err, employees) => {
      employees = employees.map(employees => ({
        name: `${employees.first_name} ${employees.last_name}`,
        value: employees.id
      }))
      employees.unshift({ name: 'None', value: null })
      prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'What is the employee first name?'
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'What is the employee last name?'
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Choose a role for the employee:',
          choices: roles
        },
        {
          type: 'list',
          name: 'manager_id',
          message: 'Choose a manager for the employee:',
          choices: employees
        }
      ])
        .then(employees => {
          db.query('INSERT INTO employee SET ?', employees, (err) => {
            if (err) { console.log(err) }
            sendStatu
            start()
          })
        })
        .catch(err => console.log(err))
    })
  })
}

const updateEmployeeRole = () => {
  db.query('SELECT * FROM employee', (err, employees) => {
    employees = employees.map(employee => ({
      name: `${employee.first_name} ${employee.last_name}`,
      value: employee.id
    }))
    db.query('SELECT * FROM role', (err, roles) => {
      roles = roles.map(role => ({
        name: role.title,
        value: role.id
      }))
      prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Choose an employee to update',
          choices: employees
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Choose the employee new role',
          choices: roles
        },
      ])
        .then(employee => {
          console.log(employee.role_id)
          db.query('UPDATE employee SET role_id = ? WHERE employee.id = ?', [employee.role_id, employee.employee_id], (err) => {
            if (err) { console.log(err) }
            console.log('employee updated')
            start()
          })
        })
        .catch(err => { console.log(err) })
    })
  })
}

const updateEmployeeManager = () => {
  db.query('SELECT * FROM employees', (err, employees) => {
    employees = employees.map(employees => ({
      name: `${employees.first_name} ${employees.last_name}`,
      value: employee.id
    }))
    db.query('SELECT * FROM roles', (err, roles) => {
      roles = roles.map(roles => ({
        name: roles.title,
        value: roles.id
      }))
      prompt([
        {
          type: 'list',
          name: 'employee_id',
          message: 'Choose an employee to update',
          choices: employees
        },
        {
          type: 'list',
          name: 'role_id',
          message: 'Choose the employee new role',
          choices: roles
        },
      ])
        .then(employees => {
          console.log(employees.role_id)
          db.query('UPDATE employees SET role_id = ? WHERE employees.id = ?', [employees.role_id, employees.employee_id], (err) => {
            if (err) { console.log(err) }
            console.log('employee updated')
            start()
          })
        })
        .catch(err => { console.log(err) })
    })
  })
}


const viewDepartments = () => {
  db.query(`
    SELECT * FROM departments
  `, (err, departments) => {
    if (err) { console.log(err) }
    console.table(departments)
    start()
  })
}
const addDepartment = () => {
  prompt({
    type: 'input',
    name: 'name',
    message: 'What is the name of the department?'
  })
    .then(departments => {
      db.query('INSERT INTO departments SET ?', departments, (err) => {
        if (err) { console.log(err) }
        console.log('Department Created!')
        start()
      })
    })
}
const viewRoles = () => {
  db.query(`
    SELECT roles.title, roles.salary FROM roles
  `, (err, roles) => {
    if (err) { console.log(err) }
    console.table(roles)
    start()
  })
}
const addRole = () => {
  db.query('SELECT * FROM departments', (err, departments) => {
    if (err) { console.log(err) }
    departments = departments.map(departments => ({
      name: departments.name,
      value: departments.id
    }))
    db.query('SELECT * FROM roles', (err, roles) => {
      roles = roles.map(roles => ({
        name: `${roles.title} ${roles.salary}`,
        value: roles.id
      }))
      roles.unshift({ name: 'None', value: null })
      prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the title of the role?'
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the salary?'
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'choose department:',
          choices: departments
        }
      ])
        .then(roles => {
          db.query('INSERT INTO roles SET ?', roles, (err) => {
            if (err) { console.log(err) }
            console.log('Role Created!')
            start()
          })
        })
        .catch(err => console.log(err))
    })
  })
}
start()