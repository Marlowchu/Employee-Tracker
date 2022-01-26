const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'admin',
    database: 'etracker_db'
  },
  console.log(`Connected to the etracker_db database.`)
);

// // Query database
// db.query('SELECT first_name, last_name FROM employees', function (err, results) {
//   console.table(results)
// });


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



function start () {

    console.log ("Welcome to Employee Tracker (ET)")

    inquirer
     .prompt([
         {
             type: 'list',
             name: 'choice',
             message: "What would you like to do?",
             choices: [ "view all departments", "view all roles", "view all employees", "add a department", "add a role", "add an employee", "update an employee role", "QUIT"]
         }
     ])
     .then (answer => {
       
     //   switch statement to handle user choice
         switch (answer.choice) {
             case "view all departments":

                allDepartments()
                  
               break;

             case "view all roles":

                allRoles()

               break;

             case "view all employees":
                 
                allEmployees();

               break;

            case "add a department":
                
                addDepartment ();

               break;
            
            case "add a role":
                addRole ();
                break;
    
            case "add an employee":
                addEmployee ();
                break;

            case "update an employee role":

            
            let employee = []

            db.query('SELECT first_name, last_name FROM employees', function (err, results) {
                

                // let employee = [] 
                results.forEach ((item) => {
            // console.log (`${item.first_name} ${item.last_name}` )
        //    employee.push (`${item.first_name} ${item.last_name}`)

                // employee = `${results.first_name} ${results.last_name}`
            // console.log (`${item.first_name} ${item.last_name}`)

            const ind = `${item.first_name} ${item.last_name}`
            employee.push (ind)

            
            })

                    console.log (employee)

                    updateEmployee(employee)


                // const employees = results 
                // console.table(employees)
                // console.log (employees)

                //  updateEmployee (employees)

            })
                break;

            
            case "QUIT":
                  return  console.log ("Goodbye")

                   break;
           }
 
     })

}


    start ()


    function allDepartments() {

        db.query('select departments.name, departments.id from departments', function (err, results) {
            console.table(results)
        start();
         
        })
    }


    function allRoles() {

        db.query('select roles.title, roles.id, departments.name, roles.salary from departments join roles on departments.id=roles.department_id', function (err, results) {
            console.table(results)
             
        start();
         
        })
    }


    function allEmployees() {

        console.log("All EMPLOYEES")
        db.query('select employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name, employees.manager_id from employees left join roles on employees.role_id=roles.id join departments on roles.department_id=departments.id', function (err, results) {
                console.table(results)
             
        start();
         
        })
    }


function addDepartment() {

        // console.log ("Enter Manager information")
    
        inquirer.prompt ([
            {
                type: 'input',
                name: 'name',
                message: "Enter name of department."
            }
           
        ])
            .then (answer => {
                
                db.query(`insert into departments (name) values ("${answer.name}")`, function (err, results) {
                    console.table(results)
                start();
                 
                })
    
            })
          
            .catch(err => { console.log(err)});
    
}


function addRole() {

    // console.log ("Enter Manager information")

    inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: "Enter name of role."
        },
        {
            type: 'input',
            name: 'salary',
            message: "Enter salary."
        },
        {
            type: 'input',
            name: 'department',
            message: "Enter department id."
        }
       
    ])
        .then (answer => {
            
            db.query(`insert into roles (title, salary, department_id) values ("${answer.name}", ${answer.salary}, ${answer.department})`, function (err, results) {
                console.table(results)
            start();
             
            })

        })
      
        .catch(err => { console.log(err)});

}



function addEmployee() {

    // console.log ("Enter Manager information")

    inquirer.prompt ([
        {
            type: 'input',
            name: 'first',
            message: "Enter first name."
        },
        {
            type: 'input',
            name: 'last',
            message: "Enter last name."
        },
        {
            type: 'input',
            name: 'role',
            message: "Enter role id."
        },
        {
            type: 'input',
            name: 'manager',
            message: "Enter manager id."
        }
       
    ])
        .then (answer => {
            
            db.query(`insert into employees (first_name, last_name, role_id, manager_id)  values ("${answer.first}", "${answer.last}", ${answer.role}, ${answer.manager})`, function (err, results) {
                console.table(results)

            start();
             
            })

        })
      
        .catch(err => { console.log(err)});

}




function updateEmployee(item) {

    // console.log ("Enter Manager information")

    inquirer
     .prompt([
         {
             type: 'list',
             name: 'choice',
             message: "Choose an employee to update",
             choices: item
         }
     
       
    ])
        .then (answer => {
            
            db.query(`insert into employees (first_name, last_name, role_id, manager_id)  values ("${answer.first}", "${answer.last}", ${answer.role}, ${answer.manager})`, function (err, results) {
                console.table(results)

            start();
             
            })

        })
      
        .catch(err => { console.log(err)});

}










// view all departments
// select departments.name, departments.id from departments;

// view all roles
// select roles.title, roles.id, departments.name, roles.salary
// from departments join roles on departments.id=roles.department_id;

// view all employees
// select employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name
// from employees left join roles on employees.role_id=roles.id
// join departments on roles.department_id=departments.id;



// add department, add role, add employee.

// add a department
// insert into departments (name) values ("Safety");

// add a role
// insert into roles values ("title", "59000", "department");

// add a employee
// insert into employees values ("first name", "last name", "role", "manager");

// update an employee role
// update roles set title ="title" where id = 5;