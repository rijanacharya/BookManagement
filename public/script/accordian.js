// Toggle plus and minus signs on accordion collapse
$(document).ready(function () {
  $(".accordion-button").click(function () {
    $(this).toggleClass("collapsed");
  });
});
