DROP DATABASE IF EXISTS db;
CREATE DATABASE db;

USE db;

CREATE TABLE IF NOT EXISTS Customers (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    Entry_Date DATE DEFAULT CURRENT_DATE,
    UUID CHAR(36) UNIQUE,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Gender ENUM('male', 'female'),
    Date_of_Birth DATE,
    Address VARCHAR(100),
    Phone_Number BIGINT(10)
);
