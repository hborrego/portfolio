document.addEventListener("DOMContentLoaded", function() {
  // wait until window is loaded - meaning all images, stylesheets, js, fonts, media assets, and links
  window.addEventListener(
    "load",
    function() {
      document.body.style.display = "block";

      var options = {
        wrapAround: true,
        autoPlay: true,
        prevNextButtons: false,
        lazyLoad: 3
      };

      if (matchMedia("screen and (min-width: 768px)").matches) {
        options.prevNextButtons = true;
      }

      if (matchMedia("screen and (min-width: 1200px)").matches) {
        options.draggable = false;
      }

      $(".carousel").flickity(options);

      $(".carousel").on("staticClick.flickity", function(
        event,
        pointer,
        cellElement,
        cellIndex
      ) {
        if (typeof cellIndex == "number") {
          $(".carousel").flickity("select", cellIndex);
        }
        $(".carousel").flickity("toggleFullscreen");
      });

      // --------------------------------------------------------
      // ------------------ Scrolling Control--------------------
      // --------------------------------------------------------
      var controller = new ScrollMagic.Controller({
        globalSceneOptions: {
          triggerHook: 0,
          reverse: true
        }
      });

      // --------------------------------------------------------
      // ------------------ Lottie Animations -------------------
      // --------------------------------------------------------

      // 1. Set up for Map animation

      var mapAnimWindow = document.getElementById("mapLottie"),
        mapAnimData = {
          wrapper: mapAnimWindow,
          renderer: "svg",
          loop: false,
          prerender: true,
          autoplay: false,
          path: "../json/map/map.json"
        };
      var mapAnim = bodymovin.loadAnimation(mapAnimData);
      mapAnim.addEventListener("DOMLoaded", onmapDOMLoaded);

      // 2. TimelineMax Map animation

      var mapTL = new TimelineMax(); // new TimelineMax

      function onmapDOMLoaded(e) {
        mapTL.to(
          {
            frame: 0
          },
          3,
          {
            frame: mapAnim.totalFrames - 1,
            onUpdate: function() {
              mapAnim.goToAndStop(Math.round(this.target.frame), true);
            },
            ease: Linear.easeNone
          }
        );
      }

      // 3. ScrollMagic Map Animation

      var numMap = $(".text-map").length;

      new ScrollMagic.Scene({
        triggerElement: "#mapHolder",
        duration: numMap * 100 //controls how long the scroll should be to display the animation
      })
        .setTween(mapTL)
        .setPin("#mapHolder") // set the div where the animation gets pined
        .on("start", function() {
          $(".map0").toggleClass("hold-text");
        }) // keeps first text visible when scrolling back
        .on("end", function() {
          $(".map" + (numMap - 1)).toggleClass("hold-text");
        }) // keeps last text visible when scrolling pass animation
        // .addIndicators() //triger, start and end indicators
        .addTo(controller);

      // 4. ScrollMagic Map Text

      for (var i = 0, l = numMap - 1; i <= l; i++) {
        new ScrollMagic.Scene({
          triggerElement: "#mapHolder",
          duration: 100,
          offset: i * 100
        })
          .setClassToggle(".map" + i, "active")
          // .addIndicators()
          .addTo(controller);
      }

      // --------------------------------------------------------
      // ------------------ Passport Animation ------------------
      // --------------------------------------------------------

      var controller2 = new ScrollMagic.Controller({
        globalSceneOptions: {
          triggerHook: 0.125,
          reverse: true
        }
      });

      // 1. Set up for Passport animation

      var passportAnimWindow = document.getElementById("passportLottie"),
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

      var passportTL = new TimelineMax(); // new TimelineMax

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

      // 3. ScrollMagic Passport Animation

      new ScrollMagic.Scene({
        triggerElement: "#passportLottie"
      })
        .setTween(passportTL)
        // .setPin("#passportLottie") // set the id where the animation gets pined
        // .addIndicators() //triger, start and end indicators
        .addTo(controller2);

      // --------------------------------------------------------
      // --------------- Market Drawing ANIMATION ---------------
      // --------------------------------------------------------

      (frame_count = 15), (offset_value = 50);

      // build pinned scene
      new ScrollMagic.Scene({
        triggerElement: "#marketHolder",
        duration: frame_count * offset_value + "px",
        reverse: true
      })
        .setPin("#marketHolder")
        // .addIndicators()
        .addTo(controller);

      // build step frame scene
      for (var i = 1, l = frame_count; i <= l; i++) {
        new ScrollMagic.Scene({
          triggerElement: "#marketHolder",
          offset: i * offset_value
        })
          .setClassToggle(".viewer", "frame" + i)
          // .addIndicators()
          .addTo(controller);
      }
    },
    false
  );
});
