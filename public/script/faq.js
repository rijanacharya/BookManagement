function toggleAnswer(element) {
  element.classList.toggle("active");
  var answer = element.nextElementSibling;
  if (element.classList.contains("active")) {
    answer.style.maxHeight = answer.scrollHeight + "px";
  } else {
    answer.style.maxHeight = 0;
  }
}
