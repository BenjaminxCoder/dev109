// Function to add a new item to the grocery list
function addItem() {
    // Get the input field and list
    let inputField = document.getElementById("new-item");
    let newItemText = inputField.value.trim();
    let list = document.getElementById("grocery-list");

    // Check if input is empty
    if (newItemText === "") {
        alert("Please enter an item!");
        return;
    }

    // Create a new list item
    let listItem = document.createElement("li");
    listItem.textContent = newItemText;

    // Append the new item to the list
    list.appendChild(listItem);

    // Clear input field after adding item
    inputField.value = "";
}

// Add "Enter" key functionality
document.getElementById("new-item").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addItem();
    }
});