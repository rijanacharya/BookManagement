document
  .getElementById("updateInventoryForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const bookNameInput = document.getElementById("bookName");
    const quantityInput = document.getElementById("quantity");

    // Check if the inputs are not null
    if (bookNameInput && quantityInput) {
      const bookName = bookNameInput.value;
      const quantity = parseInt(quantityInput.value);

      console.log("Updating inventory for:", bookName, "Quantity:", quantity);

      // Make a POST request to update inventory
      fetch("/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookName, quantity }),
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Inventory updated successfully: ");
        })
        .catch((error) => {
          alert("Error updating inventory:", error.message);
        });
    } else {
      alert("Input elements not found");
    }
  });
