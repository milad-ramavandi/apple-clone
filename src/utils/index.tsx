export const splitText = (element: HTMLElement) => {
  const textNodes: Node[] = [];

  element.childNodes.forEach((node) => {
    if (node && node.textContent && node.nodeType === Node.TEXT_NODE) {
      node.textContent.split(" ").forEach((word, index, array) => {
        const wordSpan = document.createElement("span");
        wordSpan.classList.add("mil-word-span");
        word.split("").forEach((letter) => {
          const letterSpan = document.createElement("span");
          letterSpan.classList.add("mil-letter-span");
          letterSpan.textContent = letter;
          wordSpan.appendChild(letterSpan);
        });
        textNodes.push(wordSpan);
        if (index < array.length - 1) {
          textNodes.push(document.createTextNode(" "));
        }
      });
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      textNodes.push(node.cloneNode(true));
    }
  });

  element.innerHTML = "";
  textNodes.forEach((node) => element.appendChild(node));
};