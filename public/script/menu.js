// Toggle active class for hamburger menu icon and menulist
document
  .querySelector(".navbar-toggler")
  .addEventListener("click", function () {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");

    navbarToggler.classList.toggle("active");
    navbarCollapse.classList.toggle("show");
  });

//Cart on click
function handleCartClick() {
  // Replace this alert with your cart functionality
  console.log("Cart clicked! Implement your cart functionality here.");
}
