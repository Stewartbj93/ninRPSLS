import * as fetchItems from './fetch.js'
//set global variables
let p1Choice = " ";
let p2Choice = " ";
let leftScore = 0;
let rightScore = 0;
let numOfPlayers = 0;
let winCon = 0;
let clickCount = 0;
let score = document.getElementById('score');
let displayResult = document.getElementById('displayResult');
let nextPrompt = document.getElementById('nextPrompt');
let victory = document.getElementById('victory');
//gateKeeper is set to 1 for 'on' and 0 for 'off' to halt the game between rounds
let gateKeeper = 1;
//this is the gateKeeper button for progressing rounds and resetting the game
let keeperBtn = document.getElementById("keeperBtn").addEventListener("click", () => {
    if(gameTypeKeeper == 1 ){
    leftScore = 0;
    rightScore= 0;
    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;

    }
    p1Choice = "";
    p2Choice = "";
    nextPrompt.innerText = " ";
    gateKeeper = 1;
    displayResult.innerText = 'Make your selection';
    victory.innerText = "Nintendo RPSLS"
});
let gameTypeKeeper = 1;


//Game Type Buttons
let p1Btn = document.getElementById("p1Btn").addEventListener("click", () => {
    if (gameTypeKeeper == 0) {
        alert("NO CHEATING!");
    }
    else { numOfPlayers = 1; }

});
let p2Btn = document.getElementById("p2Btn").addEventListener("click", () => {
    if (gameTypeKeeper == 0) {
        alert("NO CHEATING!");
    }
    else { numOfPlayers = 2; }
});

//Buttons for setting the number of games
let win1 = document.getElementById("win1").addEventListener("click", () => {
    if (gameTypeKeeper == 0) {
        alert("NO CHEATING!");
    }
    else { winCon = 1; }
});
let win3 = document.getElementById("win3").addEventListener("click", () => {
    if (gameTypeKeeper == 0) {
        alert("NO CHEATING!");
    }
    else { winCon = 3; }
});
let win4 = document.getElementById("win4").addEventListener("click", () => {
    if (gameTypeKeeper == 0) {
        alert("NO CHEATING!");
    }
    else { winCon = 4; }
});

//selection buttons
let rockBtn = document.getElementById("Rock").addEventListener("click", () => {
    playButtons('Rock');
});
let paperBtn = document.getElementById("Paper").addEventListener("click", () => {
    playButtons('Paper');
});
let scissorsBtn = document.getElementById("Scissors").addEventListener("click", () => {
    playButtons('Scissors');
});
let lizardBtn = document.getElementById("Lizard").addEventListener("click", () => {
    playButtons('Lizard');
});
let spockBtn = document.getElementById("Spock").addEventListener("click", () => {
    playButtons('Spock');
});



//Called on for single player games to get computer option
function getCompChoice() {
    fetchItems.setUrl("https://csa2020studentapi.azurewebsites.net/rpsls");
    fetchItems.getData();
    setTimeout(() => {
        console.log(fetchItems.getValue());
        p2Choice = fetchItems.getValue();


        // alert('The computer has chosen!');
    }, 800);
}
//the play buttons pass in their value and check the conditions of the game
//the game conditions, player# and wins#, will set off the appropriate behavior
//for storing/generating player choices, and setting off the function to see who wins
function playButtons(selection) {
    if (numOfPlayers == 2 && winCon > 0 && gateKeeper == 1) {
        if (clickCount == 0) {
            clickCount++;
            gameTypeKeeper = 0;
            p1Choice = selection;
            console.log(p1Choice);


        }
        else if (clickCount == 1 && winCon > 0 && gateKeeper == 1) {
            p2Choice = selection;
            console.log(p2Choice);
            clickCount = 0;
            roBotShamBo(p1Choice);
        }
    }
    else if (numOfPlayers == 1 && winCon > 0 && gateKeeper == 1) {
        console.log("FIGHT THE MACHINES!")
        gameTypeKeeper = 0;
        p1Choice = selection;
        getCompChoice();
        setTimeout(() => {
            roBotShamBo(p1Choice);

        }, 1000);
    }
    else if (numOfPlayers > 0 && winCon > 0 && gateKeeper == 0) {
        alert('Dont forget to hit the NEXT button');
    }
    else { alert('Please select a number of players, and number of games to play. Then make your first selection!') }
}


