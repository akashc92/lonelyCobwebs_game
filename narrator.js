/* global jsyaml, engine */
let story;
let inventory;
let presentState;

fetch("story.yaml")
.then(res => res.text())
.then(start);

function start(storyText) {
  
  story=jsyaml.load(storyText);
  
  engine.setTitle(story.metadata.title);
  
  inventory = new Set();
  
  for (let item of story.initially.inventory) {
    inventory.add(item);
  }
  
  let initialState = story.initially.location;
  
  arrive(initialState, story.initially.description);
  
}

function arrive(target, initialDescription) {
  
  presentState = story.locations[target];
  
  engine.clearDescriptions();
  
  engine.clearChoices()
  
  engine.addDescription(initialDescription);
  
  for (let item of presentState.provides || []) {
    inventory.add(item);
  }
  
  for (let item of presentState.consumes || []) {
    inventory.delete(item);
  }
  
  for (let element of presentState.descriptions.filter(conditionsHold)) {
    engine.addDescription(element.text, element.tags);
  }
    
  for (let choice of presentState.choices.filter(conditionsHold)) {
    engine.addChoice(choice.text, () => {
      
      arrive(choice.target, choice.narration);
    }, choice.tags);
  }
  
}  

function conditionsHold(obj) {
  
  for (let item of obj.with || []) {
    if (!inventory.has(item)) {
      return false;
    }
  }
  for (let item of obj.without || []) {
    if (inventory.has(item)) {
      return false;
    }
  }
  return true;
}
