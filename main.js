//player class
class Player {
    constructor(name) {
        //name of the user
        this.name = name;
        //ships array and details
        this.ship = [
                        { name: "carrier", spaces: 5 },
                        { name: "battleship", spaces: 4 },
                        { name: "cruiser", spaces: 3 },
                        { name: "submarine", spaces: 3 },
                        { name: "destroyer", spaces: 2}
                    ],
        this.hits = 0; //total hits
        this.placed = 0; //ships placed
        //grid matrix
        this.gridMatrix = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
    } //constructor ends
    //-------prototype functions of the Player class
    //square validation method
    isSquareValid(square) {
        var shipType = this.placed;
        var req = this.ship[shipType].spaces;
        if (orient == 0) {
            if (square[1] + req > 10) return 0;
            for (var i = square[1]; i < square[1] + req; i++) {
                if (this.gridMatrix[square[0]][i] > 0) return 0;
            }
            return 1; //valid
        } else {
            if (square[0] + req > 10) return 0;
            for (var i = square[0]; i < square[0] + req; i++) {
                if (this.gridMatrix[i][square[1]] > 0) return 0;
            }
            return 1; //valid
        }
    } //isSquare valid ends
} //player class ends

var orient = 0;//set orientation of the ship placement
var status = -1;//predict next target
var direction = 0;//predict direction
var x, y;//coordinates of square
//Objects of player class
var player1 = new Player("Player1"); //user
var bot = new Player("Bot"); //bot

