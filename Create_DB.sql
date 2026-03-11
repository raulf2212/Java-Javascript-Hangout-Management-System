DROP DATABASE IF EXISTS hangout_db;
CREATE DATABASE hangout_db;
USE hangout_db;

CREATE TABLE students (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE hangouts (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    leader_id VARCHAR(255),     
    date_time VARCHAR(255),       
    location VARCHAR(255),
    max_participants INT,         
    description TEXT,
    category VARCHAR(255),
    FOREIGN KEY (leader_id) REFERENCES students(id)
);

CREATE TABLE participants (
    hangout_id VARCHAR(255),
    student_id VARCHAR(255),
    PRIMARY KEY (hangout_id, student_id),
    FOREIGN KEY (hangout_id) REFERENCES hangouts(id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);