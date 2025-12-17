const words = {
  food: ["বিরিয়ানি", "ফুচকা", "পিজ্জা", "ভাত"],
  animal: ["বাঘ", "হাতি", "বিড়াল", "সিংহ"],
  celebrity: ["শাকিব খান", "সাকিব আল হাসান"],
  object: ["মোবাইল", "কলম", "চেয়ার"]
};

let totalPlayers = 0;
let currentPlayer = 0;
let imposter = 0;
let word = "";
let revealed = false;

const card = document.getElementById("card");
const frontText = document.getElementById("frontText");
const backText = document.getElementById("backText");
// Get the new game button element
const newGameButton = document.getElementById("newGameButton");


function startGame() {
  totalPlayers = Number(document.getElementById("players").value);
  const category = document.getElementById("category").value;

  word = words[category][Math.floor(Math.random() * words[category].length)];
  imposter = Math.floor(Math.random() * totalPlayers);

  currentPlayer = 0;
  revealed = false;

  card.classList.remove("hidden", "flip");
  showPlayer();
  
  // --- Hide the New Game button when the game starts ---
  newGameButton.style.display = 'none';
}

function showPlayer() {
  frontText.innerText = `👤 প্লেয়ার ${currentPlayer + 1}`;
  backText.innerText = "";
  revealed = false;
}

function reveal() {
  if (revealed) return;
  revealed = true;

  if (currentPlayer === imposter) {
    backText.innerText = "🤫 তুমি ভণ্ড";
  } else {
    backText.innerText = "শব্দ: " + word;
  }

  card.classList.add("flip");
}

function nextPlayer() {
  if (!revealed) return;

  card.classList.remove("flip");

  setTimeout(() => {
    currentPlayer++;

    if (currentPlayer >= totalPlayers) {
      frontText.innerText = "🎉 সবাই দেখে নিয়েছে!";
      backText.innerText = "এখন ভণ্ড খুঁজো!";
      
      // --- Show the New Game button when all players are done ---
      newGameButton.style.display = 'block';

    } else {
      showPlayer();
    }
  }, 400);
}

/* Touch support */
card.addEventListener("touchstart", reveal, { passive: true });
card.addEventListener("touchend", nextPlayer);

/* Mouse support */
card.addEventListener("mousedown", reveal);
// Corrected typo from nextPlayter to nextPlayer
card.addEventListener("mouseup", nextPlayer);