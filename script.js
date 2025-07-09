export function setupRPSGame() {
  const choices = ['rock', 'paper', 'scissors'];
  const buttons = choices.map(choice => document.getElementById(choice));
  const resultDiv = document.getElementById('result');
  const playerChoiceDiv = document.getElementById('player-choice');
  const computerChoiceDiv = document.getElementById('computer-choice');
  const playerScoreSpan = document.getElementById('player-score');
  const computerScoreSpan = document.getElementById('computer-score');
  const roundInfo = document.getElementById('round-info');
  const resetButton = document.getElementById('reset-button');

  let playerScore = 0;
  let computerScore = 0;
  let round = 1;
  const maxRounds = 5;

  function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  function getResult(player, computer) {
    if (player === computer) return "It's a draw!";
    if (
      (player === 'rock' && computer === 'scissors') ||
      (player === 'paper' && computer === 'rock') ||
      (player === 'scissors' && computer === 'paper')
    ) {
      playerScore++;
      return 'You win!';
    }
    computerScore++;
    return 'You lose!';
  }

  function handleClick(e) {
    if (round > maxRounds) return;

    const playerChoice = e.target.id;
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    playerChoiceDiv.textContent = `Your choice: ${capitalize(playerChoice)}`;
    computerChoiceDiv.textContent = `Computer's choice: ${capitalize(computerChoice)}`;
    resultDiv.textContent = result;

    playerScoreSpan.textContent = `You: ${playerScore}`;
    computerScoreSpan.textContent = `Computer: ${computerScore}`;
    
    round++;
    if (round > maxRounds) {
      declareFinalResult();
    } else {
      roundInfo.textContent = `Round ${round}/${maxRounds}`;
    }
  }

  function declareFinalResult() {
    if (playerScore > computerScore) {
      resultDiv.textContent = 'Congratulations! You Won The Game!';
    } else if (computerScore > playerScore) {
      resultDiv.textContent = 'Game Over! Computer Wins The Game!';
    } else {
      resultDiv.textContent = "It's a Tie Game! Try Again!";
    }
  }

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    round = 1;
    playerScoreSpan.textContent = `You: ${playerScore}`;
    computerScoreSpan.textContent = `Computer: ${computerScore}`;
    playerChoiceDiv.textContent = `Your choice: ?`;
    computerChoiceDiv.textContent = `Computer's choice: ?`;
    resultDiv.textContent = 'Make your choice!';
    roundInfo.textContent = `Round 1/${maxRounds}`;
  }

  buttons.forEach(btn => {
    if (btn) btn.addEventListener('click', handleClick);
  });

  resetButton.addEventListener('click', resetGame);
}

// run it immediately:
setupRPSGame();
