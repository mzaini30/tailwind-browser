document.getElementById("injectButton").addEventListener("click", () => {
  // Dapatkan tab aktif
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    // Injeksi skrip ke dalam halaman
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: injectTailwind,
    });
  });
});

function injectTailwind() {
  // Periksa apakah Tailwind CSS sudah ada
  if (!document.querySelector('script[src="https://cdn.tailwindcss.com"]')) {
    const tailwindScript = document.createElement("script");
    tailwindScript.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(tailwindScript);
  }
}
