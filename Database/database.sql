USE GameDB;

DROP TABLE IF EXISTS Characters;
DROP TABLE IF EXISTS Account;


-- Create the Account table
CREATE TABLE Account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    score INT DEFAULT 0,
    active INT DEFAULT 1
);

CREATE TABLE Characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    thumbnail_url VARCHAR(150),
    likes_compliments INT DEFAULT 0,
    likes_help INT DEFAULT 0,
    likes_events INT DEFAULT 0
);

INSERT INTO Account (username, password)
VALUES ('omen',1234)