document.getElementById("injectButton").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    // Injeksi file eksternal Tailwind
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        files: ["tailwind.min.js"], // Menginjeksikan file eksternal dari dist
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
            // Menutup popup setelah injeksi selesai
            window.close();
          },
        );
      },
    );
  });
});

function forceRepaint() {
  document.documentElement.classList.toggle("force-repaint");
  document.documentElement.classList.toggle("force-repaint");
}
