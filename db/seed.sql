INSERT INTO departments (name)
VALUES ("Electronics"),
       ("Cafe"),
       ("Sporting Goods"),
       ("Admin");
      
INSERT INTO roles (title, salary, department_id)
VALUES ("Cashier", 50000, 1),
       ("Cook", 60000, 2),
       ("Server", 45000, 2),
       ("Stocker", 43000, 3),
       ("Manager", 75000, 4),
       ("HR", 57000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Jones", 1, 5),
       ("Ben", "Mack", 2, 5),
       ("Ashley", "Stone", 3, 5),
       ("Matt", "Zoe", 4, 5),
       ("Lisa", "Frank", 5, 5),
       ("Star", "Boss", 6, 5);