INSERT INTO department ("name") VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department) VALUES
('Saleperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Kevin', 'Hoang', 3, 2),
('John', 'Smith', 1, 1),
('Jane', 'Doe', 3, 4),
('Space', 'Goat', 2, 2);