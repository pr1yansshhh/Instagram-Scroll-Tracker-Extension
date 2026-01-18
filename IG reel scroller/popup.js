const distanceEl = document.getElementById("distance");
const levelEl = document.getElementById("level");
const levelNameEl = document.getElementById("levelName");
const barEl = document.getElementById("bar");
const progressTextEl = document.getElementById("progressText");
const rewardEl = document.getElementById("reward");
const resetBtn = document.getElementById("reset");

const LEVEL_SIZE = 50; 
const PIXEL_TO_CM = 2.54 / 96; 

const LEVEL_NAMES = [
  "NewBie",
  "AverageScroller",
  "IntenseScroller",
  "DoomScroller",
  "Get A Lyf",
  "Touch Grass"
];

let currentLevel = 0;
let earnedLevels = [];
let scrollPixels = 0;


chrome.storage.local.get(["scrollPixels", "earnedLevels", "currentLevel"], (data) => {
  scrollPixels = data.scrollPixels ?? 0;
  earnedLevels = data.earnedLevels ?? [];
  currentLevel = data.currentLevel ?? 0;
  updateRewardsUI();
  updateUI(scrollPixels);
});


function pixelsToMeters(pixels) {
  return pixels * PIXEL_TO_CM / 100;
}


function updateUI(pixels) {
  scrollPixels = pixels;
  const meters = pixelsToMeters(pixels);

  distanceEl.innerText =
    meters < 1000 ? meters.toFixed(2) + " m" : (meters / 1000).toFixed(2) + " km";

  const level = Math.floor(meters / LEVEL_SIZE) + 1;

  if (level > currentLevel) {
    for (let lvl = currentLevel + 1; lvl <= level; lvl++) {
      const name = LEVEL_NAMES[lvl - 1] ?? `Level ${lvl}`;
      earnedLevels.push(`Level ${lvl}: ${name}`);
    }
    currentLevel = level;
    chrome.storage.local.set({ earnedLevels, currentLevel });
    updateRewardsUI();
    animateLevel();
  }

  levelEl.innerText = level;
  levelNameEl.innerText = LEVEL_NAMES[level - 1] ?? `Level ${level}`;

  const progressInLevel = meters % LEVEL_SIZE;
  const percent = (progressInLevel / LEVEL_SIZE) * 100;
  barEl.style.width = percent + "%";
  progressTextEl.innerText = `${progressInLevel.toFixed(1)} / ${LEVEL_SIZE} m`;

  chrome.storage.local.set({ scrollPixels: scrollPixels });
}


function animateLevel() {
  levelEl.classList.add("animate");
  levelNameEl.classList.add("animate");
  setTimeout(() => {
    levelEl.classList.remove("animate");
    levelNameEl.classList.remove("animate");
  }, 500);
}


function updateRewardsUI() {
  rewardEl.innerHTML = "";
  earnedLevels.forEach(r => {
    const div = document.createElement("div");
    div.textContent = r;
    rewardEl.appendChild(div);
  });
}


chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "updateScroll") {
    updateUI(message.scrollPixels);
  }
});


resetBtn.onclick = () => {
  scrollPixels = 0;
  currentLevel = 0;
  earnedLevels = [];
  rewardEl.innerHTML = "";
  levelNameEl.innerText = LEVEL_NAMES[0] ?? "Beginner";

  chrome.storage.local.set({ scrollPixels: 0, earnedLevels: [], currentLevel: 0 });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "resetScroll" });
  });
};
