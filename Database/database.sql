-- Create the database and switch to it
CREATE DATABASE IF NOT EXISTS GameDB;
USE GameDB;

DROP TABLE IF EXISTS 'Character';
DROP TABLE IF EXISTS Account;


-- Create the Account table
CREATE TABLE Account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    score INT DEFAULT 0,
    active TINYINT(1) DEFAULT 1,  -- 0 = inactive, 1 = active
);

CREATE TABLE `Character` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    thumbnail_url VARCHAR(150),
    likes_compliments TINYINT(1) DEFAULT 0,
    likes_help TINYINT(1) DEFAULT 0,
    likes_events TINYINT(1) DEFAULT 0,
    FOREIGN KEY (account_id) REFERENCES Account(id) ON DELETE SET NULL
);


