USE company_db;
INSERT INTO department (id, name)
VALUES
    (1, "Engineering"),
    (2, "Finance"),
    (3, "Legal"),
    (4, "Sales");

INSERT INTO role (title, salary, department_id)
VALUES
    ("Sales Lead", 100000, 4),
    ("Salesperson", 80000, 4),
    ("Lead Engineer", 150000, 1),
    ("Software Engineer", 120000, 4),
    ("Account Manager", 160000, 2),
    ("Accountant", 125000, 2),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Doe", 1, 1),
    ("Mike", "Chan", 2, 1),
    ("Ashley", "Rodriguez", 3, 5),
    ("Kevin", "Tupik", 4, 3),
    ("Kunal", "Singh", 4, 5),
    ("Malia", "Brown", 3, 5),
    ("Sarah", "Lourd", 2, 7),
    ("Tom", "Allen", 1, 7);

