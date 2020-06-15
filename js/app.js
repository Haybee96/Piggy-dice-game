// Display clock
displayClock();

// Variables declaration
var scores, activePlayer, currentScore, startGame;

// Init Game
initalizeGame();

document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gameStarted) {
        // Generate random number for the two dices
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        // Display the dice according to the random number to the UI
        showDice();
        document.getElementById('dice-1').src = '/img/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = '/img/dice-' + dice2 + '.png';

        // Update the current score of the active player

        if (dice1 !== 1 && dice2 !== 1) {
            currentScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = currentScore;
        } else {
            // Next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gameStarted) {
        scores[activePlayer] += currentScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // Determine the winner
        var input = document.querySelector('.winning-score').value;
        var winningScore;
        
        if(input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }

        if (scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            hideDice();
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gameStarted = false;
        } else {
            // Next Player
            nextPlayer();
        }
    }
    
});

document.querySelector('.btn-new').addEventListener('click', initalizeGame);

function initalizeGame() {
    scores = [0, 0];
    activePlayer = 0;
    currentScore = 0;
    gameStarted = true;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    hideDice();
}

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    currentScore = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    hideDice();
}

function hideDice() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}

function showDice() {
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';
}


function displayClock() {
    var radialObj = radialIndicator('#clock', {
        radius: 60,
        barWidth: 5,
        barColor: '#FF0000',
        fontColor: '#fff',
        minValue: 0,
        maxValue: 60,
        fontWeight: 'bold',
        roundCorner: true,
        format: function (value) {
            var amPm, date, hrs, mins
            // create a date object
            date = new Date();
            hrs = date.getHours();
            mins = date.getMinutes();
            hrs = hrs % 12;
            // format with leading zero(0) including AM and PM
            hrs = (hrs < 10) ? '0' + hrs : hrs;
            mins = (mins < 10) ? '0' + mins : mins;
            amPm = (hrs < 12) ? 'pm' : 'am';
            hrs = hrs ? hrs : 12;
            timeFormat = hrs + ':' + mins + ' ' + amPm;
            return timeFormat;
        }
    });

    setInterval(function () {
        radialObj.value(new Date().getSeconds() + 1);
    }, 1000);

}