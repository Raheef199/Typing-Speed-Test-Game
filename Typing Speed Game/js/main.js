// Array of Words
const words = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "C",
  "Ruby",
  "Go",
  "Swift",
  "Kotlin",
  "PHP",
  "TypeScript",
  "R",
  "Objective-C",
  "Scala",
  "Perl",
  "Haskell",
  "Lua",
  "Rust",
  "Elixir",
  "Dart",
  "React",
  "Rust",
  "Angular",
  "Svelte",
  "MySql",
  "SqlLite",
  "MongoDB",
  "Cython",
  "Cassandra",
  "HTML",
  "CSS",
  "XML",
];

// Setting Levels
const lvls = {
  Easy: 30,
  Normal: 20,
  Hard: 10,
};

// Default Level
let defaultLevelName = ["Easy", "Normal", "Hard"]; // Change Level From Here
let defaultLevelSeconds = lvls.Normal;

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let score = document.querySelector(".score");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let select = document.querySelector("select");
let option = document.querySelector("option");
let lvl1 = document.querySelector("select .easy");
let lvl2 = document.querySelector("select .normal");
let lvl3 = document.querySelector("select .hard");
let instructionLvl1 = document.querySelector(".sec1");
let instructionLvl2 = document.querySelector(".sec2");
let instructionLvl3 = document.querySelector(".sec3");

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName[1];
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
};

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  console.log(randomWord);

  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  console.log(wordIndex);

  // Remove Word From Array
  words.splice(wordIndex, 1);

  // Show the Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";

  // Generate Upcoming Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = lvls[select.value];
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congrats!");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          // Remove Upcoming Words Box
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanText = document.createTextNode("Game Over!");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}

// Save to Local Storage
let date = new Date();
window.localStorage.setItem("score", date.getTime());
let savedScore = new Date(parseInt(localStorage.getItem["score"]));

// Set levels from select
lvl1.innerHTML = defaultLevelName[0];
lvl2.innerHTML = defaultLevelName[1];
lvl3.innerHTML = defaultLevelName[2];

select.addEventListener("change", function () {
  const difficultySelect = select.value;
  switch (difficultySelect) {
    case defaultLevelName[0]:
      lvlNameSpan.innerHTML = defaultLevelName[0];
      secondsSpan.innerHTML = lvls[defaultLevelName[0]];
      timeLeftSpan.innerHTML = lvls[defaultLevelName[0]];
      break;
    case defaultLevelName[1]:
      lvlNameSpan.innerHTML = defaultLevelName[1];
      secondsSpan.innerHTML = lvls[defaultLevelName[1]];
      timeLeftSpan.innerHTML = lvls[defaultLevelName[1]];
      break;
    case defaultLevelName[2]:
      lvlNameSpan.innerHTML = defaultLevelName[2];
      secondsSpan.innerHTML = lvls[defaultLevelName[2]];
      timeLeftSpan.innerHTML = lvls[defaultLevelName[2]];
      break;
  }
});

// Make instructions dynamic
instructionLvl1.innerHTML = lvls[defaultLevelName[0]];
instructionLvl2.innerHTML = lvls[defaultLevelName[1]];
instructionLvl3.innerHTML = lvls[defaultLevelName[2]];
