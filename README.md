# Game Shop Router Activity

## Setup

Fork and clone this repository. Run `npm install` to install express and body-parser. Start the server with `npm start`. At this point, you should be able to add games and employees. Make sure the application is working before moving on.

## Base Mode

**Our server.js file is getting too big!**

1. Create a `routes` folder in the `server` folder
1. Move all server-side `/game` routes (`GET` and `POST`) to a `routes/game.router.js` file.
1. Move all server-side `/employee` routes (`GET` and `POST`) to a `routes/employee.router.js` file.

Test the app after moving the code to confirm everything still works as expected.

## Stretch Goals

1. Create a `modules` folder in the `server` folder
1. Move the `isClearance` function to it's own module
1. Deploy to Heroku