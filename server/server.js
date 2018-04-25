const express = require('express');
const bodyParser = require('body-parser');

const employeeRouter = require('./routes/employee.route');

const app = express();
// if on heroku, use the provided port || use 4001
const PORT = process.env.PORT || 4001;
const gameCollection = []; // Contains objects e.g. {name: 'game name', cost: 0.99}

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

app.use('/employee', employeeRouter);

// Spin up the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
