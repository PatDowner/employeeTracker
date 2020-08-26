USE employees_db;
INSERT INTO departments (name)
VALUE ('sales'), ('finance'), ('development');

INSERT INTO roles (title, salary, department_id)
VALUES ('Sales Rep', 125000, 1),
  ('Sales Manager', 150000, 1),
  ('Jr Developer', 125000, 2),
  ('Sr Developer', 150000, 2);
  
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('Tony', 'Stark', 4, NULL),
  ('Bruce', 'Banner', 1, 1),
  ('Steve', 'Rodgers', 4, NULL);