document.addEventListener("DOMContentLoaded", function() {
  // wait until window is loaded - meaning all images, stylesheets, js, fonts, media assets, and links
  window.addEventListener(
    "load",
    function() {
      document.body.style.display = "block";

      var tlMapText = new TimelineMax().staggerFrom(
        ".text-map",
        0.25,
        {
          opacity: 0,
          y: -20,
          ease: Power2.easeInOut
        },
        0.05
      );

      // $('[data-fancybox="gallery"]').fancybox({
      //   afterLoad: function(instance, current) {
      //     var pixelRatio = window.devicePixelRatio || 1;

      //     if (pixelRatio > 1.5) {
      //       current.width = current.width / pixelRatio;
      //       current.height = current.height / pixelRatio;
      //     }
      //   }
      // });

      // var options = {
      //   delegate: "a",
      //   type: "image",
      //   gallery: {
      //     enabled: true
      //   }
      // };

      // if (matchMedia("screen and (min-width: 768px)").matches) {
      //   options.
      // }

      // if (matchMedia("screen and (min-width: 1200px)").matches) {
      //   options.draggable = false;
      // }

      // $(".project-gallery").magnificPopup(options);

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
        triggerElement: "#map",
        duration: numMap * 133 //controls how long the scroll should be to display the animation
      })
        .setTween(mapTL)
        .setPin("#map") // set the div where the animation gets pined
        .on("start", function() {
          $(".map0").toggleClass("hold-text");
        }) // keeps first text visible when scrolling back
        .on("end", function() {
          $(".map" + (numMap - 1)).toggleClass("hold-text");
        }) // keeps last text visible when scrolling pass animation
        // .addIndicators() //trigger, start and end indicators
        .addTo(controller);

      // 4. ScrollMagic Map Text

      for (var i = 0, l = numMap - 1; i < l; i++) {
        new ScrollMagic.Scene({
          triggerElement: "#map",
          duration: 133,
          offset: i * 133
        })
          .setClassToggle(".map" + i, "active")
          .on("end", function() {
            tlMapText.restart();
          })
          // .addIndicators()
          .addTo(controller);
      }

      new ScrollMagic.Scene({
        triggerElement: "#map",
        duration: 133,
        offset: (numMap - 1) * 133
      })
        .setClassToggle(".map" + (numMap - 1), "active")
        // .addIndicators()
        .addTo(controller);

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
        triggerElement: "#passport"
      })
        .setTween(passportTL)
        // .setPin("#passportLottie") // set the id where the animation gets pined
        // .addIndicators() //triger, start and end indicators
        .addTo(controller2);

      // --------------------------------------------------------
      // --------------- Market Drawing ANIMATION ---------------
      // --------------------------------------------------------

      // 1. Set up for Market animation

      var marketAnimWindow = document.getElementById("marketLottie"),
        marketAnimData = {
          wrapper: marketAnimWindow,
          renderer: "svg",
          loop: false,
          prerender: true,
          autoplay: false,
          path: "../json/market/market.json"
        };
      var marketAnim = bodymovin.loadAnimation(marketAnimData);
      marketAnim.addEventListener("DOMLoaded", onmarketDOMLoaded);

      // 2. TimelineMax Market animation

      var marketTL = new TimelineMax(); // new TimelineMax

      function onmarketDOMLoaded(e) {
        marketTL.to(
          {
            frame: 0
          },
          3,
          {
            frame: marketAnim.totalFrames - 1,
            onUpdate: function() {
              marketAnim.goToAndStop(Math.round(this.target.frame), true);
            },
            ease: Linear.easeNone
          }
        );
      }

      // 3. ScrollMagic Market Animation

      new ScrollMagic.Scene({
        triggerElement: "#market",
        duration: 500 //controls how long the scroll should be to display the animation
      })
        .setTween(marketTL)
        .setPin("#market") // set the div where the animation gets pined
        // .addIndicators() //triger, start and end indicators
        .addTo(controller);

      // --------------------------------------------------------
      // -------------- Market Detail 03 ANIMATION --------------
      // --------------------------------------------------------

      // 1. Set up for market01 animation

      var market01AnimWindow = document.getElementById("market01Lottie"),
        market01AnimData = {
          wrapper: market01AnimWindow,
          renderer: "svg",
          loop: false,
          prerender: true,
          autoplay: false,
          path: "../json/market01/market01.json"
        };
      var market01Anim = bodymovin.loadAnimation(market01AnimData);
      market01Anim.addEventListener("DOMLoaded", onmarket01DOMLoaded);

      // 2. TimelineMax market01 animation

      var market01TL = new TimelineMax(); // new TimelineMax

      function onmarket01DOMLoaded(e) {
        market01TL.to(
          {
            frame: 0
          },
          3,
          {
            frame: market01Anim.totalFrames - 1,
            onUpdate: function() {
              market01Anim.goToAndStop(Math.round(this.target.frame), true);
            },
            ease: Linear.easeNone
          }
        );
      }

      // 3. ScrollMagic market01 Animation

      new ScrollMagic.Scene({
        triggerElement: "#market",
        duration: 500 //controls how long the scroll should be to display the animation
      })
        .setTween(market01TL)
        .setPin("#market01") // set the div where the animation gets pined
        // .addIndicators() //triger, start and end indicators
        .addTo(controller);

      // --------------------------------------------------------
      // -------------- Market Detail 02 ANIMATION --------------
      // --------------------------------------------------------

      // 1. Set up for market02 animation

      var market02AnimWindow = document.getElementById("market02Lottie"),
        market02AnimData = {
          wrapper: market02AnimWindow,
          renderer: "svg",
          loop: false,
          prerender: true,
          autoplay: false,
          path: "../json/market02/market02.json"
        };
      var market02Anim = bodymovin.loadAnimation(market02AnimData);
      market02Anim.addEventListener("DOMLoaded", onmarket02DOMLoaded);

      // 2. TimelineMax market02 animation

      var market02TL = new TimelineMax(); // new TimelineMax

      function onmarket02DOMLoaded(e) {
        market02TL.to(
          {
            frame: 0
          },
          3,
          {
            frame: market02Anim.totalFrames - 1,
            onUpdate: function() {
              market02Anim.goToAndStop(Math.round(this.target.frame), true);
            },
            ease: Linear.easeNone
          }
        );
      }

      // 3. ScrollMagic market02 Animation

      new ScrollMagic.Scene({
        triggerElement: "#market",
        duration: 500 //controls how long the scroll should be to display the animation
      })
        .setTween(market02TL)
        .setPin("#market02") // set the div where the animation gets pined
        // .addIndicators() //triger, start and end indicators
        .addTo(controller);
    },
    false
  );
});
