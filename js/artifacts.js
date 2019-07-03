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
          renderer: "html",
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

      var viewer = document.querySelector(".viewer"),
        frame_count = 15,
        offset_value = 100;

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
      let notpassportScene = new ScrollMagic.Scene({
        triggerElement: "#passportLottie",
        duration: "50%" //controls how long the scroll should be to display the animation
      })
        .setTween(tl)
        .setPin(".animation") // set the div where the animation gets pined
        .addIndicators() //triger, start and end indicators
        .addTo(controller);

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
