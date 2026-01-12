📱 Instagram Scroll Tracker Chrome Extension

Track your scrolls. Level up. Earn rewards.

Turn your endless Instagram scrolling into a game! 🕹️ Track your distance, level up, and earn stacked rewards while staying motivated.






✨ Features

🚀 Real-time scroll tracking in meters/kilometers

🏆 Level system with stacked rewards for each level

💾 Persistent progress across page refreshes and browser restarts

🔄 Reset button to start fresh whenever you want

🎨 Subtle Instagram-themed UI with gradients and animations

📈 Progress bar showing your distance within the current level

🎉 Level-up animations for that satisfying “achievement unlocked” feel

📸 Screenshots

(Add screenshots here! e.g., scroll distance, level-up, rewards popup)

🛠 Installation

Clone or download this repo.

Open Chrome and go to chrome://extensions/.

Enable Developer mode (top-right corner).

Click Load unpacked.

Select the folder containing the extension files.

Open Instagram and click the extension icon to track your scrolling!

🎮 How to Use

Open Instagram and scroll as usual.

Open the extension popup to see:

Total scroll distance

Current level

Stacked rewards

Each level-up adds a new reward that persists.

Click Reset to clear all progress and rewards.

📝 Customization

Level Names: Modify the LEVEL_NAMES array in popup.js.

Meters per Level: Change LEVEL_SIZE in popup.js.

UI Colors & Animations: Tweak style.css.

⚙️ File Structure
instagram-scroll-tracker/
├── manifest.json        # Chrome Extension manifest
├── content.js           # Scroll tracking script
├── popup.html           # Popup UI
├── popup.js             # Popup logic & UI updates
├── style.css            # Styles & animations
└── README.md            # This file

🔍 How it Works

Content Script (content.js):

Tracks scroll events.

Stores scrollPixels in chrome.storage.local.

Handles reset requests from popup.

Popup (popup.js):

Reads scrollPixels, levels, and rewards from storage.

Converts pixels → meters and updates the progress bar.

Detects level-ups and adds stacked rewards.

Handles reset and animations.

💡 Future Improvements

Animate the progress bar gradient like Instagram stories 🌈

Add daily/weekly scroll challenges ⏱️

Track scrolls across multiple tabs 📑

Optional sound or vibration feedback on level-up 🔔

📜 License

MIT License — free to use, modify, and share.
