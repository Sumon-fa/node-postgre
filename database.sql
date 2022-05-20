CREATE DATABASE todo;
CREATE TABLE task(
    task_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
)