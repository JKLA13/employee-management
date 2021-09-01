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
    .then(initPrompt);
};

//function to start inquirer, initial prompts
//view options
const initPrompt = () => {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "Please make a choice.",
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
    .then(function (answer) {
      switch (response.answer) {
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
          addDepartment();
          break;
        case "Add a role.":
          addRole();
          break;
        case "Add an employee.":
          addEmployee();
          break;
        case "Update an employee.":
          appendEmployee();
          break;
      }
    });
};

//function view all departments

//function shows formatted table showing department and dept name, dept ids

//function view all roles
//function shows job title, role id, dept role belongs to, role salaray

//function view all employees
//function shows formatted table of emploee data: employee ids, first names, last names, job titles, departments, salaries, manager of employee

//function add a department
// INPUT?? prompt enter name of the dept and dept is added to db

//add/update section
//function add a role
// prompt enter name, salary, dept for the role, role is added to db

//function add an employee
// prompt enter first name, last name, role, and manager all added to db

//function update an employee role
// prompt to select employee to uppdate and their new role, this added to db

// call prompt questions
const init = () => userWelcome();
initPrompt();
