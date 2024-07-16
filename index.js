const inquirer = require('inquirer');
const fs = require('fs');

inquirer
.prompt([
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'userAction',
        choices: ['View All Departments', 'View All Employees', 'Add a Department', 'Add a Role','Add an Employee', 'Update an Employee\'s Role']
    }
])