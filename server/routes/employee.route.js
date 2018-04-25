// Same as one line below these two
// const express = require('express');
// const router = express.Router();
const router = require('express').Router();
const Employee = require('../models/employee.schema');

// Send back all the games.
router.get('/', (req, res) => {
    Employee.find({})
        .then((databaseResults) => {
            // good things happened!
            res.send(databaseResults);
        })
        .catch((error) => {
            console.log('error make employee find', error);
            res.sendStatus(500);
        });
});

// When we want to add a new game. 
router.post('/', (req, res) => {
    const employeeToAdd = req.body; // body.name & body.cost
    console.log('Employee to add:', employeeToAdd);
    Employee.create(employeeToAdd)
        .then((databaseResults) => {
            // good things happened!
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error make employee find', error);
            res.sendStatus(500);
        });
});

module.exports = router;