//Now lets start proper coding fokes
//let's do it mate
//set orientation of placing ships
var orient = 0;
var status = -1;
var direction = 0;
var indexesOFSpace = [];
var id = '';
var setOrientation = function (arg) {
    if (arg == 0) {
        orient = 0; //horizontal 
        document.getElementById("orient").innerHTML = "horizontal";
    } else if (arg == 1) {
        orient = 1; //vertical
        document.getElementById("orient").innerHTML = "vertical";
    }
}
//player class
class Player {
    constructor(name) {
        //name of the user
        this.name = name;
        //ships array and details
        this.ship = [{
                    name: "carrier",
                    killed: false,
                    spaces: 5
                },
                {
                    name: "battleship",
                    killed: false,
                    spaces: 4
                },
                {
                    name: "cruiser",
                    killed: false,
                    spaces: 3
                },
                {
                    name: "submarine",
                    killed: false,
                    spaces: 3
                },
                {
                    name: "destroyer",
                    killed: false,
                    spaces: 2
                }
            ],
            this.hits = 0; //total hits
        this.placed = 0; //ships palced
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
    }
} //player class ends

//Objects of player class
var player1 = new Player("Player1"); //user
var bot = new Player("Bot"); //bot

//convert a string to array of integers
var split = function (str) {
    res = [];
    len = str.length;
    for (var i = 0; i < len; i++) {
        temp = str.charAt(i)
        res.push(+parseInt(temp));
    }
    return res;
}
//event handler of player1
var userShip = function (space) {
    placeShips(player1, space);
}
//function to place the ships
var placeShips = function (player, space, id) {
    var index = split(space);
    //all players have been placed
    if (player.placed == 5) {
        return;
    }
    //space is filled
    var matric = player.gridMatrix[index[0]][index[1]];
    if (matric > 0) {
        return;
    }
    //--------------------player1 grid fill ups----------------//
    if (player.name == "Player1") {
        var shipType = player.placed;
        var req = player.ship[shipType].spaces;
        var valid = validSpace(player, index); //check for space validity
        var id = "p" + space;
        if (valid) {
            if (orient == 0) {
                for (i = index[1]; i < index[1] + req; i++) {
                    id = "p" + index[0] + '' + i;
                    player.gridMatrix[index[0]][i] = 1;
                    document.getElementById(id).parentElement.style.backgroundColor = "#003049";
                }
                player.placed++; //increment placed ships
            } else {

                for (i = index[0]; i < index[0] + req; i++) {
                    id = "p" + i + '' + index[1];
                    player.gridMatrix[i][index[1]] = 1;
                    document.getElementById(id).parentElement.style.backgroundColor = "#003049";
                }
                player.placed++; //increment placed ships
            }
            //hide placement div
            if (player.placed == 5) {
                document.getElementById("placement").style.display = "none";
                return;
            }
            var msgReq = player.ship[player.placed].spaces;
            var shipMessage = "Place the " + player.ship[player.placed].name + "( " + msgReq + " spaces )";
            document.getElementById("ship-msg").innerHTML = shipMessage;

        } else {
            return;
        }

    }
}
//functions to check the element on sides of a space according to the type of the ship
var validSpace = function (player, index) {
    if (orient == 0) {
        return horizontalValidity(player, index);
    } else {
        return verticalValidity(player, index);
    }
}
//horizontal validity
var horizontalValidity = function (player, index) {
    var shipType = player.placed;
    var req = player.ship[shipType].spaces;
    if (index[1] + req > 10) {
        return 0;
    }
    for (i = index[1]; i < index[1] + req; i++) {
        if (player.gridMatrix[index[0]][i] > 0) {
            return 0;
        }
    }
    return 1; //valid
}
//vertical validity
var verticalValidity = function (player, index) {
    var shipType = player.placed;
    var req = player.ship[shipType].spaces;
    if (index[0] + req > 10) {
        return 0;
    }
    for (i = index[0]; i < index[0] + req; i++) {
        if (player.gridMatrix[i][index[1]] > 0) {
            return 0;
        }
    }
    return 1; //valid
}

