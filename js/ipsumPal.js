let ipsumPalDetectInputs = document.getElementById("IpsumPalDetectInputs");

ipsumPalDetectInputs.addEventListener("click", async () => {
  window.close();

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: ipsumPal,
  });
});

/**
 * @description Initializes and configures IpsumPal within the current web page.
 *              This function injects CSS, adds user interface elements, and handles user interactions.
 */
function ipsumPal() {
  chrome.storage.sync.get(() => {
    /**
     * Inject CSS
     */
    const link = document.createElement("link");
    link.href = chrome.runtime.getURL("css/ipsumPal.css");
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    const formItemBody = document.querySelectorAll(".sb-form-item__body");
    formItemBody.forEach((element) => {
      element.style.position = "relative";
    });

  });
}
