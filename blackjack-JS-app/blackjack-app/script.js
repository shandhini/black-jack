

//  Blackjack
const gambling = new Audio("sounds/Deal with the Devil - Tia - Kakegurui ( 賭ケグルイ) OP  【Lyrics】 (320  kbps).mp3");
let blackjackGame = {
    "You": {"scoreSpan": "#your-blackjack-result", "div": "#your-box", "score": 0,},
    "Dealer": {"scoreSpan": "#dealer-blackjack-result", "div": "#dealer-box", "score": 0,},
    "Cards": ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'],
    "cardsMap": {'A': [1, 11], '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10,},
    "Wins": 0,
    "Losses": 0,
    "Draws": 0,
}

const YOU = blackjackGame['You'];
const DEALER = blackjackGame['Dealer'];

const HIT_SOUND = new Audio('sounds/swish.m4a');

document.querySelector('#hit').addEventListener('click', blackjackHit);
document.querySelector('#deal').addEventListener('click', blackjackDeal);
document.querySelector('#stand').addEventListener('click', dealerLogic);

function blackjackHit() {
    r = document.querySelector('#blackjack-result').textContent;
        if (YOU['score'] <= 21) {
            card = pickCard();
            showCard(YOU);
            updateScore(card, YOU);
            showScore(YOU);
        } else {
            alert('Sorry! Cannot pick card after bust.')
        }
}

function showCard(activePlayer) {
    displayCard(card, activePlayer);
}

function blackjackDeal() {
    document.querySelector('#blackjack-result').textContent = 'Let\'s Play';
    document.querySelector('#blackjack-result').style.color = '#212529'
    updateTable();
    let yourImages = document.querySelector('#your-box').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-box').querySelectorAll('img');
    for (let i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }
    for (let j = 0; j < dealerImages.length; j++) {
        dealerImages[j].remove();
    }
    HIT_SOUND.play();

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#dealer-blackjack-result').textContent = 0;

    document.querySelector('#your-blackjack-result').style.color = 'white';
    document.querySelector('#dealer-blackjack-result').style.color = 'white';
}

function displayCard(card, activePlayer) {
    let cardImage = document.createElement('img');
    cardImage.src = `images/${card}.png`;
    document.querySelector(activePlayer['div']).appendChild(cardImage);
    HIT_SOUND.play();
}

function pickCard() {
    return blackjackGame['Cards'][Math.floor(Math.random() * 13)];
}

function updateScore(card, activePlayer) {
    // If adding 11 keeps me below 21, add 11, otherwise add 1.
    if (card == 'A') {
        if (activePlayer['score'] + 11 <= 21) {
            activePlayer['score'] += 11;
        } else {
            activePlayer['score'] += 1;
        }
    } else {
        activePlayer['score'] += blackjackGame['cardsMap'][card];
    }
}

function showScore(activePlayer) {
    if (activePlayer['score'] <= 21) {
        document.querySelector(activePlayer['scoreSpan']).textContent = activePlayer['score'];
    } else {
        document.querySelector(activePlayer['scoreSpan']).textContent = 'BUST!';
        document.querySelector(activePlayer['scoreSpan']).style.color = 'red';
    }
}

function dealerLogic() {
    while (DEALER['score'] < 15) {
        let card = pickCard();
        displayCard(card, DEALER);
        updateScore(card, DEALER);
        showScore(DEALER);
    }

    showResult(computeWinner());
}

// Compute winner and return result
function computeWinner() {
    let winner;

    if (YOU['score'] <= 21) {
        if (YOU['score'] > DEALER['score'] || DEALER['score'] > 21) {
            winner = YOU;
        } else if (YOU['score'] < DEALER['score']) {
            winner = DEALER;
        }
    } else if (YOU['score'] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
    }
    return winner;
}

function showResult(result) {
    resultSpan = document.querySelector('#blackjack-result');
    if (result == YOU) {
        resultSpan.textContent = 'You won! :D' ;
        resultSpan.style.color = 'green';
        const kaChing = new Audio('sounds/cash.mp3');
        kaChing.play();
        blackjackGame['Wins']++;
    } else if (result == DEALER) {
        resultSpan.textContent = 'You lost! :-(';
        resultSpan.style.color = 'red';
        const aww = new Audio('sounds/aww.mp3');
        aww.play();
        blackjackGame['Losses']++;
    } else {
        resultSpan.textContent = 'You drew! :|';
        // resultSpan.style.color = 'black';
        blackjackGame['Draws']++;
    }
}

function blackjackReset() {
    document.querySelector('#blackjack-result').textContent = 'Let\'s Play!'
    document.querySelector('#blackjack-result').style.color = 'white'
}
function updateTable() {
    let wins = document.querySelector('#wins');
    let losses = document.querySelector('#losses');
    let draws = document.querySelector('#draws');

    wins.textContent = blackjackGame['Wins'];
    losses.textContent = blackjackGame['Losses'];
    draws.textContent = blackjackGame['Draws'];
}
