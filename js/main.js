document.addEventListener("DOMContentLoaded", function() {
  // wait until window is loaded - meaning all images, stylesheets, js, fonts, media assets, and links
  window.addEventListener(
    "load",
    function() {
      document.body.style.display = "block";

      var tl = new TimelineMax();

      tl.staggerFrom(
        "h1",
        2,
        {
          opacity: 0,
          y: -40,
          ease: Power2.easeInOut
        },
        0.2
      );
    },
    false
  );
});

var images = [
  "img/passport01.png"
]