//Check for win condition, and toggles the gateKeeper
//Ends the game and resets the necessary values for starting a new game
//Essentially 'returning you to main menu'
function didIWin() {
    if (leftScore == winCon) {
        winCon = 0;
        numOfPlayers = 0;
        gateKeeper = 0;
        nextPrompt.innerText = 'Press Next to continue';
        gameTypeKeeper = 1;
        victory.innerText = 'Player 1 WINS!! To play again, press Next!';
    }
    else if (rightScore == winCon) {
        winCon = 0;
        numOfPlayers = 0;
        gateKeeper = 0;
        nextPrompt.innerText = 'Press Next to continue';
        gameTypeKeeper = 1;
        victory.innerText = 'Player 1 WINS!! To play again, press Next!';
    }
    else {
        p1Choice = "";
        p2Choice = "";
        gateKeeper = 0;
        nextPrompt.innerText = 'Press Next to continue';


    }
}






//This is the nested switch statement that evaluates to two choices against eachother,
//and assigns points. This is the beating heart of the game. 
function roBotShamBo(left) {
    switch (left) {
        // rockCases
        case 'Rock':
            switch (p2Choice) {
                case 'Paper':
                    rightScore++;
                    displayResult.innerText = "Paper covers Rock, Point to Player 2!"
                    
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;

                    didIWin();
                    break;
                case 'Scissors':
                    leftScore++;
                    displayResult.innerText = "Rock crushes Scissors, Point to Player 1!";
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;

                    didIWin();
                    break;
                case 'Lizard':
                    leftScore++;
                    displayResult.innerText = "Rock crushes Lizard, Point to Player 1!";
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;

                    didIWin();
                    break;
                case 'Spock':
                    rightScore++;
                    displayResult.innerText = "Spock vaporizes Rock, Point to Player 2!";
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;

                    didIWin();
                    break;
                default:
                    displayResult.innerText = 'We appear to have a tie...';
                    didIWin();
                    break;

            } break;

        //paperCases
        case 'Paper':
            switch (p2Choice) {
                case 'Rock':
                    leftScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Paper covers Rock, Point to Player 1!";
                    didIWin();
                    break;
                case 'Scissors':
                    rightScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Scissors cuts Paper, Point to Player 2!";
                    didIWin();
                    break;
                case 'Lizard':
                    rightScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Lizard Eats Paper, Point to Player 2!";
                    didIWin();
                    break;
                case 'Spock':
                    leftScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Lizard Poisons Spock, Point to Player 1!";
                    didIWin();
                    break;
                default:
                    displayResult.innerText = 'We appear to have a tie...';
                    didIWin();
                    break;
            } break;


        // scissorCases
        case 'Scissors':
            switch (p2Choice) {
                case 'Rock':
                    rightScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Rock crushes Scissors, Point to Player 2!";
                    didIWin();
                    break;
                case 'Paper':
                    leftScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Scissors cuts Paper, Point to Player 1!";
                    didIWin();
                    break;
                case 'Lizard':
                    leftScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Scissors DECAPITATE Lizard, Point to Player 1!";
                    didIWin();
                    break;
                case 'Spock':
                    rightScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Spock smashes Scissors, Point to Player 2!";

                    didIWin();
                    break;
                default:
                    displayResult.innerText = 'We appear to have a tie...';
                    didIWin();
                    break;
            }break;



        //lizardCases
        case 'Lizard':
            switch (p2Choice) {
                case 'Rock':
                    rightScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Rock crushes Lizard, Point to Player 2!";

                    didIWin();
                    break;
                case 'Paper':
                    leftScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Lizard Eats Paper, Point to Player 1!";
                    didIWin();
                    break;
                case 'Scissors':
                    rightScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Scissors DECAPITATE Lizard, Point to Player 2!";
                    didIWin();
                    break;
                case 'Spock':
                    leftScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Lizard Poisons Spock, Point to Player 1!";
                    didIWin();
                    break;
                default:
                    displayResult.innerText = 'We appear to have a tie...';
                    didIWin();
                    break;
            }break;

        // spockCases
        case 'Spock':
            switch (p2Choice) {
                case 'Rock':
                    leftScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Spock vaporizes Rock, Point to Player 1!";
                    didIWin();
                    break;
                case 'Paper':
                    rightScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Paper Disproves Spock, Point to Player 2!";
                    didIWin();
                    break;
                case 'Scissors':
                    leftScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Spock smashes Scissors, Point to Player 1!";
                    didIWin();
                    break;
                case 'Lizard':
                    rightScore++;
                    score.innerText ='Score: '+ leftScore + '  VS  ' + rightScore;
                    displayResult.innerText = "Lizard Poisons Spock, Point to Player 2!";
                    didIWin();
                    break;
                default:
                    displayResult.innerText = 'We appear to have a tie...';
                    didIWin();
                    break;
            }break;

        default:
            console.log('Something went wrong...');
            break;
    }
}
