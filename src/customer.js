// Import the database connection
const db = require('./db');

const insertCustomer = (customer, callback) => {
    const { UUID, First_Name, Last_Name, Gender, Date_of_Birth, Address, Phone_Number } = customer;
    const insertQuery = `
        INSERT INTO Customers (UUID, First_Name, Last_Name, Gender, Date_of_Birth, Address, Phone_Number) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;
 
    db.query(insertQuery, [UUID, First_Name, Last_Name, Gender, Date_of_Birth, Address, Phone_Number], (err, results) => {
        if (err) return callback(err);
        callback(null, results); 
    });
};


const getAllCustomers = (callback) => {
    const query = 'SELECT * FROM Customers'; 
    // Execute the SQL query
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

const getCustomerById = (id, callback) => {
    const query = 'SELECT * FROM Customers WHERE ID = ?'; 
    db.query(query, [id], (err, results) => {
        if (err) return callback(err); 

        if (results.length === 0) return callback(new Error('Customer not found'));
        callback(null, results[0]); 
    });
};


const searchCustomers = (searchTerm, callback) => {
    const query = `
        SELECT * FROM Customers 
        WHERE UUID LIKE ? OR First_Name LIKE ? OR Last_Name LIKE ?
        ORDER BY Last_Name, First_Name
    `; // SQL query to search for customers
    const searchPattern = `%${searchTerm}%`; 
    db.query(query, [searchPattern, searchPattern, searchPattern], (err, results) => {
        if (err) return callback(err); 
        callback(null, results);
    });
};


const deleteCustomer = (id, callback) => {
    const query = 'DELETE FROM Customers WHERE ID = ?'; 
    db.query(query, [id], (err, results) => {
        if (err) return callback(err); 
        if (results.affectedRows === 0) return callback(new Error('Customer not found'));
        callback(null, results); 
    });
};

const updateCustomer = (id, updatedCustomer, callback) => {
    const { First_Name, Last_Name, Gender, Date_of_Birth, Address, Phone_Number } = updatedCustomer;
    const query = `
        UPDATE Customers 
        SET First_Name = ?, Last_Name = ?, Gender = ?, Date_of_Birth = ?, Address = ?, Phone_Number = ?
        WHERE ID = ?
    `; 
    db.query(query, [First_Name, Last_Name, Gender, Date_of_Birth, Address, Phone_Number, id], (err, results) => {
        if (err) return callback(err); 
        if (results.affectedRows === 0) return callback(new Error('Customer not found'));
        callback(null, results); 
    });
};

module.exports = {
    insertCustomer,
    getAllCustomers,
    getCustomerById,
    searchCustomers,
    deleteCustomer,
    updateCustomer
};
