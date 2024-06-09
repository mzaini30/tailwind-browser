chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status === "complete" &&
    tab.url
    // && tab.url.endsWith('.test')
  ) {
    // Injeksi file eksternal Tailwind
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["tailwind.min.js"],
      },
      () => {
        console.log("Tailwind injected");
        // Injeksi skrip untuk memaksa render ulang
        chrome.scripting.executeScript(
          {
            target: { tabId: tabId },
            func: forceRepaint,
          },
          () => {
            console.log("Forced repaint");
          },
        );
      },
    );
  }
});

function forceRepaint() {
  document.documentElement.classList.toggle("force-repaint");
  document.documentElement.classList.toggle("force-repaint");
}
