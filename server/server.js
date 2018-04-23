const express = require('express');
const app = express();
// if on heroku, use the provided port || use 4001
const PORT = process.env.PORT || 4001;
const bodyParser = require('body-parser');
const gameCollection = []; // Contains objects e.g. {name: 'game name', cost: 0.99}
const employeeList = []; // Contains objects e.g. {name: 'game name', cost: 0.99}

// Checks whether a cost ends in .00
const isClearance = (cost) => {
    // 19.99 and 19.00
    // 19.99 - 19 = 0.99
    // 19.00 - 19 = 0
    if (cost - Math.floor(cost) === 0) {
        return true;
    } else {
        return false;
    }
}

// Configures bodyParser for jQuery
// MUST BE DONE BEFORE OUR app.post
app.use(bodyParser.urlencoded({extended:true})); 

// Serve static files
app.use(express.static('server/public'));

// Send back all the games.
app.get('/game', (req, res) => {
    res.send(gameCollection);
});

// When we want to add a new game. 
app.post('/game', (req, res) => {
    const gameToAdd = req.body; // body.name & body.cost
    const gameName = gameToAdd.name;
    const gameCost = parseFloat(gameToAdd.cost);
    gameToAdd.tax = gameCost * 0.07;
    gameToAdd.isClearance = isClearance(gameCost);
    console.log('Game to add:', gameToAdd);
    gameCollection.push(gameToAdd);
    console.log(gameCollection);
    res.sendStatus(200);
});

// Send back all the games.
app.get('/employee', (req, res) => {
    res.send(employeeList);
});

// When we want to add a new game. 
app.post('/employee', (req, res) => {
    const employeeToAdd = req.body; // body.name & body.cost
    console.log('Employee to add:', employeeToAdd);
    employeeList.push(employeeToAdd);
    res.sendStatus(200);
});

// Spin up the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
