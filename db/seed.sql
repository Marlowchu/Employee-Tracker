INSERT INTO departments (name)
VALUES ("Electronics"),
       ("Cafe"),
       ("Sporting Goods"),
       ("Admin");
      
INSERT INTO roles (title, salary, department_id)
VALUES ("Cashier", 50000, 1),
       ("Stocker", 48000, 1),
       ("Cook", 60000, 2),
       ("Server", 45000, 2),
       ("Cashier", 49000, 3),
       ("Stocker", 43000, 3),
       ("Manager", 75000, 4),
       ("HR", 57000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Jones", 1, 5),
       ("Ben", "Mack", 2, 5),
       ("Ashley", "Stone", 2, 5),
       ("Mike", "Cuff", 4, 5),
       ("Steve", "Star", 7, 5),
       ("Kelly", "Bell", 5, 10),
       ("Chuck", "Holmes", 3, 10),
       ("Matt", "Zoe", 3, 10),
       ("Lisa", "Frank", 8, 10),
       ("Star", "Boss", 7, 5);