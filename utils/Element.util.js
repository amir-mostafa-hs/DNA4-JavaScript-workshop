function getElement(query) {
  return document.querySelector(query);
}

function createElement(elementName, classes, content) {
  const element = document.createElement(elementName);

  if (classes) {
    element.className = classes;
  }

  if (content) {
    // element.innerText = content
    element.append(content);
  }

  return element;
}

export { getElement, createElement };
