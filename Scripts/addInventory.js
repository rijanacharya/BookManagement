document
  .getElementById("addInventoryForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const bookName = document.getElementById("bookName").value;
    const quantity = document.getElementById("quantity").value;

    // Send a POST request to add the inventory
    fetch("/inventory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookName, quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Inventory added successfully:", data);
        // You can update the UI or show a success message here
      })
      .catch((error) => {
        alert("Error adding inventory:", error);
        // Handle errors or show an error message
      });
  });
