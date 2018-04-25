// Same as one line below these two
// const express = require('express');
// const router = express.Router();
const router = require('express').Router();

const employeeList = []; // Contains objects e.g. {name: 'game name', cost: 0.99}

// Send back all the games.
router.get('/', (req, res) => {
    res.send(employeeList);
});

// When we want to add a new game. 
router.post('/', (req, res) => {
    const employeeToAdd = req.body; // body.name & body.cost
    console.log('Employee to add:', employeeToAdd);
    employeeList.push(employeeToAdd);
    res.sendStatus(200);
});

module.exports = router;