const fs = require('fs')
var prompt = require('prompt-sync')();
const clear = require('console-clear');

var setofCards = []

var bot1 = []//Bot dealer
var bot1Value = []
var bot2 = [] //Bot Player
var bot2Value = []


function runGame(start) {
    prepare("start");

    generateCards();
    botPlayerPlay();
    dealerBot()

    function generateCards() {
        var genCard1 = Math.floor(Math.random() * (setofCards.length - 1));
        var playerCard1 = setofCards[genCard1]
        setofCards.splice(genCard1, 1)
        var genCard2 = Math.floor(Math.random() * (setofCards.length - 1));
        var playerCard2 = setofCards[genCard2]
        setofCards.splice(genCard2, 1)
        var genCard3 = Math.floor(Math.random() * (setofCards.length - 1));
        var playerCard3 = setofCards[genCard3]
        setofCards.splice(genCard3, 1)
        var genCard4 = Math.floor(Math.random() * (setofCards.length - 1));
        var playerCard4 = setofCards[genCard4]
        setofCards.splice(genCard4, 1)


        bot1.push(simplifyCard(playerCard1.suit, playerCard1.value))
        bot2.push(simplifyCard(playerCard2.suit, playerCard2.value))
        bot1.push(simplifyCard(playerCard3.suit, playerCard3.value))
        bot2.push(simplifyCard(playerCard4.suit, playerCard4.value))
        cardsValue(bot2);
    }

    function simplifyCard(suit, value) {
        var returnedValue = "";

        if (value === 1) {
            returnedValue + "1"
        } else if (value === 2) {
            returnedValue += "2"
        } else if (value === 3) {
            returnedValue += "3"
        } else if (value === 4) {
            returnedValue += "4"
        } else if (value === 5) {
            returnedValue += "5"
        } else if (value === 6) {
            returnedValue += "6"
        } else if (value === 7) {
            returnedValue += "7"
        } else if (value === 8) {
            returnedValue += "8"
        } else if (value === 9) {
            returnedValue += "9"
        } else if (value === 10) {
            returnedValue += "10"
        } else if (value === "J") {
            returnedValue += "J"
        } else if (value === "Q") {
            returnedValue += "Q"
        } else if (value === "K") {
            returnedValue += "K"
        } else if (value === "A") {
            returnedValue += "A"
        }

        if (suit === 'clubs') {
            returnedValue += "♣️";
        } else if (suit === 'hearts') {
            returnedValue += "♥";
        } else if (suit === 'diamonds') {
            returnedValue += "♦";
        } else if (suit === 'spades') {
            returnedValue += "♠";
        }
        //console.log(returnedValue)
        return (returnedValue)
    }

    function generateNewCards(whosCards) {
        var genNewCard = Math.floor(Math.random() * (setofCards.length - 1));
        var newCard = setofCards[genNewCard]
        setofCards.splice(genNewCard, 1)
        whosCards.push(simplifyCard(newCard.suit, newCard.value))
        cardsValue(whosCards);
    }

    function displayCards() {
        clear();
        console.log(bot1)
        console.log(`House's Value: ${bot1Value} \n\n`)
        console.log(bot2)
        console.log(`Your Value: ${[bot2Value]} \n\n`)
    }

    function cardsValue(whosCards) {
        var cardsSum = 0;
        var amountofA = 0;

        for (let i = 0; i < (whosCards.length); i++) {
            if (whosCards[i].includes("K") || whosCards[i].includes("Q") || whosCards[i].includes("J")) {
                cardsSum += 10
            } else if (whosCards[i].includes("2")) {
                cardsSum += 2
            } else if (whosCards[i].includes("3")) {
                cardsSum += 3
            } else if (whosCards[i].includes("4")) {
                cardsSum += 4
            } else if (whosCards[i].includes("5")) {
                cardsSum += 5
            } else if (whosCards[i].includes("6")) {
                cardsSum += 6
            } else if (whosCards[i].includes("7")) {
                cardsSum += 7
            } else if (whosCards[i].includes("8")) {
                cardsSum += 8
            } else if (whosCards[i].includes("9")) {
                cardsSum += 9
            } else if (whosCards[i].includes("10")) {
                cardsSum += 10
            } else if (whosCards[i].includes("A")) {
                amountofA += 1
            }
        }
        while (true) {
            if (amountofA > 0) {
                if (cardsSum + 11 > 21) {
                    cardsSum += 1
                } else {
                    cardsSum += 11
                }
                amountofA--
            } else {
                break;
            }
        }
        if (whosCards === bot2) bot2Value = cardsSum
        if (whosCards === bot1) bot1Value = cardsSum
        // console.log(amountofA)
    }

    function gameEnder(winner) {
        var matches = []
        importJson(matches, "data/match-history.json")
        if (winner === "player") {
            console.log(`Player wins!`)
        } else if (winner === "house") {
            console.log(`House wins!`)
        } else {
            console.log('Push!')
        }
        matches.push(`House Cards: ${bot1} (${bot1Value}), Player Cards: ${bot2} (${bot2Value}), Winner: ${winner}, Cards Remaining: ${setofCards.length}`)
        saveJson(matches, "data/match-history.json")
    }

    function botPlayerPlay() {
        if (bot2Value > 21) {
            clear();
            console.log(bot1)
            console.log(`House's Value: ${bot1Value} \n\n`)
            console.log(bot2)
            console.log(`Your Value: ${[bot2Value]} \n\n`)
            console.log("House wins!")
            return;
        }
        cardsValue(bot1)
        if (bot1Value <= 13) {
            var prob1 = Math.floor(Math.random() * 101);
            generateNewCards(bot1)
            clear();
            if ((prob1 <= 92) && (bot1Value <= 14)) {
                var prob2 = Math.floor(Math.random() * 101);
                generateNewCards(bot1)
                clear();
                if ((prob2 <= 20) && (bot1Value <= 16)) {
                    generateNewCards(bot1)
                    clear();
                }
            }
        } else {
            cardsValue(bot1)
            clear();
        }

        console.log(bot1)
        console.log(`House's Value: ${bot1Value} \n\n`)
        console.log(bot2)
        console.log(`Your Value: ${[bot2Value]} \n\n`)
        if (bot2Value > 21 && bot1Value > 21) {
            gameEnder("push")
        } else if (bot1Value > 21) {
            gameEnder("player")
        } else if (bot1Value > bot2Value) {
            gameEnder("house")
        } else if (bot2Value > bot1Value) {
            gameEnder("player")
        } else if (bot2Value === bot1Value) {
            gameEnder("push")
        }
        prepare("end");

    }

    function dealerBot() {
        while(bot1Value < 17){
            cardsValue(bot1)

            if(bot1Value > 17) break;
            generateNewCards() 
        }
    }

}

function prepare(status) {
    var prepareCards = []
    if (status === "start") {
        importJson(prepareCards, 'data/cardsinset.json')
        for (var i = 0; i < prepareCards.length; i++) {
            setofCards.push(prepareCards[i])
        }

    }

    if (status === "end") {
        if ((setofCards.length < 8)) {
            console.log("DECK SHUFFLED")
            setofCards = []
            var matches1 = []
            importJson(setofCards, 'data/deckofcards.json')
            importJson(setofCards, 'data/deckofcards.json')
            saveJson(setofCards, 'data/cardsinset.json')
        } else {
            saveJson(setofCards, 'data/cardsinset.json')
        }
    }
}

function finisher(error) {
    if (error) {
        console.error(error)
        return
    }
}

function importJson(array, file) {
    const rawdjson = fs.readFileSync(file);
    const jsJson = JSON.parse(rawdjson);
    for (let i = 0; i < jsJson.length; i++) {
        array.push(jsJson[i]);
    }
    // console.log(`${file} has been imported.`)
}

function saveJson(array, file) {
    const jsonData = JSON.stringify(array, null, 2)
    fs.writeFile(file, jsonData, finisher)
    // console.log(`Data has been saved to ${file}`)
}


runGame()
