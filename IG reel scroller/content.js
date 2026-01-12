let totalPixels = 0;

// Load persisted scrollPixels
chrome.storage.local.get(["scrollPixels"], (data) => {
  totalPixels = data.scrollPixels ?? 0;
});

// Track scrolling
window.addEventListener(
  "wheel",
  (e) => {
    totalPixels += Math.abs(e.deltaY);
    chrome.storage.local.set({ scrollPixels: totalPixels });
  },
  { passive: true }
);

// Listen for reset
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "resetScroll") {
    totalPixels = 0;
  }
});
