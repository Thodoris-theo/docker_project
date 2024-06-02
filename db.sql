-- Create Database
CREATE DATABASE IF NOT EXISTS your_database_name;

-- Use Database
USE your_database_name;

-- Create Customers Table
CREATE TABLE IF NOT EXISTS Customers (
    ID CHAR(36) PRIMARY KEY,
    Entry_Date DATE DEFAULT CURRENT_DATE,
    Identification_Number VARCHAR(8) UNIQUE,
    First_Name VARCHAR(50),
    Last_Name VARCHAR(50),
    Gender ENUM('male', 'female'),
    Date_of_Birth DATE,
    Address VARCHAR(100),
    Phone_Number BIGINT
);