//-----------------Bot grid ship placement functions here______
var placeBotShips = function () {

    while (true) {

        //all players have been placed
        if (bot.placed == 5) {
            break;
        }
        // orientation random generation
        var y = Math.random(); //<1
        if (y < 0.5) {
            orient = 0
        } else {
            orient = 1
        }

        //space random generation
        var x = Math.floor((Math.random() * 100) + 100); //100 <= x <= 199
        x = '' + x;

        var index = split('' + x);
        index[0] = index[1];
        index[1] = index[2];
        //space is filled
        var matric = bot.gridMatrix[index[0]][index[1]];
        if (matric > 0) {
            continue;
        }
        var shipType = bot.placed;
        var req = bot.ship[shipType].spaces;
        //space validity
        var valid = validSpace(bot, index);
        if (valid) { //valid space
            if (orient == 0) {
                for (i = index[1]; i < index[1] + req; i++) {
                    id = "p" + index[0] + '' + i;
                    bot.gridMatrix[index[0]][i] = 1;
                }
                bot.placed++; //increment placed ships
            } else {
                for (i = index[0]; i < index[0] + req; i++) {
                    id = "p" + i + '' + index[1];
                    bot.gridMatrix[i][index[1]] = 1;
                }
                bot.placed++; //increment placed ships
            }
        }

    }
    orient = 0; //set orientation to default
}
placeBotShips(); //invoke
//----------------------------------------------------
//------------------------Gameplay here-----------------
var userShot = function (space) {
    shot(player1, space);
}
var shot = function (player, space) {
    var index = split(space); //indexes
    var id = 'b' + space; //id of span
    //all players have been placed
    if (player.hits == 17 ||bot.hits == 17 || player.placed != 5) {
        return;
    }
    //space is filled
    var matric = bot.gridMatrix[index[0]][index[1]];
    if (matric == 2) {
        return;
    } else if (matric == 0) {
        bot.gridMatrix[index[0]][index[1]] = 2;
        document.getElementById(id).style.backgroundColor = "white";

    } else if (matric == 1) {
        bot.gridMatrix[index[0]][index[1]] = 2;
        document.getElementById(id).style.backgroundColor = "#d62828";
        player.hits++;
        document.getElementById('p-hits').innerHTML = 'hits ' + player.hits + '/17';
    }
    whoWins();//check if player1 won
    botShot(); //bot turn now
}
//Bots turn
var botShot = function () {

    //all players have been placed
    if (bot.hits == 17 || player1.hits == 17) {
        return;
    }
    if (status == -1) { //new space


        //space random generation
        var x = Math.floor((Math.random() * 100) + 100); //100 <= x <= 199
        x = '' + x;

        var index = split('' + x);
        index[0] = index[1];
        index[1] = index[2];
        var id = 'p' + index[0] + '' + index[1]; //id of span
        //space is filled
        var matric = player1.gridMatrix[index[0]][index[1]];
        if (matric == 2) {
            botShot(); //recursive call
        } else if (matric == 0) {
            player1.gridMatrix[index[0]][index[1]] = 2;
            document.getElementById(id).style.backgroundColor = "white";
        } else if (matric == 1) {
            player1.gridMatrix[index[0]][index[1]] = 2;
            document.getElementById(id).style.backgroundColor = "#d62828";
            bot.hits++;
            document.getElementById('b-hits').innerHTML = 'hits ' + bot.hits + '/17';
            status = 0;
            indexesOFSpace = index;
        }


    } else if (status >= 0 && status < 4) { //working around a red spot

        if (status == 0) { //right
            var id = 'p' + indexesOFSpace[0] + '' + (indexesOFSpace[1] + 1); //id of span
            if ((indexesOFSpace[1] + 1) <= 9) { //prediction within the borders
                var matric = player1.gridMatrix[indexesOFSpace[0]][indexesOFSpace[1] + 1];
                if (matric == 2) {
                    status = 1;
                    botShot(); //recursive call
                } else if (matric == 0) {
                    status = 1;
                    player1.gridMatrix[indexesOFSpace[0]][indexesOFSpace[1] + 1] = 2;
                    document.getElementById(id).style.backgroundColor = "white";
                } else if (matric == 1) {
                    status = 10;
                    direction = 0; //right
                    player1.gridMatrix[indexesOFSpace[0]][indexesOFSpace[1] + 1] = 2;
                    document.getElementById(id).style.backgroundColor = "#d62828";
                    bot.hits++;
                    document.getElementById('b-hits').innerHTML = 'hits ' + bot.hits + '/17';
                }
            } else {
                status = 1; //change status to left
                botShot(); //recursive call
            }

        } else if (status == 1) { //left
            var id = 'p' + indexesOFSpace[0] + '' + (indexesOFSpace[1] - 1); //id of span
            if ((indexesOFSpace[1] - 1) >= 0) {
                var matric = player1.gridMatrix[indexesOFSpace[0]][indexesOFSpace[1] - 1];
                if (matric == 2) {
                    status = 2;
                    botShot(); //recursive call
                } else if (matric == 0) {
                    status = 2;
                    player1.gridMatrix[indexesOFSpace[0]][indexesOFSpace[1] - 1] = 2;
                    document.getElementById(id).style.backgroundColor = "white";
                } else if (matric == 1) {
                    status = 10;
                    direction = 1; //left
                    player1.gridMatrix[indexesOFSpace[0]][indexesOFSpace[1] - 1] = 2;
                    document.getElementById(id).style.backgroundColor = "#d62828";
                    bot.hits++;
                    document.getElementById('b-hits').innerHTML = 'hits ' + bot.hits + '/17';
                }
            } else {
                status = 2; //change status to top
                botShot(); //recursive call
            }

        } else if (status == 2) { //top
            var id = 'p' + (indexesOFSpace[0] - 1) + '' + indexesOFSpace[1]; //id of span
            if ((indexesOFSpace[0] - 1) >= 0) {
                var matric = player1.gridMatrix[indexesOFSpace[0] - 1][indexesOFSpace[1]];
                if (matric == 2) {
                    status = 3;
                    botShot(); //recursive call
                } else if (matric == 0) {
                    status = 3;
                    player1.gridMatrix[indexesOFSpace[0] - 1][indexesOFSpace[1]] = 2;
                    document.getElementById(id).style.backgroundColor = "white";
                } else if (matric == 1) {
                    status = 10;
                    direction = 2; //top
                    player1.gridMatrix[indexesOFSpace[0] - 1][indexesOFSpace[1]] = 2;
                    document.getElementById(id).style.backgroundColor = "#d62828";
                    bot.hits++;
                    document.getElementById('b-hits').innerHTML = 'hits ' + bot.hits + '/17';
                }
            } else {
                status = 3; //change status to bottom
                botShot(); //recursive call
            }
        } else if (status == 3) { //bottom
            var id = 'p' + (indexesOFSpace[0] + 1) + '' + indexesOFSpace[1]; //id of span
            if ((indexesOFSpace[0] + 1) <= 9) {
                var matric = player1.gridMatrix[indexesOFSpace[0] + 1][indexesOFSpace[1]];
                if (matric == 2) {
                    status = -1;
                    botShot(); //recursive call
                } else if (matric == 0) {
                    status = -1;
                    player1.gridMatrix[indexesOFSpace[0] - 1][indexesOFSpace[1]] = 2;
                    document.getElementById(id).style.backgroundColor = "white";
                } else if (matric == 1) {
                    status = 10;
                    direction = 3; //bottom
                    player1.gridMatrix[indexesOFSpace[0] + 1][indexesOFSpace[1]] = 2;
                    document.getElementById(id).style.backgroundColor = "#d62828";
                    bot.hits++;
                    document.getElementById('b-hits').innerHTML = 'hits ' + bot.hits + '/17';
                }
            } else {
                status = 1; //change status to right
                botShot(); //recursive call
            }

        }


    } else if (status == 10) { //wotking to finish the ship
        if (direction == 0) { //right
            indexesOFSpace[1]++; //update the space
            if ((indexesOFSpace[1] + 1) <= 9) { //boundary check
                var id = 'p' + indexesOFSpace[0] + '' + (indexesOFSpace[1] + 1); //id of span
                var matric = player1.gridMatrix[indexesOFSpace[0]][indexesOFSpace[1] + 1];
                if (matric == 2) {
                    status = -1;
                    botShot(); //recursive call
                } else if (matric == 0) {
                    status = -1;
                    player1.gridMatrix[indexesOFSpace[0]][indexesOFSpace[1] + 1] = 2;
                    indexesOFSpace = []; //reset
                    document.getElementById(id).style.backgroundColor = "white";
                } else if (matric == 1) {
                    status = 10;
                    player1.gridMatrix[indexesOFSpace[0]][indexesOFSpace[1] + 1] = 2;
                    document.getElementById(id).style.backgroundColor = "#d62828";
                    bot.hits++;
                    document.getElementById('b-hits').innerHTML = 'hits ' + bot.hits + '/17';
                }
            } else {
                status = -1;
                botShot(); //recursive call
            }

        } else if (direction == 1) { //left
            indexesOFSpace[1]--; //update the space
            if ((indexesOFSpace[1] - 1) >= 0) {
                var id = 'p' + indexesOFSpace[0] + '' + (indexesOFSpace[1] - 1); //id of span
                var matric = player1.gridMatrix[indexesOFSpace[0]][indexesOFSpace[1] - 1];
                if (matric == 2) {
                    status = -1;
                    botShot(); //recursive call
                } else if (matric == 0) {
                    status = -1;
                    player1.gridMatrix[indexesOFSpace[0]][indexesOFSpace[1] - 1] = 2;
                    indexesOFSpace = []; //reset
                    document.getElementById(id).style.backgroundColor = "white";
                } else if (matric == 1) {
                    status = 10;
                    player1.gridMatrix[indexesOFSpace[0]][indexesOFSpace[1] - 1] = 2;
                    document.getElementById(id).style.backgroundColor = "#d62828";
                    bot.hits++;
                    document.getElementById('b-hits').innerHTML = 'hits ' + bot.hits + '/17';
                }
            } else {
                status = -1;
                botShot(); //recursive call
            }

        } else if (direction == 2) { //top
            indexesOFSpace[0]--; //update the space
            if ((indexesOFSpace[0] - 1) >= 0) {
                var id = 'p' + (indexesOFSpace[0] - 1) + '' + indexesOFSpace[1]; //id of span
                var matric = player1.gridMatrix[indexesOFSpace[0] - 1][indexesOFSpace[1]];
                if (matric == 2) {
                    status = -1;
                    botShot(); //recursive call
                } else if (matric == 0) {
                    status = -1;
                    player1.gridMatrix[indexesOFSpace[0] - 1][indexesOFSpace[1]] = 2;
                    indexesOFSpace = []; //reset
                    document.getElementById(id).style.backgroundColor = "white";
                } else if (matric == 1) {
                    status = 10;
                    player1.gridMatrix[indexesOFSpace[0] - 1][indexesOFSpace[1]] = 2;
                    document.getElementById(id).style.backgroundColor = "#d62828";
                    bot.hits++;
                    document.getElementById('b-hits').innerHTML = 'hits ' + bot.hits + '/17';
                }
            } else {
                status = -1;
                botShot(); //recursive call
            }

        } else if (direction == 3) { //bottom
            indexesOFSpace[0]++; //update the space
            if((indexesOFSpace[0] + 1) <= 9){
                var id = 'p' + (indexesOFSpace[0] + 1) + '' + indexesOFSpace[1]; //id of span
                if (matric == 2) {
                    status = -1;
                    botShot(); //recursive call
                } else if (matric == 0) {
                    status = -1;
                    player1.gridMatrix[indexesOFSpace[0] + 1][indexesOFSpace[1]] = 2;
                    indexesOFSpace = []; //reset
                    document.getElementById(id).style.backgroundColor = "white";
                } else if (matric == 1) {
                    status = 10;
                    player1.gridMatrix[indexesOFSpace[0] + 1][indexesOFSpace[1]] = 2;
                    document.getElementById(id).style.backgroundColor = "#d62828";
                    bot.hits++;
                    document.getElementById('b-hits').innerHTML = 'hits ' + bot.hits + '/17';
                }
            }else{
                status = -1;
                botShot(); //recursive call
            }
           
        }
    }
    whoWins();//check if bot won

}
//____________Who Wins____mate
var whoWins = function(){
    msg = document.getElementById('win');
    if(player1.hits == 17){
        msg.style.color = 'green';
        msg.innerHTML = "You have won the game!";
    }else if(bot.hits == 17){
        msg.style.color = '#d62828';
        msg.innerHTML = "Bot has won the game!";
    }
}
