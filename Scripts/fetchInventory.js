document.addEventListener("DOMContentLoaded", function () {
  // Fetch inventory data
  fetch("/inventory")
    .then((response) => response.json())
    .then((data) => {
      const inventoryList = document.getElementById("inventoryList");

      // Clear existing list items
      inventoryList.innerHTML = "";

      // Iterate over inventory items and append to the list
      data.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.bookName}: ${item.quantity}`;
        inventoryList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error("Error fetching inventory:", error);
      // Handle errors or show an error message
    });
});