//----------- player1 ship placement method here _____
function userShip(space) {
    var square = split(space);
    x = square[0], y = square[1];//set coordinates
    //all players have been placed
    if (player1.placed == 5) {
        return;
    }
    //space is filled
    matric = player1.gridMatrix[x][y];
    if (matric > 0) {
        return;
    }
    var shipType = player1.placed;
    var req = player1.ship[shipType].spaces;
    var valid = player1.isSquareValid(square); //check for space validity
    var id = "p" + space;
    if (valid) {
        if (orient == 0) {
            for (i = y; i < y + req; i++) {
                id = "p" + x + '' + i;
                player1.gridMatrix[x][i] = 1;
                document.getElementById(id).parentElement.style.backgroundColor = "#003049";
            }
            player1.placed++; //increment placed ships
        } else {

            for (i = x; i < x + req; i++) {
                id = "p" + i + '' + y;
                player1.gridMatrix[i][y] = 1;
                document.getElementById(id).parentElement.style.backgroundColor = "#003049";
            }
            player1.placed++; //increment placed ships
        }
        shipPlacementMessage();//ship placement message
    } else {
        return;
    }
}
//-----------------Bot ship placement functions here______
function botShip() {
    while (true) {
        //all players have been placed
        if (bot.placed == 5) break;
        //random orientation generation
        var a = Math.random(); //<1
        if (a < 0.5) {
            orient = 0; //horizontal
        } else {
            orient = 1; //vertical
        }
        //random square
        var square = randomSquare();
        x = square[0], y = square[1];//set coordinates
        //space is filled
        var matric = bot.gridMatrix[x][y];
        if (matric > 0) {//square is not empty
            continue;
        }
        var shipType = bot.placed;
        var req = bot.ship[shipType].spaces;
        //space validity
        var valid = bot.isSquareValid(square); //check for space validity
        if (valid) { //valid space
            if (orient == 0) {
                for (i = y; i < y + req; i++) {
                    bot.gridMatrix[x][i] = 1;
                }
                bot.placed++; //increment placed ships
            } else {
                for (i = x; i < x + req; i++) {
                    bot.gridMatrix[i][y] = 1;
                }
                bot.placed++; //increment placed ships
            }
        }
    }
    orient = 0; //set orientation to default to facilitate the user

} botShip(); //invoke
//----------------------------------------------------
//------------------------Gameplay here-----------------
function userShot(space) {
    var square = split(space); //indexes
    var x = square[0], y = square[1];
    id = 'b' + space; //id of span
    //all players have been placed
    if (player1.hits == 17 || bot.hits == 17 || player1.placed != 5) {
        return;
    }
    //space is filled
    matric = bot.gridMatrix[x][y];
    if (matric == 2) {
        return;
    }else if (matric == 0) {
        failedSot(bot, id, x, y);//failed shot
    }else if (matric == 1) {
        successShot(player1, bot, id, 'p-hits', x, y);//successful shot
    }
    whoWins(); //check if player1 won
    botShot(); //bot turn now
}
//Bots turn
function botShot() {
    var matric = 0;//to get value of a square on grid
    var id = ''; //to generate id of target span
    //all players have been placed
    if (bot.hits == 17 || player1.hits == 17) {
        return;
    }
    if (status == -1) { //new random square
        //space random generation
        var square = randomSquare();
        x = square[0], y = square[1];//set coordinates
        id = 'p' + x + '' + y; //id of span
        //space is filled
        matric = player1.gridMatrix[x][y];
        if (matric == 2) {
            botShot(); //recursive call
        } else if (matric == 0) {
            failedSot(player1, id, x, y);//failed shot
        } else if (matric == 1) {
            successShot(bot, player1, id, 'b-hits', x, y);//successful shot
            status = 0;//right
        }
    }else if (status >= 0 && status < 4) { //working around a hit
        if (status == 0) { //right
            searchAroundTarget(x, y+1);
        } else if (status == 1) { //left
            searchAroundTarget(x, y-1);
        } else if (status == 2) { //top
            searchAroundTarget(x-1, y);
        } else if (status == 3) { //bottom
            searchAroundTarget(x+1, y);
        }
    }else if (status == 10) { //wotking to finish the ship
        if (direction == 0) { //right
            y++; //update the space
            directionHandler(x, y+1);
        } else if (direction == 1) { //left
            y--; //update the space
            directionHandler(x, y-1);
        } else if (direction == 2) { //top
            x--; //update the space
            directionHandler(x-1, y);
        } else if (direction == 3) { //bottom
            x++; //update coord
            directionHandler(x+1, y);
        }
    }
    whoWins(); //check if bot won
}
//--- direction handler function for  --------
function directionHandler(x, y){
    if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {//make sure the square is within the boundaries of grid
        var id = 'p' + x + '' + y; //id of span
        var matric = player1.gridMatrix[x][y];
        if (matric == 2) {
            status = -1;
            botShot(); //try again
        } else if (matric == 0) {
            status = -1;
            failedSot(player1, id, x, y);//failed shot
        } else if (matric == 1) {
            status = 10;
            successShot(bot, player1, id, 'b-hits', x, y);//successful shot
        }
    } else {
        status = -1;
        botShot(); //try again
    }
}
//--- search around first target (botShot) --- 
function searchAroundTarget(x, y){
    if (x >= 0 && x <= 9 && y >= 0 && y <= 9) {//make sure the square is within the boundaries of grid
        var matric = player1.gridMatrix[x][y];
        var id = 'p' + x + '' + y; //id of span
        if (matric == 2) {
            //update status
            if(status == 3) {status = -1}
            else {status++}
            botShot(); //try again
        } else if (matric == 0) {
            //update status
            if(status == 3){ status = -1;}
            else{ status++; }
            failedSot(player1, id, x, y);//failed shot
        } else if (matric == 1) {
            direction = status; //update direction
            status = 10;//update status
            successShot(bot, player1, id, 'b-hits', x, y);//successful shot
        }
    }else{
        //update status
        if(status == 3) {status = 1}
        else {status++}
    }
}
//-----  supporting functions to the main functions  ---------//
//convert a string to array of integers
function split(str){
    res = [];
    len = str.length;
    for (var i = 0; i < len; i++) {
        temp = str.charAt(i)
        res.push(+parseInt(temp));
    }
    return res;
}
//random square generator
function randomSquare() {
    var x = Math.floor((Math.random() * 100) + 100); //100 <= x <= 199
    x = '' + x;
    var square = split('' + x);
    square[0] = square[1];
    square[1] = square[2];
    return square;
}
//____________Who Wins____mate
function whoWins() {
    msg = document.getElementById('win');
    if (player1.hits == 17) {
        msg.style.color = 'green';
        msg.innerHTML = "You have won the battle!";
    } else if (bot.hits == 17) {
        msg.style.color = '#d62828';
        msg.innerHTML = "You have lost the battle!";
    }
}
//orientation handler
function setOrientation(arg) {
    var o = document.getElementById("orient");
    if (arg == 0) {
        orient = 0; //horizontal 
        o.innerHTML = "horizontal";
    } else if (arg == 1) {
        orient = 1; //vertical
        o.innerHTML = "vertical";
    }
}
//---- successful shot to update records of players---
function successShot(shooter, victim, squareId, hitId, x, y){
    victim.gridMatrix[x][y] = 2;
    document.getElementById(squareId).style.backgroundColor = "#d62828";
    shooter.hits++;
    document.getElementById(hitId).innerHTML = 'hits ' + shooter.hits + '/17';
}
//---- failed shot to update records of players---
function failedSot(victim, squareId, x, y){
    victim.gridMatrix[x][y] = 2;
    document.getElementById(squareId).style.backgroundColor = "white";
}
//--- Initial message for user ship placement
function shipPlacementMessage(){
    //hide placement div
    if (player1.placed == 5) {
        document.getElementById("placement").style.display = "none";
        return;
    }
    //ship placement message
    var msgReq = player1.ship[player1.placed].spaces;
    var shipMessage = "Place the " + player1.ship[player1.placed].name + "( " + msgReq + " spaces )";
    document.getElementById("ship-msg").innerHTML = shipMessage;
}