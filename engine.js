/* global titleContainer, descriptionsContainer, choicesContainer */

let engine = {
  setTitle: function(title) {
    document.title = title;
    titleContainer.innerText = title;
  },

  clearDescriptions: function() {
    descriptionsContainer.innerText = "";
  },

  addDescription: function(text, tags) {
    let p = document.createElement("p");
    p.innerHTML = text;
    for (let tag of tags || []) {
      p.classList.add(tags);
    }
    descriptionsContainer.appendChild(p);
  },

  clearChoices: function() {
    choicesContainer.innerText = "";
  },

  addChoice: function(text, onClick, tags) {
    let button = document.createElement("button");
    button.innerHTML = text;
    button.onclick = onClick;
    for (let tag of tags || []) {
      button.classList.add(tag);
    }
    choicesContainer.appendChild(button);
  }
};
