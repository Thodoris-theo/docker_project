const express = require('express');
const bodyParser = require('body-parser');
const { insertCustomer, getAllCustomers, getCustomerById, searchCustomers, deleteCustomer, updateCustomer } = require('./customer');

const app = express();
const port = 3000;

app.use(bodyParser.json());



// Route to insert a new customer
app.post('/customers',(req, res) => {
    const customer = req.body;
    insertCustomer(customer, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(201).json({ message: 'Customer created successfully', customer: result });
        }
    });
});

// Route to retrieve all customers
app.get('/customers', (req, res) => {
    getAllCustomers((err, customers) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(customers);
        }
    });
});

// Route to retrieve a customer by their ID
app.get('/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    getCustomerById(id, (err, customer) => {
        if (err) {
            res.status(404).json({ error: err.message });
        } else {
            res.status(200).json(customer);
        }
    });
});

// Route to search for customers based on a search term
app.get('/customers/search/:term', (req, res) => {
    const searchTerm = req.params.term;
    searchCustomers(searchTerm, (err, customers) => {
        if (err) {
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.status(200).json(customers);
        }
    });
});

// Route to delete a customer by their ID
app.delete('/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    deleteCustomer(id, (err, result) => {
        if (err) {
            res.status(404).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Customer deleted successfully' });
        }
    });
});

// Route to update a customer by their ID
app.put('/customers/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedCustomer = req.body;
    updateCustomer(id, updatedCustomer, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(200).json({ message: 'Customer updated successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
