var prompt = require('prompt-sync')(); //https://www.npmjs.com/package/prompt-sync
var turn = "🔴" //Red is default, which turn it is.
var scoreboard = [0,0]
var board = [ ["|    ", "|    ", "|    ", "|    ", "|    ", "|    ", "|    "], //0
              ["|    ", "|    ", "|    ", "|    ", "|    ", "|    ", "|    "], //1
              ["|    ", "|    ", "|    ", "|    ", "|    ", "|    ", "|    "], //2
              ["|    ", "|    ", "|    ", "|    ", "|    ", "|    ", "|    "], //3
              ["|    ", "|    ", "|    ", "|    ", "|    ", "|    ", "|    "], //4
              ["|    ", "|    ", "|    ", "|    ", "|    ", "|    ", "|    "], //5
];
//                 0        1       2        3        4         5      6

function printboard(){
    console.log(`   1    2    3    4    5    6    7  `)
    console.log(board[0][0] + board[0][1] + board[0][2] + board[0][3] + board[0][4] + board[0][5] + board[0][6] + "|"); //Row 1
    console.log(board[1][0] + board[1][1] + board[1][2] + board[1][3] + board[1][4] + board[1][5] + board[1][6] + "|"); //Row 2
    console.log(board[2][0] + board[2][1] + board[2][2] + board[2][3] + board[2][4] + board[2][5] + board[2][6] + "|"); //Row 3
    console.log(board[3][0] + board[3][1] + board[3][2] + board[3][3] + board[3][4] + board[3][5] + board[3][6] + "|"); //Row 4
    console.log(board[4][0] + board[4][1] + board[4][2] + board[4][3] + board[4][4] + board[4][5] + board[4][6] + "|"); //Row 5
    console.log(board[5][0] + board[5][1] + board[5][2] + board[5][3] + board[5][4] + board[5][5] + board[5][6] + "|"); //Row 6
}

function runGame(){
    printboard();
    console.log("Pick one of the options: 1, 2, 3, 4, 5, 6, 7, or quit")


    while(true){
        var selection = prompt("Pick a row! => ")

        if(selection === "reset")break;

        if(selection === 'quit'){
            break;
        }


            if(turn === "🔴"){
            updateBoard(selection,"🔴");    
            } else {
            updateBoard(selection,"🟡");    
            }
            
            if(checkwin() === "Winner"){
                console.log(`${turn} wins!`)
                score(turn)
                finisher();
                break;
            } else if(checkwin() === "Draw"){
                console.log(`Draw! No one wins.`)
                console.log(`🔴 ${scoreboard[0]} - ${scoreboard[1]} 🟡`)
                finisher();
                break;
            }

            turnSwap();

    }
    var cont = prompt("Would you like to continue? y/n => ")
        if (cont.toLowerCase() === "y" ||cont.toLowerCase === "yes"){
            runGame();
        } else if (cont.toLowerCase() === "n" ||cont.toLowerCase === "no"){
            console.log("Goodbye!")
        } else {
            console.log("That was not an option, goodbye!")

        }
        
}

function updateBoard(num,color) {
    if(num === "1" || num === "2" || num === "3" || num === "4" || num === "5" || num === "6" || num === "7"){
    for(var i = 5; i >= 0; i--){
        if(board[i][num-1] === "|    " ){
            board[i][num-1] = `| ${color} `
            printboard();
            break;
        }
    } 
}else {
    console.log("That is not an option!")
}
}

