const inquirer = require('inquirer');
const { Pool } = require('pg');
const path = require("path");
const fs = require('fs');
const { type } = require('os');
const { exit } = require('process');

const pool = new Pool(
    {
        user: 'postgres',
        password: 'qwer123',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
)

pool.connect();
function run() {
    return inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'userAction',
                choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee\'s Role', 'Quit']
            }
        ])

        .then((data) => {
            const userChoice = data.userAction;

            if (userChoice === 'View All Departments') {
                pool.query('SELECT * FROM department', function (err, { rows }) {
                    console.log(rows);
                })
                run();
            }

            else if (userChoice === 'View All Roles') {
                pool.query('SELECT * FROM role', function (err, { rows }) {
                    console.log(rows);
                })
                run();
            }

            else if (userChoice === 'View All Employees') {
                pool.query('SELECT * FROM employee', function (err, { rows }) {
                    console.log(rows);
                })
                run();
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
                        run();
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
                        pool.query(`INSERT INTO role (title, salary, department) VALUES ('${data.roleAdd}', ${data.roleSalary}), ${data.roleDept};`, function () {
                            console.log('Role added!');
                        })
                        run();
                    })
            }

            else if (userChoice === 'Add an Employee') {
                return inquirer
                    .prompt([
                        {
                            type: 'input',
                            message: 'What is the employee\'s first name?',
                            name: "empFirst"
                        },
                        {
                            type: 'input',
                            message: 'What is the employee\'s last name?',
                            name: "empLast"
                        },
                        {
                            type: 'number',
                            message: 'What is the employee\'s role ID?',
                            name: "empRoleId"
                        },
                        {
                            type: 'number',
                            message: 'Please input the employee\'s manager ID',
                            name: 'managerId',
                        }
                    ])
                    .then((data) => {
                        pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.empFirst}', '${data.empLast}', ${data.empRoleId}, ${data.managerId})`, function () {
                            console.log('Employee added!');
                        })
                        // console.log(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.empFirst}', '${data.empLast}', ${data.empRoleId}, ${data.managerId})`)
                        run();
                    })

            }

            else if (userChoice === 'Update an Employee\'s Role') {
                return inquirer
                    .prompt([
                        {
                            type: 'number',
                            message: 'Which employee\'s information do you want to update (provide id)',
                            name: "chosenEmp"
                        },
                        {
                            type: 'number',
                            message: 'What is the employee\'s new role ID?',
                            name: "newRole"
                        },
                    ])
                    .then((data) => {
                        pool.query(`UPDATE employee SET role_id = ${data.newRole} WHERE id = ${data.chosenEmp};`, function () {
                            console.log('Employee updated!');
                        })
                        run();
                    })
            }
            
            else {
                exit();
            }
        });
}
run();