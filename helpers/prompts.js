const { 
    allDepts,
    allRoles,
    allEmployees,
    addDept,
    removeDept,
    addRole,
    removeRole,
    addEmployee,
    removeEmployee,
    updateEmployee,
    employeeList,
    roleList,
    deptList,
    employeeNameArray,
    roleArray,
    deptArray
 } = require('./sql');

const inquirer = require('inquirer');

const mainMenu = () => {inquirer.prompt([
    {
        type: 'list',
        name: 'mainMenu',
        message: 'Welcome! How can we help you today?',
        choices: ['View Reports','Edit Database','Exit']
    },
    ])
    .then((answers)=> {
        // if (answers.mainMenu === 'View Reports') {
        //     viewReports();
        // }
        // if (answers.mainMenu === 'Edit Database') {
        //     editWhat();
        // }
        // if (answers.mainMenu === 'Exit') {
        //     process.exit();
        // }
        switch(answers.mainMenu) {
            case 'View Reports':
                viewReports();
                break;
            case 'Edit Database':
                editWhat();
                break;
            case 'Exit':
                process.exit();
        }

    })
    .catch((err) => err ? console.log(err) : console.log("Something else broke."));
}
    
const viewReports = () => {inquirer.prompt([
    {
        type: 'list',
        name: 'viewReports',
        message: 'What would you like to view?',
        choices: ['View All Departments','View All Roles','View All Employees','Back To Main']
    }
    ])
    .then((answers)=> {
        if (answers.viewReports === 'View All Departments') {
            allDepts();
            returnMain();
        }
        if (answers.viewReports === 'View All Roles') {
            allRoles();
            returnMain();
        }
        if (answers.viewReports === 'View All Employees') {
            allEmployees();
            returnMain();
        }
        if (answers.viewReports === 'Back To Main') {
            mainMenu();
        }
    })
    .catch((err) => err ? console.log(err) : console.log("Something else broke."))
}

const editWhat = () => {inquirer.prompt([
    {
        type: 'list',
        name: 'editWhat',
        message: 'What would you like to edit?',
        choices: ['Departments','Roles','Employees','Back To Main']
    }
    ])
    .then((answers)=> {
        if (answers.editWhat === 'Departments') {
            editDept();
        }
        if (answers.editWhat === 'Roles') {
            editRoles();
        }
        if (answers.editWhat === 'Employees') {
            editEmployees();
        }
        if (answers.editWhat === 'Back To Main') {
            mainMenu();
        }
    })
    .catch((err) => err ? console.log(err) : console.log("Something else broke."))
}

