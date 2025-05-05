CREATE DATABASE IF NOT EXISTS GameDB;

USE GameDB;

DROP TABLE IF EXISTS Characters;
DROP TABLE IF EXISTS Account;


-- Create the Account table
CREATE TABLE Account (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    score INT DEFAULT 0,
    active TINYINT(1) DEFAULT 1  -- 0 = inactive, 1 = active
);

CREATE TABLE Characters (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    thumbnail_url VARCHAR(150),
    likes_compliments INT DEFAULT 0,
    likes_help INT DEFAULT 0,
    likes_events INT DEFAULT 0
);


INSERT INTO Characters (name, thumbnail_url, likes_compliments, likes_help, likes_events) VALUES
('Shark', '/images/Shark.png', -1, -1, 1),
('Vampire', '/images/Vampire.png', 1, -1, -1),
('Booty', '/images/Booty.png', 1, 1, 1),
('Alligator', '/images/Alligator.png', 1, -1, 1),
('Pirate Booty', '/images/pirateBooty.png', -1, 1, 1),
('Cyborg', '/images/cyborg.png', 1, -1, 1),
('Fish Dude', '/images/fishDude.png', 1, 1, 1),
('Grump', '/images/Grump.png', -1, -1, -1),
('CS Nerd', '/images/CSNerd.png', 1, 1, -1);
