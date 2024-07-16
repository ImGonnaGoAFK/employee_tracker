const inquirer = require('inquirer');
const { Pool } = require('pg');
const path = require("path");
const fs = require('fs');
const { type } = require('os');

const pool = new Pool(
    {
        user: 'postgres',
        password: 'qwer123',
        database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
)

pool.connect();

return inquirer
    .prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'userAction',
            choices: ['View All Departments', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee\'s Role']
        }
    ])

    .then((data) => {
        const userChoice = data.userAction;

        if (userChoice === 'View All Departments') {
            pool.query('SELECT * FROM department', function (err, { rows }) {
                console.log(rows);
            })
        }

        else if (userChoice === 'View All Employees') {
            pool.query('SELECT * FROM employee', function (err, { rows }) {
                console.log(rows);
            })
        }

        else if (userChoice === 'Add a Department') {
            return inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What is the name of the department you would like to add?',
                        name: "deptAdd"
                    }
                ])
                .then((data) => {
                    pool.query(`INSERT INTO department ("name") VALUES (\'${data.deptAdd}\')`, function () {
                        console.log('Department added!');
                    })
                })
        }

        else if (userChoice === 'Add a Role') {
            return inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'What is the title of the role?',
                        name: "roleAdd"
                    },
                    {
                        type: 'number',
                        message: 'What is the salary of the role?',
                        name: "roleSalary"
                    },
                    {
                        type: 'number',
                        message: 'What department is the role in (provide id)?',
                        name: "roleDept"
                    }
                ])
                .then((data) => {
                    pool.query(`INSERT INTO role (title, salary, department) VALUES (\'${data.roleAdd}\', ${data.roleSalary}), ${data.roleDept}`, function () {
                        console.log('Role added!');
                    })
                })
        }
    })