const returnMain = () => {inquirer.prompt([
        {
            type: 'confirm',
            name: 'toMain',
            message: 'Return to the Main Menu?',
            default: true
        }
    ])
    .then((answers) => answers.toMain ? mainMenu() : process.exit())
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

const editDept = () => {inquirer.prompt([
        {
            type: 'list',
            name: 'editDept',
            message: 'Would you like to add or remove a department?',
            choices: ['Add','Remove','']
        }
    ])
    .then((answers) => {
        if (answers.editDept === 'Add') {
            addDeptToDB();
        }
        if (answers.editDept === 'Remove') {
            deleteDept();
        }
    })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

const editRoles = () => {inquirer.prompt([
        {
            type: 'list',
            name: 'editRole',
            message: 'Would you like to add or remove a company role?',
            choices: ['Add','Remove']
        }
    ])
    .then((answers) => {
        if (answers.editRole === 'Add') {
            addRoleToDB();
        }
        if (answers.editRole === 'Remove') {
            deleteRole();
        }
    })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

const editEmployees = () => {inquirer.prompt([
        {
            type: 'list',
            name: 'editEmployees',
            message: 'Would you like to add, remove, or update a company role?',
            choices: ['Add','Remove','Update','Back To Main']
        }
    ])
    .then((answers) => {
        if (answers.editRole === 'Add') {
            addEmpToDB();
        }
        if (answers.editRole === 'Remove') {
            deleteEmp();
        }
        if (answers.editEmployees === 'Update') {
            updateEmp();
        }
        if (answers.editEmployees === 'Back To Main') {
            mainMenu();
        }
    })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

const deleteDept = () => {inquirer.prompt([
        {
            type: 'list',
            name: 'deleteDept',
            message: 'Which department would you like to remove?',
            choices: deptList()
        }
    ])
    .then((answers) => {
        let userChoice  = parseINT(answers.deleteDept)
            removeDept(userChoice);
            allDepts();
            returnMain();
        })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

const addDeptToDB = () => {inquirer.prompt([
        {
            type: 'input',
            name: 'addDept',
            message: 'What is the title of the department would you like add?'
        }
    ])
    .then((answers) => {
        let userChoice  = answers.addDept
            addDept(userChoice);
            allDepts();
            returnMain();
        })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

const deleteRole = () => {inquirer.prompt([
        {
            type: 'list',
            name: 'deleteRole',
            message: 'Which role would you like to remove?',
            choices: roleList()
        }
    ])
    .then((answers) => {
        let userChoice  = parseINT(answers.deleteRole)
            removeRole(userChoice);
            allRoles();
            returnMain();
        })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

const addRoleToDB = () => {inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'What is the title of the roll you wish to add?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the annual salary for this position in USD?',
            default: '85000'
        },
        {
            type: 'list',
            name: 'roleDepartment',
            message: 'Which department is this position in?',
            choices: listRole
        }
    ])
    .then((answers) => {
        let title  = answers.deptName;
        let salary = answers.salary;
        let department_id = answers.roleDepartment;
            addRole(title, salary, department_id);
            allDepts();
            returnMain();
        })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

const deleteEmp = () => {inquirer.prompt([
        {
            type: 'list',
            name: 'deleteEmp',
            message: 'Which Employee would you like to remove?',
            choices: employeeList()
        }
    ])
    .then((answers) => {
        let userChoice  = parseINT(answers.deleteEmp)
            removeEmployee(userChoice);
            allEmployees();
            returnMain();
        })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

const addEmpToDB = () => {inquirer.prompt([
        {
            type: 'input',
            name: 'firstName',
            message: "What is the employee's first name?"
        },
        {
            type: 'input',
            name: 'lastName',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'empRole',
            message: "What is the employee's position?",
            choices: roleList()
        },
        {
            type: 'confirm',
            name: 'confMan',
            Message: "Does this employee report to anyone?",
            default: false
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who does this employee report to?',
            when: (input) => input.confMan === true,
            choices: employeeList()
        }
    ])
    .then((answers) => {
        let first_name  = answers.firstName;
        let last_name = answers.lastName;
        let role_id = answers.empRole;
        let manager_id = answers.confMan ? parseInt(answers.manager_id) : null; 
            addEmployee(first_name, last_name, role_id, manager_id);
            allEmployees();
            returnMain();
        })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

const updateEmp = () => {inquirer.prompt([
    {
        type: 'input',
        name: 'firstName',
        message: "What is the employee's first name?"
    },
    {
        type: 'input',
        name: 'lastName',
        message: "What is the employee's last name?"
    },
    {
        type: 'list',
        name: 'empRole',
        message: "What is the employee's position?",
        choices: roleList()
    },
    {
        type: 'confirm',
        name: 'confMan',
        Message: "Does this employee report to anyone?",
        default: false
    },
    {
        type: 'list',
        name: 'manager',
        message: 'Who does this employee report to?',
        when: (input) => input.confMan === true,
        choices: employeeList()
    }
    ])
    .then((answers) => {
        let first_name  = answers.firstName;
        let last_name = answers.lastName;
        let role_id = answers.empRole;
        let manager_id = answers.confMan ? parseInt(answers.manager_id) : null; 
            updateEmployee(first_name, last_name, role_id, manager_id);
            allEmployees();
            returnMain();
    })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

module.exports = mainMenu;