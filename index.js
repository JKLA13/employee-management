//require modules
const mysql = require("mysql2");
const inquirer = require("inquirer");
const consTable = require("console.table");
//connect sql/login
const dbConnect = require("./config/connection");
// const { dbConnect } = require(".config/connection");

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
//view options
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
        case "View all departments.":
          viewDepartments();
          break;
        case "View all roles.":
          viewRoles();
          break;
        case "View all employees.":
          viewEmployees();
          break;
        case "Add a department.":
          addDept();
          break;
        case "Add a role.":
          addRole();
          break;
        case "Add an employee.":
          addEmp();
          break;
        case "Update an employee.":
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
//function shows formatted table showing department and dept name, dept ids
const viewDepartments = () => {
  dbConnect.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.table(res);
    initPrompt();
  });
};

//function view all roles
//function shows job title, role id, dept role belongs to, role salaray
const viewRoles = () => {
  dbConnect.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    console.table(res);
    initPrompt();
  });
};
//function view all employees
//function shows formatted table of emploee data: employee ids, first names, last names, job titles, departments, salaries, manager of employee
const viewEmployees = () => {
  dbConnect.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.table(res);
    initPrompt();
  });
};
//add/update section
let mgrArr = [];
const chooseManager = () => {
  dbConnect.query(
    "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL;",
    function (err, res) {
      if (err) throw err;
      for (let i = 0; i < res.length; i++) {
        mgrArr.push(res[i].first_name);
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
    .prompt({
      type: "input",
      name: "department",
      message: "Please add a new department.",
    })
    .then(function (res) {
      dbConnect.query(
        "INSERT INTO deparment SET ?",
        {
          name: res.name,
        },
        function (err, res) {
          if (err) throw err;
          console.table(res);
          initPrompt();
        }
      );
    });
};

//function add a role
// prompt enter name, salary, dept for the role, role is added to db
const addRole = () => {
  dbConnect.query("SELECT * FROM role;", function (err, res) {
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
            console.table(res);
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
        message: "Please enter employees managers name.",
        choices: chooseManager(),
      },
      {
        name: "role",
        type: "list",
        message: "Please enter role for employee.",
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
// prompt to select employee to uppdate and their new role, this added to db

// call prompt questions
userWelcome();
// initPrompt();
