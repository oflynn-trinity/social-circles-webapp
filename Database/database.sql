-- Create the database and switch to it
CREATE DATABASE IF NOT EXISTS GameDB;
USE GameDB;

-- Create the Account table
CREATE TABLE Account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    score INT DEFAULT 0,
    active TINYINT(1) DEFAULT 1,  -- 0 = inactive, 1 = active
    admin TINYINT(1) DEFAULT 0    -- 0 = regular user, 1 = admin
);

-- Create the Character table (optionally link characters to accounts)
CREATE TABLE Character (
    id INT AUTO_INCREMENT PRIMARY KEY,
    --account_id INT,  -- Optional: Link a character to an account
    name VARCHAR(50) NOT NULL,
    thumbnail_url VARCHAR(150),
    likes_compliments TINYINT(1) DEFAULT 0,
    likes_help TINYINT(1) DEFAULT 0,
    likes_events TINYINT(1) DEFAULT 0,
    FOREIGN KEY (account_id) REFERENCES Account(id) ON DELETE SET NULL
);

-- Create the Session table to log user sessions (linked to the Account table)
CREATE TABLE Session (
    session_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,         -- A session token (could be a UUID or other token)
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    expires_at DATETIME,                   -- When the session expires
    FOREIGN KEY (account_id) REFERENCES Account(id) ON DELETE CASCADE
);
