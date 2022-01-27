const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');


const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

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

// connect to port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// questions that that the program
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
            let role = []

            // query to pass the name so the user can choose from a list
            db.query('SELECT id, first_name, last_name FROM employees', function (err, results) {
                
                results.forEach ((item) => {
            const ind = `${item.id} ${item.first_name} ${item.last_name}`
            employee.push (ind)
            })

                // query to pass the roles so the user can choose from a list
                    db.query('SELECT id, title FROM roles', function (err, results) {
                
                        results.forEach ((item) => {
                    const inr = `${item.id} ${item.title}`
                    role.push (inr)
                    })
        
                    })
                    // calling function passing 2 params
                    updateEmployee(employee,role)
            })

                break;

            
            case "QUIT":
                  return  console.log ("Goodbye")

                   break;
           }
 
     })

}

// calling start function
    start ()

    // function to query for the users selection
    function allDepartments() {

        db.query('select departments.name, departments.id from departments', function (err, results) {
            console.table(results)
        start();
         
        })
    }

// function to query for the users selection
    function allRoles() {

        db.query('select roles.title, roles.id, departments.name, roles.salary from departments join roles on departments.id=roles.department_id', function (err, results) {
            console.table(results)
             
        start();
         
        })
    }

// function to query for the users selection
    function allEmployees() {

        console.log("All EMPLOYEES")
        db.query('select employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name, employees.manager_id from employees left join roles on employees.role_id=roles.id join departments on roles.department_id=departments.id', function (err, results) {
                console.table(results)
             
        start();
         
        })
    }

// function to add the users selection
function addDepartment() {

        inquirer.prompt ([
            {
                type: 'input',
                name: 'name',
                message: "Enter name of department."
            }
           
        ])
            .then (answer => {
                
                db.query(`insert into departments (name) values ("${answer.name}")`, function (err, results) {
                    
                start();
                 
                })
    
            })
          
            .catch(err => { console.log(err)});
    
}

// function to add the users selection
function addRole() {

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
                
            start();
             
            })

        })
      
        .catch(err => { console.log(err)});

}


// function to add the users selection
function addEmployee() {

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
                
            start();
             
            })

        })
      
        .catch(err => { console.log(err)});

}


// function to update the users selection
function updateEmployee(item,role) {

    inquirer
     .prompt([
         {
             type: 'list',
             name: 'choice',
             message: "Choose an employee to update",
             choices: item
         },
         {
            type: 'list',
            name: 'role',
            message: "Choose a new role",
            choices: role
        }
     
       
    ])
        .then (answer => {
            
            // variables to select the first word in a string
            let sr = answer.role.split(" ")
            let ar = sr[0]

            let sc = answer.choice.split(" ")
            let ac = sc[0]


            db.query(`UPDATE employees set role_id = ${ar} where id =${ac}`, function (err, results) {

            start();
             
            })

        })
      
        .catch(err => { console.log(err)});

}



