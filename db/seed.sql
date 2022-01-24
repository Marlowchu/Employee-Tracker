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

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Jim", "Jones", 1),
       ("Ben", "Mack", 2),
       ("Ashley", "Stone", 2),
       ("Mike", "Cuff", 4),
       ("Steve", "Star", 7),
       ("Kelly", "Bell", 5),
       ("Chuck", "Holmes", 3),
       ("Matt", "Zoe", 3),
       ("Lisa", "Frank", 8),
       ("Star", "Boss", 7);