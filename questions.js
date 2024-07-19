const menuQuestions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'userAction',
        choices: ['View All Departments', 'View All Roles', 'View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee\'s Role', 'Quit']
    }
];

const addDeptQuestions = [
    {
        type: 'input',
        message: 'What is the name of the department you would like to add?',
        name: "deptAdd"
    }
];

const addRoleQuestions = [
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
];

const addEmployeeQuestions = [
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
];

const updateEmpQuestions = [
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
];

module.exports = {menuQuestions, addDeptQuestions, addRoleQuestions, addEmployeeQuestions, updateEmpQuestions}