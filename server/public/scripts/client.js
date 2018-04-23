$(document).ready(readyNow);

function readyNow() {
    console.log('document ready');
    $('#submitGameButton').on('click', submitGame);
    $('#submitEmployeeButton').on('click', submitEmployee);
    // Get the games when the page loads
    getAllGames();
    getAllEmployees();
}

function getAllGames() {
    $.ajax({
        type: 'GET',
        url: '/game'
    }).then(function (response) {
        appendGamesToDom(response); // The response is our gameCollection array
    });
}
// Put the games on the DOM
function appendGamesToDom(gameCollection) {
    $('#gameContent').empty();
    for (let game of gameCollection) {
        console.log('GAME:', game);
        let tr = $('<tr></tr>');
        if (game.isClearance) {
            tr.append('<td class="clearance">' + game.name + '</td>');
            tr.append('<td class="clearance">' + game.cost + '</td>');
            tr.append('<td class="clearance">' + game.tax + '</td>');
        } else {
            tr.append('<td>' + game.name + '</td>');
            tr.append('<td>' + game.cost + '</td>');
            tr.append('<td>' + game.tax + '</td>');
        }
        $('#gameContent').append(tr);
    }
}

function submitGame() {
    let gameName = $('#gameName').val();
    let cost = $('#cost').val();
    let gameToAdd = { name: gameName, cost: cost };
    $.ajax({
        type: 'post',
        data: gameToAdd,
        url: '/game'
    }).then(function (response) {
        // our response from a POST will just be '200' success
        console.log('SUCCESS!');
        // Refresh our game list
        getAllGames();
    });
}

function getAllEmployees() {
    $.ajax({
        type: 'GET',
        url: '/employee'
    }).then(function (response) {
        appendEmployeesToDom(response); // The response is our employeeList array
    });
}
// Put the employees on the DOM
function appendEmployeesToDom(employeeCollection) {
    $('#employeeContent').empty();
    employeeCollection.forEach(employee => {
        let tr = $('<tr></tr>');
        tr.append('<td>' + employee.name + '</td>');
        $('#employeeContent').append(tr);

    });

}

function submitEmployee() {
    let employeeName = $('#employeeName').val();
    let cost = $('#cost').val();
    let employeeToAdd = { name: employeeName };
    $.ajax({
        type: 'post',
        data: employeeToAdd,
        url: '/employee'
    }).then(function (response) {
        // our response from a POST will just be '200' success
        console.log('SUCCESS!');
        // Refresh our employee list
        getAllEmployees();
    });
}