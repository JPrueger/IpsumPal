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

    document.querySelectorAll('[class="rte__content"], [dir="ltr"]').forEach((element) => {
      if (element.getAttribute('class') === 'rte__content') {
        triggerIpsumPal('rte__content', element);
      } else if (element.getAttribute('dir') === 'ltr') {
        triggerIpsumPal('ltr', element);
      }
    });

    function triggerIpsumPal(type, element) {
      const icon = document.createElement("div");
      icon.classList.add("ipsum-pal__icon");
      icon.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 202 202" fill="none"><path fill="#002357" d="m105.076 47.953-99.24 99.404c-3.008 15.396-7.82 47.393-3.008 52.212 4.812 4.82 36.088.67 51.124-2.008L154.195 97.153l-49.119-49.2ZM168.23 4.777c-7.217-7.23-16.373-3.012-20.048 0l-24.56 24.6 49.119 49.2 25.061-25.102c7.217-7.23 3.007-15.73 0-19.077L168.23 4.778Z"/></svg>';
      icon.style.width = "16px";
      icon.style.height = "16px";

      const container = document.createElement("div");
      container.classList.add("ipsum-pal__container");

      const wrapper = document.createElement("div");
      wrapper.classList.add("ipsum-pal__wrapper");

      const wrapperButtons = document.createElement("div");
      wrapperButtons.classList.add("ipsum-pal__wrapper--buttons");

      const predefinedParagraph = document.createElement("p");
      predefinedParagraph.classList.add("ipsum-pal__predefined-paragraph");
      predefinedParagraph.innerHTML = "<strong>Predefined</strong> length:";
      wrapperButtons.appendChild(predefinedParagraph);

      const buttons = document.createElement("div");
      buttons.classList.add("ipsum-pal__buttons");
      ["30ch", "100ch", "300ch"].forEach((size) => {
        const button = document.createElement("button");
        button.classList.add("ipsum-pal__button");
        button.textContent = size;
        buttons.appendChild(button);
      });
      wrapperButtons.appendChild(buttons);

      const customLengthWrapper = document.createElement("div");
      customLengthWrapper.classList.add("ipsum-pal__custom-length-wrapper");

      const customParagraph = document.createElement("p");
      customParagraph.classList.add("ipsum-pal__custom-paragraph");
      customParagraph.innerHTML = "<strong>Custom</strong> length:";

      const customLengthInput = document.createElement("input");
      customLengthInput.classList.add("ipsum-pal__custom-length-input");
      customLengthInput.setAttribute("type", "text");
      customLengthWrapper.appendChild(customLengthInput);

      const submitCustomLenghtInput = document.createElement("button");
      submitCustomLenghtInput.classList.add(
        "ipsum-pal__submit-custom-length-input"
      );
      submitCustomLenghtInput.textContent = "submit";
      customLengthWrapper.appendChild(submitCustomLenghtInput);

      wrapper.appendChild(wrapperButtons);
      wrapper.appendChild(customParagraph);
      wrapper.appendChild(customLengthWrapper);
      container.appendChild(wrapper);
      element.parentNode.insertBefore(container.cloneNode(true), element);
      element.parentNode.insertBefore(icon.cloneNode(true), element);
    }
  });
}
