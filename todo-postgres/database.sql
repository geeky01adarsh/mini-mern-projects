-- show all databases
\l

-- create a database
CREATE DATABASE perntodo;

-- select a database
\c perntodo;

-- show all tables
\dt;

-- create a table
CREATE TABLE todo(
    t_id SERIAL PRIMARY KEY,
    description VARCHAR(100)
);

-- show all values in a table
SELECT * FROM todo;

-- insert into table values
INSERT INTO todo (description) VALUES('Eat');

-- get by column value
SELECT * FROM todo WHERE t_id=1;

-- update column value
UPDATE todo set description='sleep' WHERE t_id=2;

-- delete column value
DELETE FROM todo WHERE t_id=1;