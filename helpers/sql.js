const mysql = require('mysql2');
// const { identity } = require('rxjs');



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
    const sql = "SELECT department.id as Department_ID, department.name as Department_Title FROM department"
    db.query(sql, (err, result) => err ? console.log(err) : console.table(result))
};

const allRoles = () => {
    const sql = "SELECT role.title as Title, role.id as Job_ID, role.salary as Salary, department.name as Department FROM role JOIN department ON role.department_id = department.id"
    db.query(sql, (err, results) => err ? console.log(err) : console.table(results))
}
const allEmployees = () => {
    const sql = "SELECT employee.id as Employee_ID, employee.first_name as First_Name, employee.last_name as Last_Name, role.title as Job_Title, role.salary as Salary, employee.manager_id as Manager FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id"
    db.query(sql, (err, results) => err ? console.log(err) : console.table(results))
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
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES ("${first}", "${last}", ${roleID}, ${managerID})`
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



allDepts();
allRoles();
allEmployees();

updateEmployee(5, "James", "Crisp", 7, 1);
updateEmployee(5, "Zac", "Goad", 6, null);

// addDept("test");
// removeDept(8);

// addRole("Slender Man", 9000.00, 4);
// removeRole(11);

// addEmployee("David", "Marsh", 5, 5)
// removeEmployee(16)