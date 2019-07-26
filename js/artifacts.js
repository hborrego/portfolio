document.addEventListener("DOMContentLoaded", function() {
  // wait until window is loaded - meaning all images, stylesheets, js, fonts, media assets, and links
  window.addEventListener(
    "load",
    function() {
      document.body.style.display = "block";

      let select = function(s) {
        return document.querySelector(s);
      };

      let selectAll = function(s) {
        return document.querySelectorAll(s);
      };

      // Set up our animation
      var passportAnimWindow = document.getElementById("passportLottie"),
        passportAnimData = {
          wrapper: passportAnimWindow,
          renderer: "svg",
          loop: false,
          prerender: true,
          autoplay: false,
          path: "../json/passport.json"
        };
      var passportAnim = bodymovin.loadAnimation(passportAnimData);
      passportAnim.addEventListener("DOMLoaded", onPassportDOMLoaded);

      // --------passport TLs-------------
      var tl = new TimelineMax();

      function onPassportDOMLoaded(e) {
        tl.to(
          {
            frame: 0
          },
          3,
          {
            frame: passportAnim.totalFrames - 1,
            onUpdate: function() {
              passportAnim.goToAndStop(Math.round(this.target.frame), true);
            },
            ease: Linear.easeNone
          }
        );
      }

      // ---------------------------------------------------------
      // ------------------ Scrolling Control--------------------
      // --------------------------------------------------------
      var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
          triggerHook: 0,
          reverse: true
        }
      });

      //-------------------------------------------------
      //----------- passport ANIMATIONS ---------------
      //-------------------------------------------------
      var numPassport = $(".text-passport").length;

      let notpassportScene = new ScrollMagic.Scene({
        triggerElement: "#holder",
        duration: numPassport * 100 //controls how long the scroll should be to display the animation
      })
        .setTween(tl)
        .setPin("#holder") // set the div where the animation gets pined
        .on("start", function() {
          $(".passport0").toggleClass("hold-text");
        }) // keeps first text visible when scrolling back
        .on("end", function() {
          $(".passport" + (numPassport - 1)).toggleClass("hold-text");
        }) // keeps last text visible when scrolling pass animation
        .addIndicators() //triger, start and end indicators
        .addTo(controller);

      //-------------------------------------------------
      //----------- passport text ANIMATION ------------
      //-------------------------------------------------

      for (var i = 0, l = numPassport - 1; i <= l; i++) {
        new ScrollMagic.Scene({
          triggerElement: "#holder",
          duration: 100,
          offset: i * 100
        })
          .setClassToggle(".passport" + i, "active")
          .addIndicators()
          .addTo(controller);
      }

      //-------------------------------------------------
      //----------- market drawing ANIMATION ------------
      //-------------------------------------------------

      (frame_count = 15), (offset_value = 100);

      // build pinned scene
      new ScrollMagic.Scene({
        triggerElement: "#sticky",
        duration: frame_count * offset_value + "px",
        reverse: true
      })
        .setPin("#sticky")
        .addIndicators()
        .addTo(controller);

      // build step frame scene
      for (var i = 1, l = frame_count; i <= l; i++) {
        new ScrollMagic.Scene({
          triggerElement: "#sticky",
          offset: i * offset_value
        })
          .setClassToggle(".viewer", "frame" + i)
          .addIndicators()
          .addTo(controller);
      }
    },
    false
  );
});
