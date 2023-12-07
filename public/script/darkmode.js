function darkMode() {
  let element = document.body;
  const slider = document.getElementById("flexSwitchCheckChecked");
  const sunIcon = document.getElementById("sunIcon");
  const moonIcon = document.getElementById("moonIcon");

  element.dataset.bsTheme =
    element.dataset.bsTheme == "light" ? "dark" : "light";

  if (slider.checked) {
    // Dark mode is on (slider is off), show moon
    sunIcon.style.display = "none";
    moonIcon.style.display = "inline-block";
  } else {
    // Dark mode is off (slider is on), show sun
    sunIcon.style.display = "inline-block";
    moonIcon.style.display = "none";
  }
}