function checkwin(){
    for(var i = 0; i <= 5; i++){
        if((board[i][0] === `| ${turn} `  && board[i][1] === `| ${turn} `  && board[i][2] === `| ${turn} `  && board[i][3] === `| ${turn} `) || (board[i][1] === `| ${turn} `  && board[i][2] === `| ${turn} `  && board[i][3] === `| ${turn} `  && board[i][4] === `| ${turn} `) || (board[i][2] === `| ${turn} `  && board[i][3] === `| ${turn} `  && board[i][4] === `| ${turn} `  && board[i][5] === `| ${turn} `) || (board[i][3] === `| ${turn} `  && board[i][4] === `| ${turn} `  && board[i][5] === `| ${turn} `  && board[i][6] === `| ${turn} `) ){
            return("Winner"); //Checks for horizontal win
        }

    }
    for(var i = 0; i < 6; i++){
        if((board[0][i] === `| ${turn} `  && board[1][i] === `| ${turn} `  && board[2][i] === `| ${turn} `  && board[3][i] === `| ${turn} `) || (board[1][i] === `| ${turn} `  && board[2][i] === `| ${turn} `  && board[3][i] === `| ${turn} `  && board[4][i] === `| ${turn} `) || (board[2][i] === `| ${turn} `  && board[3][i] === `| ${turn} `  && board[4][i] === `| ${turn} `  && board[5][i] === `| ${turn} `) || (board[i][3] === `| ${turn} ` && board[i][4] === `| ${turn} ` && board[i][5] === `| ${turn} ` && board[i][6] === `| ${turn} `)){
            return("Winner"); //Checks for verticle win
        }
    }
    for(var i = 0; i <= 4; i++){
        if((board[5][i + 0] === `| ${turn} ` && board[4][i + 1] === `| ${turn} ` && board[3][i + 2] === `| ${turn} ` && board[2][i + 3] === `| ${turn} `) || (board[4][i + 0] ===`| ${turn} ` && board[3][i + 1] === `| ${turn} ` && board[2][i + 2] === `| ${turn} ` && board[1][i + 3] === `| ${turn} `) || (board[3][i + 0] === `| ${turn} ` && board[2][i + 1] === `| ${turn} ` && board[1][i + 2] === `| ${turn} ` && board[0][i + 3] === `| ${turn} `)){
            return("Winner"); //Checks for left diagonal win
        }
        if((board[5][i + 3] === `| ${turn} ` && board[4][i + 2] === `| ${turn} ` && board[3][i + 1] === `| ${turn} ` && board[2][i + 0] === `| ${turn} `) || (board[4][i + 3] ===`| ${turn} ` && board[3][i + 2] === `| ${turn} ` && board[2][i + 1] === `| ${turn} ` && board[1][i + 0] ===`| ${turn} `) || (board[3][i + 3] === `| ${turn} ` && board[2][i + 2] === `| ${turn} ` && board[1][i + 1] === `| ${turn} ` && board[0][i + 0] === `| ${turn} `)){
            return("Winner"); //Checks for right diagonal win
        }
    }

    if(board[0][0] != "|    ", board[0][1] != "|    ", board[0][2] != "|    ", board[0][3] != "|    ", board[0][4] != "|    ", board[0][5] != "|    ", board[0][6]!= "|    "){
        return("Draw")
    }
return("NA"); //None of the above

}

function turnSwap() {
    if(turn === "🔴"){
        turn = "🟡"
    } else{
        turn = "🔴"
    }
}

function score(winnerturn){
    if(winnerturn === "🔴"){
        scoreboard[0] = scoreboard[0] + 1
    }
    if(winnerturn === "🟡"){
        scoreboard[1] = scoreboard[1] + 1
    }
    console.log(`🔴 ${scoreboard[0]} - ${scoreboard[1]} 🟡`)
}

function finisher(){
    board = [ ["|    ", "|    ", "|    ", "|    ", "|    ", "|    ", "|    "],
              ["|    ", "|    ", "|    ", "|    ", "|    ", "|    ", "|    "],
              ["|    ", "|    ", "|    ", "|    ", "|    ", "|    ", "|    "],
              ["|    ", "|    ", "|    ", "|    ", "|    ", "|    ", "|    "],
              ["|    ", "|    ", "|    ", "|    ", "|    ", "|    ", "|    "],
              ["|    ", "|    ", "|    ", "|    ", "|    ", "|    ", "|    "],
];
}
    turn = "🔴" //Red is default
runGame();
