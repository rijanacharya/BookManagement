const multipleItemCarousel = document.querySelector("#books_bestseller");

const carousel = new bootstrap.Carousel(multipleItemCarousel, {
  interval: false,
});

if (window.matchMedia("(min-width:576px)").matches) {
  var carouselWidth = $(".carousel-inner")[0].scrollWidth;
  var cardWidth = $(".carousel-item").width();
  var scrollPosition = 0;

  $(".carousel-control-next").on("click", function () {
    if (scrollPosition < carouselWidth - cardWidth * 4) {
      scrollPosition += cardWidth;
      $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
    } else {
      // If at the end, reset to the beginning
      scrollPosition = 0;
      $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
    }
  });

  $(".carousel-control-prev").on("click", function () {
    if (scrollPosition > 0) {
      scrollPosition -= cardWidth;
      $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
    } else {
      // If at the beginning, go to the end
      scrollPosition = carouselWidth - cardWidth * 4;
      $(".carousel-inner").animate({ scrollLeft: scrollPosition }, 600);
    }
  });
} else {
  $(multipleItemCarousel).addClass("slide");
}
