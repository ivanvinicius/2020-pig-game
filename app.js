/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying, diceDOM, playerZeroDOM, playerOneDOM;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
  if(gamePlaying){ 
    // To find a integer number between 1 and 6
    var dice = Math.floor(Math.random() * 6) + 1; 
    
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    if(dice !== 1){
      roundScore += dice;
      
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } 
    else {
      nextPlayer();  
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
  if(gamePlaying){  
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    if(scores[activePlayer] >= 100){
      document.querySelector('#name-'+ activePlayer).textContent = 'Winner';
      
      diceDOM.style.display = 'none';
      
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      
      gamePlaying = false;
    } 
    else{
      nextPlayer();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

/**Change to the next player */
function nextPlayer(){
  diceDOM.style.display = 'none';
  roundScore = 0;
  
  document.querySelector('#current-' + activePlayer).textContent = 0;
  
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

  playerZeroDOM.classList.toggle('active');
  playerOneDOM.classList.toggle('active');
}

/**Start new game */
function init(){
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  diceDOM = document.querySelector('.dice');
  playerZeroDOM = document.querySelector('.player-0-panel');
  playerOneDOM = document.querySelector('.player-1-panel');
  diceDOM.style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';

  playerZeroDOM.classList.remove('winner');
  playerOneDOM.classList.remove('winner');

  playerZeroDOM.classList.remove('active');
  playerOneDOM.classList.remove('active');

  playerZeroDOM.classList.add('active');
}