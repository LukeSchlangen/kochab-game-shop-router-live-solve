const express = require('express');
const bodyParser = require('body-parser');

const gameRouter = require('./routes/game.route');
const employeeRouter = require('./routes/employee.route');

const mongoose = require('mongoose');

const app = express();
// if on heroku, use the provided port || use 4001
const PORT = process.env.PORT || 4001;

// Configures bodyParser for jQuery
// MUST BE DONE BEFORE OUR app.post
app.use(bodyParser.urlencoded({extended:true})); 

// Serve static files
app.use(express.static('server/public'));

app.use('/employee', employeeRouter);
app.use('/game', gameRouter);

const databaseUrl = 'mongodb://localhost:27017/game_shop';
mongoose.connect(databaseUrl);

mongoose.connection.on('connected', () => {
    console.log('mongoose connected on', databaseUrl);
});

mongoose.connection.on('error', (error) => {
    console.log('mongoose connection failed', error);
});

// Spin up the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
