const mysql = require('mysql2');
// const { identity } = require('rxjs');

let roleArray = []
let deptArray = []
let employeeNameArray = []

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'thebestpassword',
      database: 'buzzniss_db'
    },
    console.log(`Connected to the buzzniss_db database.`)
  );

const allDepts = () => {
    const sql = "SELECT department.id AS Department_ID, department.name AS Department_Title FROM department"
    db.query(sql, (err, result) => {
    console.log(`\n\n`)
    err ? console.log(err) : console.table(result)
    console.log(`\n\n`)
    })
};

const allRoles = () => {
    const sql = "SELECT role.title as Title, role.id as Job_ID, role.salary as Salary, department.name as Department FROM role JOIN department ON role.department_id = department.id ORDER BY role.id"
    db.query(sql, (err, result) => {
        console.log(`\n\n`)
        err ? console.log(err) : console.table(result)
        console.log(`\n\n`)
        })
}
const allEmployees = () => {
    const sql = "SELECT employee.id as Employee_ID, employee.first_name as First_Name, employee.last_name as Last_Name, role.title as Job_Title, role.salary as Salary, CONCAT(manager.first_name, ' ', manager.last_name) as Manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY employee.id"
    db.query(sql, (err, result) => {
        console.log(`\n\n`)
        err ? console.log(err) : console.table(result)
        console.log(`\n\n`)
        })
}

const addDept = (inputName) => {
    const sql = `INSERT INTO department (name) VALUES ("${inputName}")`
    db.query(sql, (err, results) => {
        err ? console.log(err) : console.log(`${inputName} added to the departments database!`);
    })
    allDepts()
}

const removeDept = (deptID) => {
    const sql = `DELETE FROM department WHERE  department.id = ("${deptID}")`
    db.query(sql, (err, results) => {
        err ? console.log(err) : console.log("Successfully removed from database.");
    })
    allDepts()
}

const addRole = (roleTitle, roleSalary, departmentID) => {
    const sql = `INSERT INTO role (title, salary, department_id)
                VALUES ("${roleTitle}", ${roleSalary}, ${departmentID})`
    db.query(sql, (err, results) => err ? console.log(err) : console.log(`${roleTitle} added to the roles database!`))
    allRoles()
}

const removeRole = (roleID) => {
    const sql = `DELETE FROM role WHERE role.id = ("${roleID}")`
    db.query(sql, (err, results) => {
        err ? console.log(err) : console.log("Successfully removed from database.");
    })
    allRoles()
}

const addEmployee = (first, last, roleID, managerID) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${first}", "${last}", ${roleID}, ${managerID})`
    db.query(sql, (err, results) => err ? console.log(err) : console.log(`${first} ${last} successfully added to the employee database!`))
    allEmployees();
}

const removeEmployee = (empID) => {
    const sql = `DELETE FROM employee WHERE employee.id = ("${empID}")`
    db.query(sql, (err, results) => err ? console.log(err) : console.log("Successfully removed from database"))
    allEmployees();
}

const updateEmployee = (empID, first, last, roleID, managerID) => {
    const sql = `UPDATE employee SET first_name = "${first}", last_name = "${last}", role_id = ${roleID}, manager_id = ${managerID} WHERE employee.id = ${empID}`
    db.query(sql, (err, results) => err ? console.log(err) : console.log("Employee successfully updated!"))
    allEmployees();
};

const employeeList = () => db.query("SELECT employee.id as Id, employee.first_name as First, employee.last_name as Last FROM employee", (err, results) =>{
    let employeeNameArray = [];
    if (err) {
        console.log(err)
    } else {
        results.forEach(employee => {
            let employeeName = `${employee.Id} ${employee.First} ${employee.Last}`
            employeeNameArray.push(employeeName)
        })
    }
    console.log(employeeNameArray);
    return employeeNameArray;
})

const roleList = () => db.query("SELECT role.id as Id, role.title as Title FROM role", (err, results) =>{
    let roleArray = [];
    if (err) {
        console.log(err)
    } else {
        results.forEach(role => {
            let roleTitle = `${role.Id} ${role.Title}`
            roleArray.push(roleTitle)
        })
    }
    console.log(roleArray);
    return roleArray;

    // if (err) {
    //     console.log(err)
    // } else {
    //     results.send(JSON.stringify(results))
    // }
})

const deptList = () => db.query("SELECT department.id as Id, department.name as Name FROM department", (err, results) =>{
    let deptArray = [];
    if (err) {
        console.log(err)
    } else {
        results.forEach(dept => {
            let deptName = `${dept.Id} ${dept.Name}`
            deptArray.push(deptName)
        })
    }
    // console.log(deptArray);
    return deptArray;
})



// allDepts();
// allRoles();
// allEmployees();
// employeeList();
// roleList();
// deptList();
// console.log(employeeList());
// console.log(roleList());
// console.log(deptList());


// updateEmployee(5, "James", "Crisp", 7, 1);
// updateEmployee(5, "Zac", "Goad", 6, null);

// addDept("test");
// removeDept(8);

// addRole("Slender Man", 9000.00, 4);
// removeRole(11);

// addEmployee("David", "Marsh", 5, 5)
// removeEmployee(16)+

module.exports = {
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
}