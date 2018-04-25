const express = require('express');
const bodyParser = require('body-parser');

const gameRouter = require('./routes/game.route');
const employeeRouter = require('./routes/employee.route');

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

// Spin up the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});
