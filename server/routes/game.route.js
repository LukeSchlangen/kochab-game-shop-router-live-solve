const router = require('express').Router();

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

// Send back all the games.
router.get('/', (req, res) => {
    res.send(gameCollection);
});

// When we want to add a new game. 
router.post('/', (req, res) => {
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

module.exports = router;