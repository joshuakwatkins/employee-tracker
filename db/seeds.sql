INSERT INTO department (name)
VALUES  ("Production"),
        ("Operations"),
        ("Accounting"),
        ("Finance"),
        ("Development");

INSERT INTO role (title, salary, department_id)
VALUES  ("Factory Worker", 114000.00, 1),
        ("Equipment Maintenance", 90000.00, 1),
        ("SpecOps", 34000.00, 2),
        ("Custodial Engineers", 54000.00, 2),
        ("Accoutant", 58000.00, 3),
        ("Loop Hole Tax Man", 69000.00, 3),
        ("Analyst", 78000.00, 4),
        ("Actuary", 68000.00, 4),
        ("Engineer", 95000.00, 5),
        ("Software Architecht", 135000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Emil", "Dansbury", 10, null),
        ("Samwise", "Gamgee", 9, 1),
        ("Daniel", "Kim", 8, null),
        ("Wilber", "Issapig", 7, 3),
        ("Zac", "Goad", 6, null),
        ("Patrick", "Sutcliffe", 5, 5),
        ("Prince", "Phillip IV", 3, null),
        ("King", "David III", 4, 7),
        ("Frodo", "Baggins", 2, null),
        ("Smeagol", "Gollum", 1, 9),
        ("Wanky", "Spanktown", 1, 9),
        ("Russell", "Wilson", 5, 5),
        ("Richard", "Sherman", 5, 5),
        ("Earl", "Thomas", 7, 3);
