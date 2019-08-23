document.addEventListener("DOMContentLoaded", function() {
  // wait until window is loaded - meaning all images, stylesheets, js, fonts, media assets, and links
  window.addEventListener(
    "load",
    function() {
      document.body.style.display = "block";

      var passportAnimWindow = document.getElementById("passportAboutLottie"),
        passportAnimData = {
          wrapper: passportAnimWindow,
          renderer: "html",
          loop: false,
          prerender: true,
          autoplay: false,
          path: "../json/passport/passport.json"
        };
      var passportAnim = bodymovin.loadAnimation(passportAnimData);
      passportAnim.addEventListener("DOMLoaded", onPassportDOMLoaded);

      // 2. TimelineMax Passport animation
      
      var hideAnim = function() {
        document.getElementById("passportAboutLottie").style.visibility = "hidden";
      }
    
      var passportTL = new TimelineMax({onComplete:hideAnim}); // new TimelineMax

      function onPassportDOMLoaded() {
        passportTL.to(
          {
            frame: 0
          },
          1.5,
          {
            frame: passportAnim.totalFrames - 1,
            onUpdate: function() {
              passportAnim.goToAndStop(Math.round(this.target.frame), true);
            },
            ease: Linear.easeNone
          }
        );
      }

      var displayAnim = function() {
        document.getElementById("passportAboutLottie").style.visibility = "visible";
        passportTL.restart();
      };
      
      document
        .getElementById("example-animation")
        .addEventListener("click", displayAnim);

    },
    false
  );
});
