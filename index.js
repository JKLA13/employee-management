//require dependecies
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consTable = require("console.table");
//require connect sql/login
const dbConnect = require("./config/connection");

//display app name/welcome
const userWelcome = () => {
  const appTitle = `*** EMPLOYEE TRACKER APP ***`;
  return inquirer
    .prompt([
      {
        type: "input",
        name: "userWelcome",
        message: appTitle,
      },
    ])
    .then(initPrompt());
};

//function to start inquirer, initial prompts
const initPrompt = () => {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "Please select what you'd like to do",
      choices: [
        "View all departments?",
        "View all roles?",
        "View all employees?",
        "Add a department?",
        "Add a role?",
        "Add an employee?",
        "Update an employee role?",
        "Exit app",
      ],
    })
    .then(function (response) {
      switch (response.choice) {
        case "View all departments?":
          viewDepartments();
          break;
        case "View all roles?":
          viewRoles();
          break;
        case "View all employees?":
          viewEmployees();
          break;
        case "Add a department?":
          addDept();
          break;
        case "Add a role?":
          addRole();
          break;
        case "Add an employee?":
          addEmp();
          break;
        case "Update an employee?":
          appendEmployee();
          break;
        case "Exit app":
          dbConnect.end();
          console.log("Enjoy your day!");
          break;
      }
    });
};

//function view all departments
const viewDepartments = () => {
  dbConnect.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    initPrompt();
  });
};

//function view all roles
const viewRoles = () => {
  dbConnect.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    initPrompt();
  });
};
//function view all employees
const viewEmployees = () => {
  dbConnect.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    initPrompt();
  });
};
//arrays to utilize
let empArr = [];
const chooseEmp = () => {
  dbConnect.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      empArr.push(res[i].last_name);
    }
  });
  return empArr;
};

let mgrArr = [];
const chooseManager = () => {
  dbConnect.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL;",
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        mgrArr.push(res[i].last_name);
      }
    }
  );
  return mgrArr;
};

let roleArr = [];
const chooseRole = () => {
  dbConnect.query("SELECT * FROM role;", function (err, res) {
    if (err) throw err;
    for (let i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
};
//function add a department
// INPUT prompt enter name of the dept and dept is added to db
const addDept = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: "Please add new department name: ",
      },
    ])
    .then((res) => {
      dbConnect.query(
        "INSERT INTO department SET ?",
        {
          name: res.department,
        },
        (err, res) => {
          if (err) throw err;
          console.log("New department added!");
          initPrompt();
        }
      );
      // function (err, res) {
      //   if (err) throw err;
      //   // console.table(res);

      // }
      // );
    });
};

//function add a role
// prompt enter name, salary, dept for the role, role is added to db
const addRole = () => {
  dbConnect.query("SELECT * FROM role ?", function (err, res) {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "Please add a new role.",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for the new role?",
        },
      ])
      .then(function (res) {
        dbConnect.query(
          "INSERT INTO role SET ?",
          {
            title: res.title,
            salary: res.salary,
          },
          function (err) {
            if (err) throw err;
            console.log("Role added!");
            // console.table(res);
            initPrompt();
          }
        );
      });
  });
};

//function add an employee
// prompt enter first name, last name, role, and manager all added to db
const addEmp = () => {
  inquirer
    .prompt([
      {
        name: "firstname",
        type: "input",
        message: "Please enter first name: ",
      },
      {
        name: "lastname",
        type: "input",
        message: "Please enter last name: ",
      },
      {
        name: "manager",
        type: "list",
        message: "Please enter employees managers name: ",
        choices: chooseManager(),
      },
      {
        name: "role",
        type: "list",
        message: "Please enter role for employee: ",
        choices: chooseRole(),
      },
    ])
    .then(function (res) {
      let idRole = chooseRole().indexOf(res.role) + 1;
      let idManager = chooseManager().indexOf(res.manager) + 1;
      dbConnect.query(
        "INSERT INTO employee SET ?",
        {
          first_name: res.firstname,
          last_name: res.lastname,
          manager_id: idManager,
          role_id: idRole,
        },
        function (err) {
          if (err) throw err;
          console.table(res);
          initPrompt();
        }
      );
    });
};

//function update an employee role
const appendEmployee = () => {
  // prompt to select employee to uppdate and their new role, this added to db
  dbConnect.query(
    "SELECT employee.last_name, role.title FROM empployee JOIN role ON employee.role_id;",
    function (err, res) {
      inquirer
        .prompt([
          {
            type: "input",
            name: "employee",
            message:
              "Please select employee you'd like update with a new role: ",
            choices: chooseEmp(),
          },
          {
            type: "input",
            name: "role",
            message: "Please select a new role for your employee: ",
            choices: roleArr(),
          },
        ])
        .then(function (res) {
          let empUpdate = chooseEmp().indexOf(res.employee) + 1;
          let roleId = chooseRole().indexOf(res.role) + 1;
          dbConnect.query(
            "UPDATE employee SET ? WHERE ?",
            [
              {
                last_name: empUpdate,
              },
              {
                role_id: roleId,
              },
            ],
            function (err) {
              if (err) throw err;
              console.table(res);
              initPrompt();
            }
          );
        });
    }
  );
};
// call app welcome
userWelcome();
