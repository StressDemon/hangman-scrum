const words = [
  "scrum",
  "agile",
  "sprint",
  "backlog",
  "scrumMaster",
  "productOwner",
  "dailyStandup",
  "userStory",
  "velocity",
  "retrospective",
  "kanban",
  "scrumBoard",
  "increment",
  "burndown",
  "definitionOfDone",
];

let round = 1;
let correctAnswers = 0;
let selectedWord, guessedLetters, mistakes;

function startGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
  guessedLetters = new Set();
  mistakes = 0;
  document.getElementById("keyboard").innerHTML = "";
  createKeyboard();
  updateDisplay();
}

function updateDisplay() {
  document.getElementById("hangman-image").src = mistakes + 1 + ".png";
  let displayWord = selectedWord
    .split("")
    .map((letter) => (guessedLetters.has(letter) ? letter : "_"))
    .join(" ");
  document.getElementById("word-display").innerText = displayWord;
}

function handleGuess(letter, button) {
  if (selectedWord.includes(letter)) {
    guessedLetters.add(letter);
  } else {
    mistakes++;
  }
  button.remove();
  updateDisplay();
  checkGameStatus();
}

function checkGameStatus() {
  if (mistakes >= 6) {
    document.getElementById("message").innerHTML =
      "Vous avez perdu ! Le mot était <strong>" + selectedWord + "</strong>";
    setTimeout(nextRound, 1500);
  } else if (
    selectedWord.split("").every((letter) => guessedLetters.has(letter))
  ) {
    correctAnswers++;
    document.getElementById("progress").style.width = correctAnswers * 10 + "%";
    document.getElementById("message").innerText = "Vrais!";
    setTimeout(nextRound, 1500);
  }
}

function nextRound() {
  if (round >= 10) {
    alert("Jeu terminé! Score: " + correctAnswers + "/10");
    location.reload();
  } else {
    round++;
    document.getElementById("round").innerText = round;
    document.getElementById("message").innerText = "";
    startGame();
  }
}

function createKeyboard() {
  const keyboard = document.getElementById("keyboard");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  letters.forEach((letter) => {
    let button = document.createElement("button");
    button.innerText = letter;
    button.onclick = () => handleGuess(letter, button);
    keyboard.appendChild(button);
  });
}

startGame();
