let currentLevel = 1;
let foundItems = new Set();
let totalItems = [];

const levelItems = {
  1: ["bike", "lion", "globe", "umbrella", "frog"],
  2: ["waldo"] 
};

function initializeLevel(level) {
  foundItems.clear();
  totalItems = levelItems[level];

  totalItems.forEach(name => {
    const item = document.getElementById(name);
    if (item) item.classList.remove("found");
  });

  totalItems.forEach(name => {
    const area = document.getElementById(`area-${name}`);
    if (area) {
      area.onclick = null; // Remove old listener
      area.onclick = () => foundItem(name);
    }
  });
}

function foundItem(itemName) {
  console.log(`Clicked on: ${itemName}`);
  const item = document.getElementById(itemName);
  if (!foundItems.has(itemName)) {
    if (item) item.classList.add("found");
    foundItems.add(itemName);
  }

  if (foundItems.size === totalItems.length) {
    setTimeout(() => {
      const playAgain = confirm("You found all the items! Want to play again?");
      if (playAgain) location.reload();
    }, 500);
  }
}

initializeLevel(1);

function switchLevel() {
  document.querySelector('img[usemap="#objectmap"]').style.display = "none";
  document.getElementById('level2-img').style.display = "block";
  document.getElementById('instructions').textContent = "Can you find Waldo in the picture? Click on him when you do!";
  
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = '<li id="waldo">Waldo</li>';

  initializeLevel(2);
}
