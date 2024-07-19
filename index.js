const inquirer = require('inquirer');
const { Pool } = require('pg');
const path = require("path");
const fs = require('fs');
const { type } = require('os');
const { exit } = require('process');
const {menuQuestions, addDeptQuestions, addRoleQuestions, addEmployeeQuestions, updateEmpQuestions} = require('./questions')

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
        .prompt(menuQuestions)

        .then((data) => {
            const userChoice = data.userAction;

            if (userChoice === 'View All Departments') {
                pool.query('SELECT * FROM department', function (err, { rows }) {
                    console.table(rows);
                    run();
                })

            }

            else if (userChoice === 'View All Roles') {
                pool.query('SELECT * FROM role', function (err, { rows }) {
                    console.table(rows);
                    run();
                })
            }

            else if (userChoice === 'View All Employees') {
                pool.query('SELECT * FROM employee', function (err, { rows }) {
                    console.table(rows);
                    run();
                })
            }

            else if (userChoice === 'Add a Department') {
                return inquirer
                    .prompt(addDeptQuestions)
                    .then((data) => {
                        pool.query(`INSERT INTO department ("name") VALUES (\'${data.deptAdd}\')`, function () {
                            console.log('Department added!');
                            run();
                        })
                    })
            }

            else if (userChoice === 'Add a Role') {
                return inquirer
                    .prompt(addRoleQuestions)
                    .then((data) => {
                        pool.query(`INSERT INTO role (title, salary, department) VALUES ('${data.roleAdd}', ${data.roleSalary}, ${data.roleDept})`, function () {
                            console.log('Role added!');
                            run();
                        })
                    })
            }

            else if (userChoice === 'Add an Employee') {
                return inquirer
                    .prompt(addEmployeeQuestions)
                    .then((data) => {
                        pool.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${data.empFirst}', '${data.empLast}', ${data.empRoleId}, ${data.managerId})`, function () {
                            console.log('Employee added!');
                            run();
                        })

                    })

            }

            else if (userChoice === 'Update an Employee\'s Role') {
                return inquirer
                    .prompt(updateEmpQuestions)
                    .then((data) => {
                        pool.query(`UPDATE employee SET role_id = ${data.newRole} WHERE id = ${data.chosenEmp};`, function () {
                            console.log('Employee updated!');
                            run();
                        })
                    })
            }

            else {
                exit();
            }
        });
}
run();