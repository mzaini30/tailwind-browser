import tailwind from "./tailwind.css.txt";

document.getElementById("injectButton").addEventListener("click", () => {
  // Dapatkan tab aktif
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const tabId = tabs[0].id;
    // Injeksi CSS langsung ke dalam halaman
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: injectTailwindCSS,
    });
  });
});

function injectTailwindCSS() {
  if (!document.querySelector("style[data-tailwind]")) {
    const style = document.createElement("style");
    style.setAttribute("data-tailwind", "");
    style.innerHTML = `/* Tailwind CSS content here */${tailwind}`;
    document.head.appendChild(style);
  }
}
