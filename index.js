//require routes
const inquirer = require("inquirer");
const mysql = require("mysql");

//connect sql/login
const connection = require("./config/connection");
//require init questions
const initQuestions = require("./lib/menu");
//function to start inquirer, initial prompts
const initPrompt = () => {
  inquirer.prompt(initQuestions).then(function (response) {
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
//view options
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
initPrompt();
