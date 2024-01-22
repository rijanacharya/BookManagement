$(document).ready(function () {
  // Show or hide the button based on the scroll position
  $(window).scroll(function () {
    if ($(this).scrollTop() > 500) {
      $("#back-to-top-btn").fadeIn();
    } else {
      $("#back-to-top-btn").fadeOut();
    }
  });

  // Scroll to top when the button is clicked
  $("#back-to-top-btn").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 800);
    return false;
  });
});
