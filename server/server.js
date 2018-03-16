let express = require('express');
let app = express();
const PORT = 4001;
let bodyParser = require('body-parser');
const gameCollection = []; // Contains objects e.g. {name: 'game name', cost: 0.99}

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
    console.log(req.body);
    let gameToAdd = req.body; // body.name & body.cost
    let gameName = gameToAdd.name;
    let gameCost = parseFloat(gameToAdd.cost);
    gameToAdd.name += '!!!';
    gameToAdd.tax = gameCost * 0.07;
    gameToAdd.isClearance = isClearance(gameCost);
    gameCollection.push(gameToAdd);
    console.log(gameCollection);
    res.sendStatus(200);
});

// Checks whether a cost ends in .00
function isClearance(cost) {
    // 19.99 and 19.00
    // 19.99 - 19 = 0.99
    // 19.00 - 19 = 0
    if (cost - Math.floor(cost) === 0) {
        return true;
    } else {
        return false;
    }
}

// Spin up the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
