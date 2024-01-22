function animateHero() {
  const heroContent = document.querySelector(".hero-content");
  const heroImage = document.querySelector(".hero-image");

  heroContent.classList.add("animate");
  heroImage.classList.add("animate");
}

window.addEventListener("load", animateHero);
