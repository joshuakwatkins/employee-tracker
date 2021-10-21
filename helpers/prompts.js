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

const mysql = require('mysql2');
require('dotenv').config();
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      multipleStatements: true
    },
    console.log(`Connected to the buzzniss_db database.`)
  );

const inquirer = require('inquirer');

const mainMenu = () => {
    inquirer.prompt([
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
            choices: ['Add','Remove','Back To Main']
        }
    ])
    .then((answers) => {
        if (answers.editDept === 'Add') {
            addDeptToDB();
        }
        if (answers.editDept === 'Remove') {
            deleteDept();
        }
        if (answers.editDept === 'Back To Main') {
            mainMenu();
        }
    })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

const editRoles = () => {inquirer.prompt([
        {
            type: 'list',
            name: 'editRole',
            message: 'Would you like to add or remove a company role?',
            choices: ['Add','Remove','Back To Main']
        }
    ])
    .then((answers) => {
        if (answers.editRole === 'Add') {
            addRoleToDB();
        }
        if (answers.editRole === 'Remove') {
            deleteRole();
        }
        if (answers.editRole === 'Back To Main') {
            mainMenu();
        }
    })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

const editEmployees = () => {inquirer.prompt([
        {
            type: 'list',
            name: 'editEmployees',
            message: 'Would you like to add, remove, or update an employee?',
            choices: ['Add','Remove','Update','Back To Main']
        }
    ])
    .then((answers) => {
        if (answers.editEmployees === 'Add') {
            addEmpToDB();
        }
        if (answers.editEmployees === 'Remove') {
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

const deleteDept = () => {
    let choiceDept = () => {
        db.query("SELECT department.id as Id, department.name as Name FROM department", (err, results) =>{
        let deptArray = [];
        if (err) {
            console.log(err)
        } else {
            results.forEach(dept => {
                let deptName = `${dept.Id} ${dept.Name}`
                deptArray.push(deptName)
            })
        }
        inquirer.prompt([
            {
                type: 'list',
                name: 'deleteDept',
                message: 'Which department would you like to remove?',
                choices: deptArray
            }
        ])
        .then((answers) => {
            console.log(answers)
            let userChoice  = parseInt(answers.deleteDept)
            removeDept(userChoice);
            allDepts();
            returnMain();
        })
        .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
    })}
    choiceDept();
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
            returnMain();
        })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
}

const deleteRole = () => {
    let choiceRole = () => {
        db.query("SELECT role.id as Id, role.title as Title FROM role", (err, results) => {
        let roleArray = [];
        if (err) {
            console.log(err)
        } else {
            results.forEach(role => {
                let roleTitle = `${role.Id} ${role.Title}`
                roleArray.push(roleTitle)
            })
        }
        inquirer.prompt([
            {
                type: 'list',
                name: 'deleteRole',
                message: 'Which role would you like to remove?',
                choices: roleArray
            }
        ])
        .then((answers) => {
            let userChoice  = parseInt(answers.deleteRole)
                removeRole(userChoice);
                returnMain();
            })
        .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
    })}
    choiceRole();
}

const addRoleToDB = () => {
    let choiceRole = () => {
    db.query("SELECT department.id as Id, department.name as Name FROM department", (err, results) =>{
        let deptArray = [];
        if (err) {
            console.log(err)
        } else {
            results.forEach(dept => {
                let deptName = `${dept.Id} ${dept.Name}`
                deptArray.push(deptName)
            })
        }
    inquirer.prompt([
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
            choices: deptArray
        }
    ])
    .then((answers) => {
        let title  = answers.deptName;
        let salary = answers.salary;
        let department_id = parseInt(answers.roleDepartment);
            addRole(title, salary, department_id);
            returnMain();
        })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
    })}
    choiceRole();
}

const deleteEmp = () => {
    const empChoice = () => {
        db.query("SELECT employee.id as Id, employee.first_name as First, employee.last_name as Last FROM employee", (err, results) =>{
        let employeeNameArray = [];
        if (err) {
            console.log(err)
        } else {
            results.forEach(employee => {
                let employeeName = `${employee.Id} ${employee.First} ${employee.Last}`
                employeeNameArray.push(employeeName)
            })
        }
    inquirer.prompt([
        {
            type: 'list',
            name: 'deleteEmp',
            message: 'Which Employee would you like to remove?',
            choices: employeeNameArray
        }
    ])
    .then((answers) => {
        let userChoice  = parseInt(answers.deleteEmp)
            removeEmployee(userChoice);
            allEmployees();
            returnMain();
        })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
    })}
    empChoice();
}

const addEmpToDB = () => {
    let empRole = () => {
        db.query("SELECT role.id as Id, role.title as Title FROM role; SELECT CONCAT(id,' ',first_name,' ',last_name) AS Name FROM employee", (err, results) => {
        let roleArray = [];
        let managerNameArray = [];
        if (err) {
            console.log(err)
        } else {
            results[0].forEach(role => {
                let roleTitle = `${role.Id} ${role.Title}`
                roleArray.push(roleTitle)
            })
            results[1].forEach(emp => {
                let employeeName = `${emp.Name}`
                managerNameArray.push(employeeName)

            })
        }
    inquirer.prompt([
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
            choices: roleArray
        },
        {
            type: 'confirm',
            name: 'confMan',
            message: "Does this employee report to anyone?",
            default: false
        },
        {
            type: 'list',
            name: 'manager',
            message: 'Who does this employee report to?',
            when: (input) => input.confMan === true,
            choices: managerNameArray
        }
    ])
    .then((answers) => {
        let first_name  = answers.firstName;
        let last_name = answers.lastName;
        let role_id = parseInt(answers.empRole);
        let manager_id = answers.confMan ? parseInt(answers.manager) : null; 
            addEmployee(first_name, last_name, role_id, manager_id);
            returnMain();
        })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
    })}
    empRole();
}

const updateEmp = () => {
    let empRole = () => {
        db.query("SELECT role.id as Id, role.title as Title FROM role; SELECT CONCAT(id,' ',first_name,' ',last_name) AS Name FROM employee", (err, results) => {
        let roleArray = [];
        let managerNameArray = [];
        if (err) {
            console.log(err)
        } else {
            results[0].forEach(role => {
                let roleTitle = `${role.Id} ${role.Title}`
                roleArray.push(roleTitle)
            })
            results[1].forEach(emp => {
                let employeeName = `${emp.Name}`
                managerNameArray.push(employeeName)

            })
        }
    inquirer.prompt([
        {
            type: 'list',
            name: 'editWho',
            message: 'Who would you like to edit?',
            choices: managerNameArray
        },
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
            choices: roleArray
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
            choices: managerNameArray
        }
    ])
    .then((answers) => {
        let edit_id = parseInt(answers.editWho);
        let first_name  = answers.firstName;
        let last_name = answers.lastName;
        let role_id = parseInt(answers.empRole);
        let manager_id = answers.confMan ? parseInt(answers.manager) : null; 
            updateEmployee(edit_id, first_name, last_name, role_id, manager_id);
            returnMain();
    })
    .catch((err) => err ? console.log(err) : console.log('Something else broke.'))
    })}
    empRole();
}

module.exports = mainMenu;