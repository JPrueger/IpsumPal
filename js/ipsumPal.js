let ipsumPalDetectInputs = document.getElementById("IpsumPalDetectInputs");

ipsumPalDetectInputs.addEventListener("click", async () => {
  window.close();

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: ipsumPal,
  });
});