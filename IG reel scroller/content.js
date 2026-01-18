let totalPixels = 0;

chrome.storage.local.get(["scrollPixels"], (data) => {
  totalPixels = data.scrollPixels ?? 0;
});

window.addEventListener(
  "wheel",
  (e) => {
    totalPixels += Math.abs(e.deltaY);
    chrome.storage.local.set({ scrollPixels: totalPixels });
  },
  { passive: true }
);

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "resetScroll") {
    totalPixels = 0;
  }
});
